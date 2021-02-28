const express = require('express')
const router = express.Router()
const { MYSQL_CONF } = require('../config')
const { successRes } = require('../utils/common')

router.get('/logList', function (req, res) {
  res.send(successRes(MYSQL_CONF))
})

module.exports = router
