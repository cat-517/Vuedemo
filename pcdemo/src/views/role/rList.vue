<template>
    <div>
        <!-- 将列表抽出 -->
        <el-table :data="roleList" border style="width: 100%;">
            <el-table-column prop="id" label="角色编号" width="100">
            </el-table-column>
            <el-table-column prop="rolename" label="角色名称" width="170">
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
                        <el-button @click="edit(item.row.id)" type="info" size="small"><i class="el-icon-edit"></i>编辑
                        </el-button>
                        <el-button @click="del(item.row.id)" type="danger" size="small"><i class="el-icon-delete"></i>删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import { deleteRole } from '@/utils/axios'
    export default {
        data() {
            return {

            };
        },
        components: {

        },
        computed: {
            ...mapGetters({
                roleList: 'role/getRoleList'
            })
        },
        methods: {
            ...mapActions({
                getRoleList: 'role/getRoleListAction'
            }),
            // 删除角色方法
            del(id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteRole({ id })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message.success(res.data.msg)
                                this.getRoleList()
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        }).catch(err => {
                            this.$message.error('捕获异常！')
                        })
                }).catch(() => {
                    this.$message('已取消删除！')
                });
            },
            // 编辑方法
            edit(id) {
                this.$emit('edit', id)
            }
        },
        mounted() {
            this.getRoleList()
        },
    };
</script>

<style lang="" scoped>

</style>