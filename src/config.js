const path = require('path')
// 压缩图片的存储路径
const COMPRESS_IMG_PATH = path.resolve(__dirname, './image/compress/')
// 原始图片的存储路径
const ORIGINAL_IMG_PATH = path.resolve(__dirname, './image/original/')

module.exports = {
  COMPRESS_IMG_PATH,
  ORIGINAL_IMG_PATH,
}
