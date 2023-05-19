module.exports = (req, res, next) => {
    if(req.url.includes('login')){ 
        next()
        return
    }
    // 验证session存在？
    if(req.session.user){
        // 重新设置session
        req.session.mydate = Date.now()
        console.log('req-session', req.session.id)
        next()
    } else {
        // 用户未登录，返回错误信息或重定向到登录页面
        res.status(401).send('Unauthorized');
    }
}