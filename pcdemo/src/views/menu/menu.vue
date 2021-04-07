<template>
    <div>
        <!-- 面包屑导航 -->
        <el-bread></el-bread>

        <!-- 添加按钮 -->
        <el-button @click="add" type="primary" size="small">
            <i class="el-icon-plus"></i>添加
        </el-button>

        <!-- 列表 -->
        <v-list @edit="edit"></v-list>

        <!-- 弹框 -->
        <v-dialog ref='diaInfo' @cancel="cancel" :dislogInfo="dislogInfo"></v-dialog>
    </div>
</template>

<script>
    import vList from './list'
    import vDialog from './dialog'
    export default {
        data() {
            return {
                dislogInfo: {
                    isShow: false, // 控制显示隐藏
                    isAdd: true // 是否添加
                }
            };
        },
        components: {
            vList,
            vDialog
        },
        methods: {
            // 点击显示弹框组件
            add() {
                this.dislogInfo.isShow = true
                this.dislogInfo.isAdd = true
            },
            // 通过子传父 改变isShow的值
            cancel(e) {
                this.dislogInfo.isShow = e
            },
            // 编辑操作
            edit(e) {
                // 弹出弹框
                this.dislogInfo.isShow = true
                // 设置标识  标识此时弹出为编辑
                this.dislogInfo.isAdd = false
                // 用ref属性操作子组件的方法 并传值
                this.$refs.diaInfo.oneMenu(e)
            }
        }
    };
</script>

<style lang="" scoped>
    .el-button {
        margin: 20px 15px;
    }
</style>