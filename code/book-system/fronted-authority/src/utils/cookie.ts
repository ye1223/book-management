import Cookie from 'js-cookie'

const cookieValue = Cookie.get('SESSION_ID')

// 判断cookie是否存在
const isCookieExist = () => cookieValue? true: false

export {
    cookieValue,
    isCookieExist
}