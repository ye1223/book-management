import Cookie from 'js-cookie'

const COOKI_NAME = 'SESSION_ID'

const cookieValue = Cookie.get(COOKI_NAME)

// 判断cookie是否存在
// const isCookieExist = () => cookieValue? true: false

const removeCookie = (cookiename: any) =>{
    Cookie.remove(cookiename, { path: '' })
}

export {
    cookieValue,
    isCookieExist,
    removeCookie,
}