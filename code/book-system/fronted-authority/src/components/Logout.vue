<template>
    <el-button @click="exit">退出</el-button>
</template>

<script setup lang="ts">
import axios from 'axios';
import {useRouter} from 'vue-router'
import {removeCookie} from '../utils/cookie'
const router = useRouter()
const exit = async () => {
    await axios.get('/api/logout').then(res=>res.data)
    // removeCookie('SESSION_ID')
    // document.cookie = 'cookieName=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.replace('/login')
}
</script>