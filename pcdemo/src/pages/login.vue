<template>
    <div id="wrap">
        <div class="inner">
            <h1>U商城后台管理系统</h1>
            <el-form :model="loginInfo" :rules="rules" label-width="80px" ref="loginInfo">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginInfo.username" placeholder="请输入用户名" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginInfo.password" type='password' placeholder="请输入密码" show-password clearable>
                    </el-input>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" @click="login('loginInfo')">登录</el-button>
                    <el-button type="info" @click="reset('loginInfo')">重置</el-button>
                </el-form-item>
            </el-form>
            </el-alert>
        </div>
    </div>
</template>

<script>
    import { manageLogin } from '@/utils/axios'
    import { mapActions } from 'vuex'
    export default {
        data() {
            return {
                loginInfo: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ],
                }
            };
        },
        components: {

        },
        // 离开前触发
        beforeRouteLeave(to, from, next) {
            if (sessionStorage.getItem('userInfo') == null) {
                location.reload();
                next('/login')
            } else {
                next()
                // location.reload();
            }
        },
        methods: {
            ...mapActions(['changeUserInfoAction']),
            // 封装登录事件
            login(loginInfo) {
                this.$refs[loginInfo].validate((valid) => {
                    if (valid) {
                        manageLogin(this.loginInfo)
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.$message.success(res.data.msg)
                                    // sessionStorage.setItem('userInfo', JSON.stringify(res.data.list))
                                    this.changeUserInfoAction(res.data.list)
                                    this.$router.push('/index')
                                } else {
                                    this.$message.error(res.data.msg)
                                }
                            }).catch(err => {
                                this.$message.error('捕获错误！')
                            })
                    } else {
                        this.$message.error('验证失败！')
                        return false;
                    }
                });
            },
            // 封装重置事件
            reset(loginInfo) {
                this.$refs[loginInfo].resetFields()
            }
        }
    };
</script>

<style lang="" scoped>
    #wrap {
        background: linear-gradient(#E0EEE0, #F0FFF0);
        width: 100vw;
        height: 100vh;
    }

    #wrap .inner {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 500px;
        height: 400px;
        margin: -200px 0 0 -250px;
    }

    #wrap .inner h1 {
        font-size: 30px;
        text-align: center;
        margin: 40px 0;
        font-weight: bold;
    }

    #wrap .inner .btn {
        margin-top: 30px;
    }
</style>