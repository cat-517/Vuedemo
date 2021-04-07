<template>
    <div>
        <el-container>
            <el-header>
                <h1>U商城后台管理系统</h1>
                <el-button type="danger" @click="logout" size="small">退出</el-button>
                <span>欢迎您：<i>{{getUserInfo.username}}</i></span>
            </el-header>
            <el-container style="height: 640px;">
                <el-aside width="200px">
                    <v-nav></v-nav>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import vNav from '../components/vNav'
    export default {
        data() {
            return {

            };
        },
        components: {
            vNav
        },
        methods: {
            ...mapActions(['changeUserInfoAction']),
            logout() {
                this.$confirm('您将退出该系统, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 触发行动
                    this.changeUserInfoAction(false)
                    this.$router.push('/login')
                    this.$message.success('退出成功！')
                }).catch(() => {
                    this.$message.info('已取消退出！')
                });
            }
        },
        computed: {
            ...mapGetters(['getUserInfo'])
        }
    };
</script>

<style lang="" scoped>
    .el-header {
        background-color: #B9D3EE;
        color: #333;
        height: 90px !important;
        line-height: 90px;
    }

    .el-header h1 {
        float: left;
        font-size: 24px;
        font-weight: bold;
        padding-left: 40px;
    }

    .el-header span {
        font-size: 18px;
        font-weight: bold;
        float: right;
        margin-right: 15px;
    }

    .el-header span i{
        font-size: 30px;
        font-family: '华文行楷';
    }

    .el-header .el-button {
        float: right;
        margin-right: 40px;
        margin-top: 28px;
    }

    .el-aside {
        background-color: #e2e7bf;
        color: #333;
    }

    .el-main {
        background-color: #fff;
        color: #333;
    }
</style>