const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const imageRouter = require('./router/image')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/image', imageRouter)

app.listen(3000, () => {
  console.log('serve is listen on 3000')
})
