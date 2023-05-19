const express = require('express')
const router = express.Router()
const connection = require('../mysql.db.config/connection')
const moment = require('moment')

router.get('/get', (req, res) => {
    console.log('req.sesson', req.session.user)
    

    const {page,limit} = req.query
    offset = (page - 1) * limit
    let sql =  `SELECT * FROM Book LIMIT ${limit} OFFSET ${offset}`
    /* if(req.query.offset){
        sql = `SELECT * FROM Book LIMIT ${limit} OFFSET ${offset}`
    } else {
        sql = 'SELECT * FROM Book'
    } */
    
    // let sql = 'SELECT * FROM Book'
    /* if (req.query.BookName) {
        sql = `SELECT * FROM Book WHRER BookName LIKE ${req.query.BookName}`
    } */

    
    globalThis.DBAllLength
    connection.query('SELECT  COUNT(*) FROM Book', (err, results) => {
        if (!err) {
            globalThis.DBAllLength = results[0]['COUNT(*)']
        } else {
            console.log(err)
            res.send(err)
        }
    })
    connection.query(sql, (err, rows) => {
        if (!err) {
            res.send({
                backendData: rows,
                length:globalThis.DBAllLength
            })
        } else {
            console.log(err)
            res.send(err)
        }

    })
})

router.get('/get/:bookname', (req,res)=>{
    const bookname = req.params.bookname
    let sql = `SELECT * FROM Book WHERE BookName='${bookname}'` 

    connection.query(sql,(err,rows)=>{
        if(!err){
            res.send({
                backendData: rows,
                length:rows.length
            })
        } else {
            console.log(err)
            res.send(err)
        }
    })
})


router.post('/add', (req, res) => {
    const { Id, BookName, Author, TypeName, Remarks } = req.body
    console.log(req.body)
    let time = moment().format('YYYY-MM-DD HH:mm:ss')
    let sql = `INSERT INTO Book(Id,BookName,Author,TypeName,Remarks,CreateTime,UpdateTime) VALUES ('${Id}','${BookName}','${Author}','${TypeName}','${Remarks}','${time}','${time}')`
    connection.query(sql, (err) => {
        if (!err) {
            res.send('操作成功')
        } else {
            console.log(err)
            res.send(err)
        }
    })
})


router.put('/edit', (req, res) => {
    const { Id, BookName, Author, TypeName, Remarks } = req.body
    let time = moment().format('YYYY-MM-DD HH:mm:ss')
    console.log(time)
    let sql = `UPDATE Book SET BookName='${BookName}',Author='${Author}',TypeName='${TypeName}',Remarks='${Remarks}',UpdateTime='${time}' WHERE Id='${Id}';`
    connection.query(sql, (err, result, field) => {
        if (!err) {
            res.send('操作成功')
        } else {
            console.log(err)
            res.send(err)
        }
    })

})

router.delete('/del', (req, res) => {
    const delId = req.query.delId
    let sql = `DELETE FROM Book WHERE Id='${delId}'`
    connection.query(sql, err => {
        if (!err) {
            res.send('操作成功')
        } else {
            console.log(err)
            res.send(err)
        }
    })
})



router.get('/', (req, res) => {
    res.send('hello')
})

module.exports = router