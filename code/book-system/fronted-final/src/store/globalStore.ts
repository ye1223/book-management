import { defineStore } from "pinia";
import { reactive } from "vue";

const useGlobalStore = defineStore('global', () => {
    enum Status {
        EDIT,
        NEW
    }
    let tableData: any = reactive([])

    return {
        Status,
        tableData
    }
})

export default useGlobalStore