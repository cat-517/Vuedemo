<template>
    <div>
        <!-- 面包屑导航 -->
        <el-bread></el-bread>

        <!-- 添加按钮 -->
        <el-button @click="addAdmin" type="primary" size="small">
            <i class="el-icon-plus"></i>添加
        </el-button>

        <!-- 列表 -->
        <v-glist @edit="edit"></v-glist>

        <!-- 弹框 -->
        <v-gdialog ref='diaInfo' @cancel="cancel" :dialogInfo="dialogInfo"></v-gdialog>

    </div>
</template>

<script>
    import vGlist from './glist'
    import vGdialog from './gdialog'
    export default {
        data() {
            return {
                dialogInfo: {
                    isShow: false,
                    isAdd: true
                }
            };
        },
        components: {
            vGlist,
            vGdialog
        },
        methods: {
            // 点击添加 出现弹框
            addAdmin() {
                this.dialogInfo.isShow = true
                this.dialogInfo.isAdd = true
            },
            // 接受子组件传递的值 关闭弹框
            cancel(e) {
                this.dialogInfo.isShow = e
            },
            edit(e){
                this.dialogInfo.isShow = true
                this.dialogInfo.isAdd = false
                this.$refs['diaInfo'].oneGoods(e)
            }
        }
    };
</script>

<style lang="" scoped>
    .el-button {
        margin: 20px 15px;
    }
</style>