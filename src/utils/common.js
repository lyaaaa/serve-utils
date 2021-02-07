const fs = require('fs')
const path = require('path')
const { COMPRESS_IMG_PATH } = require('../config')

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
  fs.writeFile(filePath, buffer, function (err) {
    if (err) {
      console.log('写入失败', err, filePath)
    } else {
      console.log('写入成功')
    }
  })
}

module.exports = {
  getBufferFromFile,
  bufferImageToFile,
}
