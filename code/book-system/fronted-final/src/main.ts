import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import  {createPinia} from 'pinia'

// createApp(App).mount('#app')
const app = createApp(App)
const pinia = createPinia()
app
.use(pinia)
.use(ElementPlus)
.mount('#app')

