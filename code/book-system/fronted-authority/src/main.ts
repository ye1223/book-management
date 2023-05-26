import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import  {createPinia} from 'pinia'
import router from './router'
import './api/axios.config'

// createApp(App).mount('#app')
const app = createApp(App)
const pinia = createPinia()
app
.use(pinia)
.use(ElementPlus)
.use(router)
.mount('#app')