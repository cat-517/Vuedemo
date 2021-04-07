<template>
    <div id="sj">
        <div class="t">
            <h1>登录</h1>
        </div>
        <div class="inner">
            <div>
                <img :src="sj_logo" alt="">
            </div>

            <div class="ipt">
                <label for="phone">手机号</label>
                <input type="text" id="phone" autocomplete="off" placeholder="请输入手机号" v-model="loginInfo.phone">
            </div>
            <div class="ipt">
                <label for="code">密码</label>
                <input type="password" id="code" autocomplete="off" placeholder="请输入密码" v-model="loginInfo.password">
            </div>
            <div class="btn">
                <button type="button" @click="login">登录</button>
            </div>
            <div class="go">
                <router-link class="register" to='/register'>没有账号，去注册</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { loginInfo } from '@/utils/axios'
    import { Toast } from 'vant';
    import { mapActions } from 'vuex'
    export default {
        data() {
            return {
                sj_tell: '手机号',
                sj_logo: require('../assets/images/login/orange.png'),
                sj_login: '登录',
                loginInfo: {
                    phone: '',
                    password: ''
                }
            };
        },
        components: {

        },
        methods: {
            ...mapActions(['changeUserAction']),
            reset() {
                this.loginInfo = {
                    phone: '',
                    password: ''
                }
            },
            login() {
                loginInfo(this.loginInfo)
                    .then(res => {
                        if (res.code == 200) {
                            // sessionStorage.setItem('user', JSON.stringify(res.list))
                            this.changeUserAction(res.list)
                            Toast.success(res.msg)
                            this.$router.push('/index')
                            this.reset()
                        } else {
                            Toast.fail(res.msg)
                        }
                    }).catch(err => {
                        console.log(err);
                    })
            }
        }
    };
</script>

<style lang="" scoped>
    @import '../assets/css/sjLogin.css';
</style>