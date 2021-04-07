<template>
    <div>
        <!-- 面包屑 -->
        <el-bread></el-bread>

        <!-- 添加按钮 -->
        <el-button @click="add" type="primary" size="small">
            <i class="el-icon-plus"></i>添加
        </el-button>

        <!-- 列表 -->
        <v-slist @edit='edit'></v-slist>

        <!-- 弹框 -->
        <v-sdialog ref='diaInfo' @cancel='cancel' :dialogInfo="dialogInfo"></v-sdialog>
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
                }
            };
        },
        components: {
            vSlist,
            vSdialog
        },
        methods: {
            // 打开弹框
            add() {
                this.dialogInfo.isShow = true
                this.dialogInfo.isAdd = true
            },
            // 取消弹框
            cancel(e) {
                this.dialogInfo.isShow = e
            },
            edit(e) {
                this.dialogInfo.isShow = true
                this.dialogInfo.isAdd = false
                this.$refs.diaInfo.seckInfo(e)
            }
        }
    };
</script>

<style lang="" scoped>
    .el-button {
        margin: 20px 15px;
    }
</style>