const qiniu = require('qiniu')
const path = require('path')
const fs = require('fs')
const { QI_NIU_CONFIG, ORIGINAL_IMG_PATH, COMPRESS_IMG_PATH } = require('../config')

function clearImageFile() {
  const _removeFile = (filePath) => {
    const files = fs.readdirSync(filePath)
    files.forEach(file => {
      if (file !== '.gitkeep') {
        fs.unlinkSync(path.join(filePath, file))
      }
    })
  }
  // 删除原图所有文件
  _removeFile(ORIGINAL_IMG_PATH)
  // 删除压缩图所有文件
  _removeFile(COMPRESS_IMG_PATH)
}

// 获取七牛token
function getToken(accessKey, secretKey, scope) {
  const options = {
    scope,
  }
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  return uploadToken
}

// 上传图片到七牛
async function uploadImageToQiniu(imagePath) {
  return new Promise((resolve, reject) => {
    const config = new qiniu.conf.Config()
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    const token = getToken(QI_NIU_CONFIG.accessKey, QI_NIU_CONFIG.secretKey, QI_NIU_CONFIG.scope)

    // 上传内容
    const key = path.parse(imagePath).name
    const uploadItem = path.normalize(imagePath)
    formUploader.putFile(token, key, uploadItem, putExtra, function (respErr, respBody) {
      if (respErr) {
        reject(respErr)
      } else {
        const { key } = respBody
        resolve(`${QI_NIU_CONFIG.domain}/${key}`)
        // 删除image文件中的图片文件
        setTimeout(() => {
          clearImageFile()
        }, 0)
      }
    })
  })
}

module.exports = {
  uploadImageToQiniu,
}
