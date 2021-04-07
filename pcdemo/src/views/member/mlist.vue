<template>
    <div>
        <!-- 
            default-expand-all 是否全展开
         -->
        <el-table :data="memberList" border style="width: 100%;">
            <el-table-column prop="uid" label="用户编号" width="240">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" width="180">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="180">
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope='item'>
                    <div>
                        <el-tag v-if='item.row.status == 1' type="success">启用</el-tag>
                        <el-tag v-else type="danger">禁用</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope='item'>
                    <div>
                        <el-button @click="edit(item.row.uid)" type="info" size="small"><i class="el-icon-edit"></i>编辑
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        data() {
            return {
            };
        },
        components: {

        },
        methods: {
            ...mapActions({
                getMemberList: 'member/getMemberListAction'
            }),
            // 点击弹出编辑框 并能够进行数据回显
            edit(uid) {
                this.$emit('edit', uid)
            }
        },
        mounted() {
            this.getMemberList()
        },
        computed: {
            ...mapGetters({
                memberList: 'member/getMemberList'
            })
        }
    };
</script>

<style lang="" scoped>

</style>