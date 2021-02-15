const express = require('express')
const router = express.Router()
const { ORIGINAL_IMG_PATH } = require('../config')
const { execSync } = require('child_process')
const { getBufferFromFile, bufferImageToFile, convertSize, getCompressSize, successRes, errorRes } = require('../utils/common')
const { getSquooshCli } = require('../utils/cli')
const multer = require('multer')
const imagemin = require('imagemin')
const imageminPngquant = require('imagemin-pngquant')
const imageminJpegtran = require('imagemin-jpegtran')
const upload = multer({ dest: ORIGINAL_IMG_PATH })

router.use(upload.any())

// 压缩图片
async function compressImage(file, type) {
  const { path, size, filename, mimetype } = file
  // 压缩后的文件名
  const compressFileName = filename + '.' + mimetype.split('/')[1]
  try {
    if (type === 'imagemin') {
      // 通过imagemin 进行压缩
      const bufferFile = await getBufferFromFile(path)
      const imageBuffer = await imagemin.buffer(bufferFile, {
        plugins: [
          imageminJpegtran(),
          imageminPngquant({
            quality: [0.8, 0.9],
          }),
        ],
      })
      bufferImageToFile(imageBuffer, compressFileName)
    } else if (type === 'squoosh') {
      // 通过 squoosh 进行压缩
      const cli = getSquooshCli(path)
      execSync(cli)
    }
    // 读取压缩后文件大小
    return {
      type: 'success',
      originalSize: convertSize(size),
      compressSize: getCompressSize(compressFileName)
    }
  } catch (err) {
    return Promise.reject(err.message)
  }
}

router.post('/compress', async function (req, res) {
  const { type = 'imagemin' } = req.body

  try {
    const data = await compressImage(req.files[0], type)
    res.send(successRes(data))
  } catch (err) {
    res.send(errorRes(`压缩失败: ${err}`))
  }
})

module.exports = router
