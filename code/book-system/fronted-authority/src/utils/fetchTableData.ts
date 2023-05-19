import api from '../api/index'
import useGlobalStore from "../store/globalStore"
import usePaginationStore from '../store/paginationStore'
import { storeToRefs } from 'pinia'

const fetchTableData = async (page: number = 1, limit: number = 5, search?: boolean, searchValue?: string) => {
    const globalStore = useGlobalStore()
    const paginationStore = usePaginationStore()
    const { tableData } = globalStore
    const { totalCount } = storeToRefs(paginationStore)

    try {
      if (!search) {
        // 更新表格数据
        // const { backendData, length } = await axios.get(`/api/get?limit=${limit}&&page=${page}`).then(res => res.data)
        const { backendData, length } = await api.book.get(limit, page)
        console.log('aaa', backendData)
        totalCount.value = length
        tableData.splice(0) //清空数组
        tableData.push(...backendData)
        // updateTableData(tableData, totalCount.value, backendData)
      } else {
        // const { backendData, length } = await axios.get(`/api/get/${searchValue.value}`).then(res => res.data)
        const { backendData, length } = await api.book.search(searchValue as string)
        if (backendData.length) {
          totalCount.value = length
          tableData.splice(0)
          tableData.push(...backendData)
        } else {
          tableData.splice(0)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  export default fetchTableData