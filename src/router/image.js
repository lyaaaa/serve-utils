const express = require('express')
const router = express.Router()
const { ORIGINAL_IMG_PATH, COMPRESS_IMG_PATH, QI_NIU_CONFIG } = require('../config')
const { execSync } = require('child_process')
const path = require('path')
const {
  getBufferFromFile,
  bufferImageToFile,
  convertSize,
  getCompressSize,
  successRes,
  errorRes,
} = require('../utils/common')
const { getSquooshCli } = require('../utils/cli')
const { uploadImageToQiniu } = require('../utils/image')
const multer = require('multer')
const imagemin = require('imagemin')
const imageminPngquant = require('imagemin-pngquant')
const imageminJpegtran = require('imagemin-jpegtran')
const upload = multer({ dest: ORIGINAL_IMG_PATH })

router.use(upload.any())

// 处理压缩文件，返回压缩后文件名和文件扩建名
function handleCompressFile(file, type) {
  const { filename, mimetype } = file
  let extname = mimetype.split('/')[1]
  // 如果压缩类型为 squoosh, jpeg格式压缩为jpg,其他类型转为png
  if (type === 'squoosh') {
    if (extname === 'jpeg') {
      extname = 'jpg'
    } else {
      extname = 'png'
    }
  }

  const fileName = filename + '.' + extname
  return {
    fileName,
    extname,
  }
}

/**
 * 压缩图片并上传图片到七牛
 * @param {object} file 上传内容
 * @param {string} type 压缩类型
 * @param {Object} qiniuConf 上传七牛参数
 */
async function compressImage(file, type, qiniuConf) {
  const { path: filePath, size } = file
  // 压缩后的文件名
  const { fileName, extname } = handleCompressFile(file, type)
  try {
    if (type === 'imagemin') {
      // 通过imagemin 进行压缩
      const bufferFile = await getBufferFromFile(filePath)
      const imageBuffer = await imagemin.buffer(bufferFile, {
        plugins: [
          imageminJpegtran(),
          imageminPngquant({
            quality: [0.8, 0.9],
          }),
        ],
      })
      bufferImageToFile(imageBuffer, fileName)
    } else if (type === 'squoosh') {
      // 通过 squoosh 进行压缩
      const cli = getSquooshCli(filePath, extname)
      execSync(cli)
    }
    // 压缩成功后上传图片到七牛
    const url = await uploadImageToQiniu(path.join(COMPRESS_IMG_PATH, fileName), qiniuConf)
    // 读取压缩后文件大小
    return {
      type: 'success',
      originalSize: convertSize(size),
      compressSize: getCompressSize(fileName),
      url,
    }
  } catch (err) {
    const message = err.message ? err.message : err
    return Promise.reject(message)
  }
}

// 上传图片到七牛
router.post('/upload', async function (req, res) {
  try {
    const { filename } = req.files[0]
    const { qiniuConf = JSON.stringify(QI_NIU_CONFIG) } = req.body
    const filePath = path.join(ORIGINAL_IMG_PATH, filename)
    const url = await uploadImageToQiniu(filePath, JSON.parse(qiniuConf))
    res.send(
      successRes({
        url,
      })
    )
  } catch (err) {
    res.send(errorRes(err))
  }
})

router.post('/compress', async function (req, res) {
  const { type = 'imagemin', qiniuConf = JSON.stringify(QI_NIU_CONFIG) } = req.body

  try {
    const data = await compressImage(req.files[0], type, JSON.parse(qiniuConf))
    res.send(successRes(data))
  } catch (err) {
    console.log('err', err)
    res.send(errorRes(`压缩失败: ${err}`))
  }
})

module.exports = router
