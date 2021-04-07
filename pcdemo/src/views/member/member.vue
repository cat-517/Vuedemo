<template>
    <div>
        <!-- 面包屑导航 -->
        <el-bread></el-bread>

        <!-- 列表 -->
        <v-mlist class="list" @edit="edit"></v-mlist>

        <!-- 弹框 -->
        <v-mdialog ref='diaInfo' @cancel="cancel" :dislogInfo="dislogInfo"></v-mdialog>
    </div>
</template>

<script>
    import vMlist from './mlist'
    import vMdialog from './mdialog'
    export default {
        data() {
            return {
                dislogInfo: {
                    isShow: false, // 控制显示隐藏
                }
            };
        },
        components: {
            vMlist,
            vMdialog
        },
        methods: {
            // 通过子传父 改变isShow的值
            cancel(e) {
                this.dislogInfo.isShow = e
            },
            // 编辑操作
            edit(e) {
                // 弹出弹框
                this.dislogInfo.isShow = true
                // 用ref属性操作子组件的方法 并传值
                this.$refs.diaInfo.oneMember(e)
            }
        }
    };
</script>

<style lang="" scoped>
    .el-button {
        margin: 20px 15px;
    }

    .list{
        margin-top: 20px;
    }
</style>