const mysql = require('mysql')
const config = require('./db.config')
const connection = mysql.createConnection(config)

module.exports = connection