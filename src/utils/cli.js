const { COMPRESS_IMG_PATH } = require('../config')

/**
 * 拼接压缩图片命令
 * @param {String} imagePath 原图路径
 * @return {String}
 */
const getSquooshCli = (imagePath, extname) => {
  let imageType = extname === 'jpg' ? 'mozjpeg' : 'oxipng'
  let quality = extname === 'jpg' ? `'{quality: 75}'` : 'auto'
  return `squoosh-cli --${imageType} ${quality} ${imagePath} -d ${COMPRESS_IMG_PATH}`
}

module.exports = {
  getSquooshCli,
}
