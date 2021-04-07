<template>
    <div id="re">
        <div class="t">
            <h1>注册</h1>
        </div>
        <div class="inner">
            <div>
                <img :src="re_logo" alt="">
            </div>

            <div class="ipt">
                <label for="phone">手机号</label>
                <input type="text" id="phone" autocomplete="off" placeholder="请输入手机号" v-model="registerInfo.phone">
            </div>
            <div class="ipt">
                <label for="name">昵称</label>
                <input type="text" id="name" autocomplete="off" placeholder="请输入昵称" v-model="registerInfo.nickname">
            </div>
            <div class="ipt">
                <label for="pass">密码</label>
                <input type="password" id="pass" autocomplete="off" placeholder="请输入密码" v-model="registerInfo.password">
            </div>
            <div class="ipt">
                <label for="surepass">确认密码</label>
                <input type="password" id="surepass" autocomplete="off" placeholder="请确认密码" v-model="surepassword">
            </div>
            <div class="btn">
                <button type="button" @click="register">注册</button>
            </div>
            <div class="go">
                <router-link class="register" to='/sjLogin'>已有账号，去登录</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { registerInfo } from '@/utils/axios'
    import { Toast } from 'vant';
    export default {
        data() {
            return {
                re_tell: '手机号',
                re_logo: require('../assets/images/login/orange.png'),
                re_login: '登录',
                surepassword: '',
                registerInfo: {
                    phone: '',
                    nickname: '',
                    password: ''
                }
            };
        },
        components: {

        },
        methods: {
            reset() {
                this.registerInfo = {
                    phone: '',
                    nickname: '',
                    password: ''
                }
            },
            register() {
                if (!this.registerInfo.phone || !this.registerInfo.nickname || !this.registerInfo.password || !this.surepassword) {
                    Toast.fail('输入信息不能为空')
                } else if (this.registerInfo.password != this.surepassword) {
                    Toast.fail('两次输入密码不一致')
                } else {
                    registerInfo(this.registerInfo)
                        .then(res => {
                            if (res.code == 200) {
                                Toast.success(res.msg);
                                this.$router.push('/sjLogin')
                                this.reset()
                            } else {
                                Toast.fail(res.msg);
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                }

            }
        },
    };
</script>

<style lang="" scoped>
    @import '../assets/css/register.css';
</style>