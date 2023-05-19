<template>
    <el-card class="main-wrapper">
        <p>
            SOMETHING WENT WRONG
        </p>
        <p>
            <router-link to="login">点击跳转登录页</router-link> 
        </p>
    </el-card>
</template>

<style lang="less" scoped>
.main-wrapper{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    p{
        font-style: italic;
        font-size: 30px;
    }
}
</style>