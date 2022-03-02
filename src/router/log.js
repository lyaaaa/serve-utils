const express = require('express')
const router = express.Router()
const { successRes } = require('../utils/common')
// const { exec } = require('../db/mysql')

router.get('/logList', async function (req, res) {
  // const data = await exec('SELECT * FROM myblog.users')
  res.send(
    successRes({
      data: 'loglist',
      version: '0.0.1'
    })
  )
})

module.exports = router
