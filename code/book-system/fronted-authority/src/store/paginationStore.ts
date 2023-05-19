import { defineStore } from "pinia";
import { ref } from 'vue'
 
const usePaginationStore = defineStore('paginationStore', ()=>{

    // 一页展示5行
    const pageSize = 5
    // 当前table总记录数----（数据库记录总数）
    let totalCount = ref(0)
    

    return {
        pageSize,
        totalCount
    }
})

export default usePaginationStore