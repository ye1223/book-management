const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    
    req.session.destroy(function(err) {
        // 不能访问session了 
        console.log(err)   
    })
    res.clearCookie('SESSION_ID') 
    res.send({info: '退出'})
})

module.exports = router