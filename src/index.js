const express = require('express')
const app = express()

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

app.listen(3000, () => {
  console.log('serve is listen on 3000')
})
