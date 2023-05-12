<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import OperateBook from './OperateBook.vue'
import axios from 'axios'
import fetchTableData from '../util/fetchTableData'
import { useDialogStore }  from '../store/dialogStore'
import usePaginationStore from '../store/paginationStore'
import useGlobalStore from '../store/globalStore'
import usePagination from '../hooks/usePagination'
import { storeToRefs } from 'pinia'
import _ from 'lodash'
const store = useDialogStore()
const globalStore = useGlobalStore()
const paginationStore = usePaginationStore()

let { tableData } = globalStore

// 每一页展示多少条数据
const { pageSize } = paginationStore

// 当前table总记录数----（数据库记录总数）
const { totalCount } = storeToRefs(paginationStore)


// 搜索框内容（v-model）
const searchValue = ref('')

const pagenationData = usePagination(searchValue)
const { currentPage } = pagenationData


// 搜索书籍（具体名字）
const SeekBookInfo = async () => {
  if (searchValue.value) {
    // 当然是从第一页展示
    await fetchTableData(1, pageSize, true, searchValue.value)
  } else {
    return
  }
}

// 新增书籍
const AddBook = () => {
  // 更改当前状态为EDIT
  store.changeStatus('new')
  
  // 打开dialog
  store.changeVisibility('open')
}



// 更新表格数据
onMounted(async () => {
  await fetchTableData(currentPage.value, pageSize)
})


watch(() => currentPage.value, (newPage) => {
  fetchTableData(newPage, pageSize)
})


const info = ref({})
const handleEdit = (index: number, row: any) => {
  store.changeStatus('edit')
  info.value = row //row 每一行表格的数据
  store.changeVisibility('open')
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

<!--   <OperateBook 
    :isShow="isShow"
    :info="info" 
    @changeShow="handleChangeShow" 
    :status="currentStatus"
    :fetchTableData="fetchTableData" 
    /> -->
  <OperateBook 
    :info="info" 
    :fetchTableData="fetchTableData" 
    />
</template>

<style lang="less" scoped>
.main {
  width: 70%;
  min-width: 560px;
  overflow: auto;
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
