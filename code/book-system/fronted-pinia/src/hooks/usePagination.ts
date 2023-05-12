import { ref, watch } from 'vue'
import debounce from '../util/debounce'
import fetchTableData from '../util/fetchTableData' 
import usePaginationStore from '../store/paginationStore'

const usePagination = (searchValue: any) => {
    const paginationStore = usePaginationStore()
    // 每一页展示多少条数据
    // const pageSize = 5
    const { pageSize } = paginationStore
    // 当前页
    let currentPage = ref(1)
    // 当前table总记录数----（数据库记录总数）
    // let totalCount = ref(0)
    const { totalCount } = paginationStore

    // 搜索框内容（v-model）
    // const searchValue = ref('')


    const debounceFetchTabelData = debounce(async () => {
        console.log(searchValue.value)
        await fetchTableData(1, pageSize)
    }, 500)
    // 监视搜索框内容变化
    watch(() => searchValue.value, (newVal) => {
        if (newVal) {
            // debounceFetchTabelData()
            fetchTableData(1, pageSize)
        }
    })

    return {
        currentPage
    }
}
export default usePagination