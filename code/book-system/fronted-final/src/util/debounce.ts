// 防抖函数
const debounce = (fn: Function, time: number) => {
    let timer: number | null = null
    return function (this: any, ...args: any) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
            timer = null
        }, time)
    }
}
export default debounce