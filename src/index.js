const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const { exec } = require('child_process')
const { getSquooshCli } = require('./utils/cli')
const { getBufferFromFile, bufferImageToFile } = require('./utils/common')
const upload = multer({ dest: path.resolve(__dirname, './uploads/') })
const imagemin = require('imagemin')
const imageminPngquant = require('imagemin-pngquant')
const imageminJpegtran = require('imagemin-jpegtran')

app.use(upload.any())

app.get('/test', function (req, res) {
  res.send({
    code: 0,
    message: 'test',
  })
})

app.get('/hello', function (req, res) {
  res.send({
    code: 0,
    message: 'hello',
  })
})

app.get('/api/blob', function (req, res) {
  const filePath = path.resolve(__dirname, './image/img.jpg')
  const cs = fs.createReadStream(filePath)
  cs.on('data', (chunk) => {
    res.write(chunk)
  })
  cs.on('end', () => {
    res.status(200)
    res.end()
  })
})

app.get('/api/buffer', function (req, res) {
  const resContent = Buffer.from([1, 2, 3, 4])
  res.status(200)
  res.end(resContent)
})

// squoosh 压缩图片
app.post('/compress', upload.single('compress'), function (req, res) {
  const { path } = req.files[0]
  const cli = getSquooshCli(path)
  exec(cli, function (err, stdout, stderr) {
    if (err) {
      res.send({
        msg: '压缩失败',
        err,
      })
    } else {
      res.send({
        msg: '压缩成功',
      })
    }
  })
})

// imagemin 压缩图片
app.post('/compressByImagemin', async function (req, res) {
  const { path, originalname } = req.files[0]
  try {
    const bufferFile = await getBufferFromFile(path)
    const imageBuffer = await imagemin.buffer(bufferFile, {
      plugins: [
        imageminJpegtran(),
        imageminPngquant({
          quality: [0.8, 0.9],
        }),
      ],
    })
    bufferImageToFile(imageBuffer, originalname)
    // 将buffer图片写入文件
    res.send({
      msg: '压缩成功',
      imageBuffer,
    })
  } catch (err) {
    console.log('err', err)
    res.send({
      msg: '压缩失败',
      err,
    })
  }
})

app.listen(3000, () => {
  console.log('serve is listen on 3000')
})
