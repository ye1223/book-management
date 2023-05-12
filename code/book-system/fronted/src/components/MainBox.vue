<script setup lang="ts">
import { ref, reactive, onMounted, toRaw, computed, watch } from 'vue'
import OperateBook from './OperateBook.vue'
import axios from 'axios'
import debounce from '../util/debounce'

/* 
  表格字段：（Id, BookName, Author, TypeName, Remarks）
*/
let tableData: any = reactive([])

/* 
    定义操作的类型：
      Status.EDIT : 编辑
      Status.NEW : 新增
*/
enum Status {
  EDIT,
  NEW
}
// 当前状态信息
let currentStatus: number

// 是否展示dialog
const isShow = ref(false)

// 每一页展示多少条数据
const pageSize = 5
// 当前页
let currentPage = ref(1)
// 当前table总记录数----（数据库记录总数）
let totalCount = ref(0)


// 搜索框内容（v-model）
const searchValue = ref('')


const debounceFetchTabelData = debounce(async ()=>{
    await fetchTableData(1, pageSize)
})
// 监视搜索框内容变化
watch(()=>searchValue.value, (newVal)=>{
  if(newVal){
    debounceFetchTabelData()
  }
})


// 搜索书籍（具体名字）
const SeekBookInfo = async () => {
  if (searchValue.value) {
    // 当然是从第一页展示
    fetchTableData(1, pageSize, true)
  } else {
    return
  }
}

// 新增书籍
const AddBook = () => {
  // 更改当前状态为EDIT
  currentStatus = Status.NEW
  // 打开dialog
  isShow.value = true
}



// 更新表格数据
onMounted(async () => {
  await fetchTableData(currentPage.value, pageSize)
})

const fetchTableData = async (page: number = 1, limit: number = pageSize, search: boolean = false,) => {
  try {
    if (!search) {
      // 更新表格数据
      const { backendData, length } = await axios(`/api/get?limit=${limit}&&page=${page}`).then(res => res.data)
      console.log('d', backendData)
      totalCount.value = length
      tableData.splice(0) //清空数组
      tableData.push(...backendData)
    } else {
      const { backendData, length } = await axios.get(`/api/get/${searchValue.value}`).then(res => res.data)
      if (backendData.length) {
        totalCount.value = length
        console.log('aaaaa', totalCount.value)
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

watch(() => currentPage.value, (newPage) => {
  fetchTableData(newPage, pageSize)
})


/********************操作*********************/
const info = ref({})
const handleEdit = (index: number, row: any) => {

  currentStatus = Status.EDIT

  info.value = row //row 每一行表格的数据

  isShow.value = true
}
const handleDelete = async (index: number, row: any) => {
  try {
    await axios.delete(`/api/del?delId=${row.Id}`).then(res => {
      console.log(res.data)
    })
    // 更新table
    await fetchTableData() 
  } catch (error) {
    console.log('try-catch-error', error)
  }
}

/* *****************子传父函数处理************************* */
const handleChangeShow = (data: boolean) => {
  isShow.value = data
}

// 当前页变更
const handleCurrentChange = (val: number) => {
  currentPage.value = val
}


</script>

<template>
  <el-card class="main">
    <el-row class="search-container" :gutter="20">
      <el-col :span="12" class="input-container">
        <el-input v-model="searchValue" placeholder="请输入查询的书籍" />

      </el-col>
      <el-col :span="12" class="button-container">
        <el-button type="primary" @click="SeekBookInfo">查询</el-button>
        <el-button type="success" @click="AddBook">新增</el-button>
      </el-col>
    </el-row>

    <el-table class="table" :data="tableData" style="width: 100%; text-align: center;">
      <template #empty>
        <span>没有数据您想要的书籍呢</span>
      </template>
      <el-table-column prop="Id" label="ID" />
      <el-table-column prop="BookName" label="书名" />
      <el-table-column prop="Author" label="作者" />
      <el-table-column prop="TypeName" label="类型" />
      <el-table-column prop="Remarks" label="备注" />
      <el-table-column label="操作" fixed="right" width="140" class="operation">
        <template #default="scope">
          <el-button size="small" type="info" round @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button size="small" type="danger" round @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>



      <template #append>
        <el-pagination :total="totalCount" v-model:current-page="currentPage" :page-size="pageSize"
          @current-change="handleCurrentChange"
          style="justify-content: center; margin: 10px 0;" layout="prev, pager, next" />
      </template>
    </el-table>

  </el-card>

  <OperateBook 
    :isShow="isShow"
    :info="info" 
    @changeShow="handleChangeShow" 
    :status="currentStatus"
    :fetchTableData="fetchTableData" 
    />
</template>

<style lang="less" scoped>
.main {
  width: 70%;
  margin: 100px auto;
  background-color: lightblue;

  .search-container {
    /* display: flex;
    justify-content: space-around;
    align-items: center; */
    margin-bottom: 20px;
  }

  .table {

    // text-align: center;
    .operation {
      margin: 0 auto;
    }
  }
}
</style>
