const fs = require('fs')
const path = require('path')
const { COMPRESS_IMG_PATH } = require('../config')

// 成功返回
const successRes = (data) => {
  return {
    status: { code: 0, msg: '成功' },
    data,
  }
}

// 失败返回
const errorRes = (msg) => {
  return {
    status: { code: 1, msg },
  }
}

/**
 * 将文件转为buffer格式
 * @param {String} filePath 文件路径
 * @return {Promise<Buffer>} 返回buffer
 */
const getBufferFromFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, function (err, res) {
      if (!err) {
        resolve(res)
      }
    })
  })
}

/**
 * 将buffer图片写入文件
 * @param {Buffer} buffer
 */
const bufferImageToFile = (buffer, fileName) => {
  const filePath = path.join(COMPRESS_IMG_PATH, fileName)
  fs.writeFileSync(filePath, buffer)
}

// 转换尺寸：将大小B 转为 kb,M,G...
const convertSize = (size) => {
  let resSize = ''
  if (size < 1024) {
    resSize = size.toFixed(2) + 'B'
  } else if (size < 1024 * 1024) {
    resSize = (size / 1024).toFixed(2) + 'KB'
  } else if (size < 1024 * 1024 * 1024) {
    resSize = (size / (1024 * 1024)).toFixed(2) + 'MB'
  } else {
    resSize = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
  }
  return resSize
}

// 读取压缩后文件大小
const getCompressSize = (fileName) => {
  const compressFilePath = path.join(COMPRESS_IMG_PATH, fileName)
  const { size } = fs.statSync(compressFilePath)
  return convertSize(size)
}

module.exports = {
  successRes,
  errorRes,
  getBufferFromFile,
  bufferImageToFile,
  convertSize,
  getCompressSize,
}
