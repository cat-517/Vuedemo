<template>
    <div>
        <!-- 8eb926aa057647b2dfa37bdae889f2de -->
        <!-- 面包屑导航 -->
        <el-bread></el-bread>

        <!-- 添加按钮 -->
        <el-button @click="addAdmin" type="primary" size="small">
            <i class="el-icon-plus"></i>添加
        </el-button>

        <!-- 列表 -->
        <v-slist @edit="edit"></v-slist>

        <!-- 弹框 -->
        <v-sdialog ref='diaInfo' @cancel="cancel" :dialogInfo="dialogInfo"></v-sdialog>

    </div>
</template>

<script>
    import vSlist from './slist'
    import vSdialog from './sdialog'
    export default {
        data() {
            return {
                dialogInfo: {
                    isShow: false,
                    isAdd: true
                },
                update: true
            };
        },
        components: {
            vSlist,
            vSdialog
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
            edit(e) {
                this.dialogInfo.isShow = true
                this.dialogInfo.isAdd = false
                this.$refs['diaInfo'].oneSpecs(e)
            }
        }
    };
</script>

<style lang="" scoped>
    .el-button {
        margin: 20px 15px;
    }
</style>