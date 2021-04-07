<template>
    <div id="wx">
        <div class="t">
            <i class="iconfont">&#xe605;</i>
            <h1>登录</h1>
        </div>
        <p class="title">{{wx_title}}</p>
        <div>
            <img :src="wx_logo" alt="">
        </div>
        <button class="btn">{{wx_login}}</button>
        <p class="code">{{wx_code}}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                wx_title: '欢迎登陆小U商城',
                wx_logo: require('../assets/images/login/orange.png'),
                wx_login: '微信用户一键登录',
                wx_code: '手机号验证注册/登录'
            };
        },
        components: {

        },
        methods: {

        }
    };
</script>

<style lang="" scoped>
    @import '../assets/css/wxLogin.css';
</style>