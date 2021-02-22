const path = require('path')
// 压缩图片的存储路径
const COMPRESS_IMG_PATH = path.resolve(__dirname, './image/compress/')
// 原始图片的存储路径
const ORIGINAL_IMG_PATH = path.resolve(__dirname, './image/original/')

// 七牛云上传参数
const QI_NIU_CONFIG = {
  accessKey: 'fWayj32rvuUf3-0ovILE1zboV8_TmyTh2hsOvjv4',
  secretKey: 'kAG-hRUSznN0VP1vSglk47f0L8t73YL61nU5-F3x',
  scope: 'lyyue',
  domain: 'http://qiniu.lyaayl.com',
}

module.exports = {
  COMPRESS_IMG_PATH,
  ORIGINAL_IMG_PATH,
  QI_NIU_CONFIG,
}
