<script lang="ts" setup>
import { computed, reactive, ref, watch, } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios'
import { useDialogStore } from '../store/dialogStore';
import useGlobalStore from '../store/globalStore'
const store = useDialogStore()
const globalStore = useGlobalStore()
const { Status } = globalStore

const props = defineProps({
  // isShow: Boolean,
  info: Object, //某一行表格的数据
  // status: Number,
  fetchTableData: Function
})
// dialog可见性
// const dialogVisible = computed(() => props.isShow)
let dialogVisible = computed(() => store.isShow)

// 子传父emitter（changeShow：改变父组件的isShow状态）
// const emit = defineEmits(['changeShow'])

// 获取table表格数据函数
const fetchTableData = props.fetchTableData as Function

// 表单数据定义
let formData = reactive({
  Id: (Date.now() + '').slice(-6, -1),
  BookName: '',
  Author: '',
  TypeName: '',
  Remarks: ''
})
// 表单的引用
const ruleFormRef = ref<FormInstance>()
// 表单校验规则
const rules = reactive<FormRules>({
  Id: [
    { required: false, message: '请输入书名', trigger: 'blur' }
  ],
  BookName: [
    { required: true, message: '请输入书名', trigger: 'blur' }
  ],
  Author: [
    { required: true, message: '请输入作者名', trigger: 'blur' }
  ],
  TypeName: [
    { required: true, message: '请输入类型', trigger: 'blur' }
  ],
  Remarks: [
    { required: true, message: '请输入评论', trigger: 'blur' }
  ]
})

// 监视传来的某一行表格数据，并赋值给表单
watch(() => props.info, newInfo => {
  if (newInfo) {
    // 赋值给表单
    formData = Object.assign(formData, {
      Id: newInfo.Id,
      BookName: newInfo.BookName,
      Author: newInfo.Author,
      TypeName: newInfo.TypeName,
      Remarks: newInfo.Remarks
    })
  }
})


// dialog 提交保存按钮
const handleSave = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid: any, fields: any) => {
    if (!valid) return fields //如果验证失败就return 当前失败的字段

    // 新增 status
    // if (props.status === 1) {
    if (store.currentStatus === Status.NEW) {
      // formEl.resetFields()
      console.log('formdata', formData)
      try {
        await axios.post('/api/books/add', {
          ...formData
        }).then(res => {
          console.log('res', res.data)
        })
        await fetchTableData()
      } catch (error) {
        console.log('try-catch-error', error)
      }
      formEl.resetFields() //清空表单 
      formData.Id = (Date.now() + '').slice(-6, -1) //再次更新表单的ID

      // 更新表格
      await fetchTableData(1, 5)

      // 编辑状态
    // } else if (props.status === 0) {
    } else if (store.currentStatus === Status.EDIT) {
      try {
        await axios.put('/api/books/edit', {
          ...formData
        }).then(res => {
          console.log(res.data)
        })
        // 更新表格
        await fetchTableData(1, 5)
      } catch (error) {
        console.log('try-catch-error', error)
      }
    }
  })

  // 关闭dialog
  // emit('changeShow', false)
  store.changeVisibility('close')
}
// dialog 取消保存
const handleCancel = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  // 关闭dialog
  // emit('changeShow', false)
  store.changeVisibility('close')
  //重置成打开时的样子
  formEl.resetFields()
}

</script>

<template>
  <el-dialog 
    v-model="dialogVisible" 
    width="60%" 
    draggable 
    modal 
    :show-close="false" 
    :close-on-click-modal="false"
  >
    <!--
        modal 遮罩层
        :show-close="false"   是否显示关闭按钮
        close-on-click-modal 是否可以通过点击 modal 关闭 Dialog 
      -->
    <el-form 
      ref="ruleFormRef" 
      :rules="rules" 
      :model="formData" 
      class="form"
    >
      <el-form-item label="Id" prop="Id" :label-width="140">
        <el-input v-model="formData.Id" autocomplete="off" />
      </el-form-item>
      <el-form-item label="书名" prop="BookName" :label-width="140">
        <el-input v-model="formData.BookName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="作者" prop="Author" :label-width="140">
        <el-input v-model="formData.Author" autocomplete="off" />
      </el-form-item>
      <el-form-item label="类型" prop="TypeName" :label-width="140">
        <el-input v-model="formData.TypeName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注" prop="Remarks" :label-width="140">
        <el-input v-model="formData.Remarks" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button type="primary" @click="handleSave(ruleFormRef)">
          保存
        </el-button>
        <el-button type="primary" @click="handleCancel(ruleFormRef)">
          取消
        </el-button>
      </span>
    </template>

  </el-dialog>
</template>

<style lang="less" scoped>
.form {
  margin-right: 40px;
}
</style>