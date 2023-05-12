import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import useGlobalStore from './globalStore'

export const useDialogStore = defineStore('dialog', () => {
    
    const globalStore = useGlobalStore()
    /* 
        解构时针对响应式数据的 storeToRefs(globalStore)
    */
    const { Status } = globalStore


    const isShow = ref(false)
      // 当前状态信息
    let currentStatus = ref(-1)

    const changeVisibility = (status: string) => {
        if (status === 'open') {
            isShow.value = true
        } else if (status === 'close') {
            isShow.value = false
        } else {
            return
        }
    }

    const changeStatus = (status: string) =>{
        if(status === 'new'){
            currentStatus.value = Status.NEW
        } else if (status === 'edit') {
            currentStatus.value = Status.EDIT
        } else {
            console.log('change-status-err')
            return
        }
    }

    return {
        isShow,
        currentStatus,
        changeVisibility,
        changeStatus
    }
})