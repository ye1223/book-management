export default (myProxy: any) => {

    // 检查 Proxy 对象是否为空
    if (Object.keys(myProxy).length === 0) {
        return true
    } else {
        return false
    }

}