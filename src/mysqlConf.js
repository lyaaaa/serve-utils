const env = process.env.NODE_ENV // 环境参数

let MYSQL_CONF
if (env === 'dev') {
  MYSQL_CONF = {
    host: 'dev',
    user: '',
    password: '',
    port: '',
    database: '',
  }
} else if (env === 'production') {
  MYSQL_CONF = {
    host: '',
    user: '',
    password: '',
    port: '',
    database: 'q123',
  }
}

module.exports = {
  MYSQL_CONF,
}
