const mysql = require('mysql')
const { MYSQL_CONF } = require('../config')

// 创建链接对象
const connection = mysql.createConnection(MYSQL_CONF)

// 开始链接
connection.connect()

// 统一执行sql函数
function execSql(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res)
    })
  })
}

module.exports = {
  execSql,
}
