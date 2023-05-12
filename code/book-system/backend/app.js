const express = require('express')
const app = express()
const mysql = require('mysql')
const moment = require('moment')

const bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'book_system'
})
// 打开链接
connection.connect()
// 执行sql
/* connection.query('SELECT * FROM Book', (error, results, fields) => {
    if (error) throw error
    console.log('The result is: ', results)
}) */
app.get('/get', (req, res) => {

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

app.get('/get/:bookname', (req,res)=>{
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


app.post('/add', (req, res) => {
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


app.put('/edit', (req, res) => {
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

app.delete('/del', (req, res) => {
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


// 关闭链接


app.get('/', (req, res) => {
    res.send('hello')
})


app.listen(3000, () => {
    console.log('server start')
})