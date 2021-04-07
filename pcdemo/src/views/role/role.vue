<template>
    <div>
        <!-- 面包屑导航 -->
        <el-bread></el-bread>

        <!-- 添加按钮 -->
        <el-button @click="addRole" type="primary" size="small">
            <i class="el-icon-plus"></i>添加
        </el-button>

        <!-- 列表 -->
        <r-list @edit="edit"></r-list>

        <!-- 弹框 -->
        <r-dialog ref="diaInfo" :dialogInfo="dialogInfo" @cancel="cancel"></r-dialog>
    </div>
</template>

<script>
    import rList from './rList'
    import rDialog from './rDialog'
    export default {
        data() {
            return {
                dialogInfo: {
                    isShow: false, // 显示隐藏
                    isAdd: true // 是否添加
                }
            };
        },
        components: {
            rList,
            rDialog
        },
        methods: {
            // 点击添加 修改isShow的值 打开弹窗
            addRole() {
                this.dialogInfo.isShow = true
                this.dialogInfo.isAdd = true
            },
            // 取消弹框
            cancel(e) {
                this.dialogInfo.isShow = e
            },
            // 列表编辑
            edit(e) {
                this.dialogInfo.isShow = true
                this.dialogInfo.isAdd = false
                this.$refs.diaInfo.oneRole(e)
            }
        }
    };
</script>

<style lang="" scoped>
    .el-button {
        margin: 20px 15px;
    }
</style>