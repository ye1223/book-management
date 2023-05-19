<script setup lang="ts">
// const imgUrl = new URL('../assets/login/login-bg.png', import.meta.url).href
import imgUrl from '../assets/login/login-bg.png' //导入的是相对路径
import {ref, reactive} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios';
import {useRouter} from 'vue-router'
import { isCookieExist } from '../utils/cookie'
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const loginForm = reactive({
    username: '',
    password: ''
})
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ]
})


const loginSubmit = (formEl: FormInstance) =>{
    if (!formEl) return
    formEl.validate(async (valid: any, field: any) => {
        if(valid){
            console.log(loginForm)
            try {
                const result = await axios.post('/api/login', {
                    ...loginForm
                }).then(res=>res.data)
                
                if(result.LoginType === 'OK'){
                    console.log('login-result', result)
                    // 判断cookie存在？
                    router.push('/')
                    
                    // cookies.set('session', )
                    
                } else {
                    console.log([result.LoginType, result.ErrInfo])
                }
                } catch (error) {
                    console.log('try-catch-error', error)
                }
        } else {
            console.log('验证失败', field)
        }
    })
}

</script>

<template>
    <div>
        <el-row class="main-container">
            <el-col :span="12" class="left-wrapper" :style="{
                backgroundImage:`url(${imgUrl})`
            }">
            </el-col>
            <el-col :span="12" class="right-wrapper">
                <i class="icon">📚</i>
                <h1>Hey, hello👋🏻</h1>
                <p>欢迎来到书城</p>
                <el-card class="form-container">
                    <el-form
                        ref="ruleFormRef"
                        :model="loginForm"
                        :rules="rules"
                        status-icon
                        label-position="top"
                    >
                        <el-form-item label="用户名" prop="username">
                            <el-input class="ipt" v-model="loginForm.username" />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input class="ipt" v-model="loginForm.password" type="password"/>
                        </el-form-item>
                        <el-form-item class="btn-wrapper">
                            <el-button class="btn" @click="loginSubmit(ruleFormRef)">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="less" scoped>
.main-container{

    // justify-content: space-around;
    .left-wrapper{
        height: 100;
        // background-color: lightblue;
        background-size:cover;
    }
    .right-wrapper{
        height: 100vh;
        // background-color: lightcyan;
        padding: 5% 10%;
        .icon{
            font-size: 80px;
        }
        h1{
            margin-bottom: 10px;
            color: rgb(20,20,20);
        }
        p{
            color: rgb(173, 173, 193);
            margin-bottom: 20px;
        }
        .form-container{
            padding:0 5%;
            .btn-wrapper{
                margin-top: 20px;

                .btn{
                    font-size: 16px;
                    width: 100%;
                    // background-color: linear-gradient(to right, #ff0000, #00ff00);

                }
            }
            
        }

    }

}
</style>