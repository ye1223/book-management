const express = require('express')
const router = express.Router()
const connection = require('../mysql.db.config/connection')

router.post('/', (req, res)=>{
    const { username, password } = req.body
    let sql = `SELECT * FROM User WHERE username='${username}' AND password='${password}'`
    connection.query(sql, (err, rows)=>{
        if(!err){
            if(rows.length){
                // 设置session
                req.session.user = rows[0] //设置session对象（提供一个有意义的唯一值）
                // console.log('login-sessionis', req.session)
                // res.cookie('SESSION_ID', '1', { httpOnly: true })
                res.send({
                    LoginType: 'OK'
                })
            } else {
                res.send({
                    LoginType: 'NO',
                    ErrInfo: '数据库未匹配'
                })
            } 
        } else {
            console.log('❎' ,err)
            res.send({
                LoginType: 'NO',
                ErrInfo: err
            })
        }
    })
})

module.exports = router