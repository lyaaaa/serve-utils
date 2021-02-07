const { COMPRESS_IMG_PATH } = require('../config')

/**
 * 拼接压缩图片命令
 * @param {String} imagePath 原图路径
 * @return {String}
 */
const getSquooshCli = (imagePath) => {
  let imageType = 'oxipng'
  return `squoosh-cli --${imageType} auto ${imagePath} -d ${COMPRESS_IMG_PATH}`
}

module.exports = {
  getSquooshCli,
}
