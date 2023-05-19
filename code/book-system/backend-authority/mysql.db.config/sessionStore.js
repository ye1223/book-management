const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql');
const dbOptions = require('./db.config')

const connection = mysql.createConnection(dbOptions);
const sessionStore = new MySQLStore(
  {
    expiration: 86400000, // 会话过期时间，单位为毫秒
    createDatabaseTable: true, // 是否自动创建会话表
    schema: {
      tableName: 'sessions', // 会话表的名称
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data',
      },
    },
  },
  connection
);

module.exports = sessionStore