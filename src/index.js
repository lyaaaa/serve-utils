const express = require('express')
const app = express()
const imageRouter = require('./router/image')

app.use('/image', imageRouter)

app.listen(3000, () => {
  console.log('serve is listen on 3000')
})
