<template>
    <div>
        <!-- 将列表抽出 -->
        <el-table :data="manageList" border style="width: 100%;">
            <el-table-column prop="uid" label="用户编号" width="260">
            </el-table-column>
            <el-table-column prop="username" label="用户名称" width="180">
            </el-table-column>
            <el-table-column prop="rolename" label="所属角色" width="240">
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
                        <el-button @click="del(item.row.uid)" type="danger" size="small"><i class="el-icon-delete"></i>删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination @current-change="changePage" :page-size="size" background layout="prev, pager, next"
            :total="count">
        </el-pagination>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { deleteManage } from '@/utils/axios'
    export default {
        data() {
            return {

            };
        },
        components: {

        },
        methods: {
            ...mapActions({
                getManageList: 'manage/getManageListAction',
                // 获取总数
                getCount: 'manage/getCountAction',
                changePageAction: 'manage/changePageAction'
            }),
            // 切换页码的方法
            changePage(n) {
                this.changePageAction(n)
            },
            // 删除方法
            del(uid) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteManage({ uid })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message.success(res.data.msg)
                                this.getManageList()
                                this.getCount()
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        }).catch(err => {
                            this.$message.error('捕获错误！')
                        })
                }).catch(() => {
                    this.$message('已取消删除！')
                });
            },
            // 弹出编辑框
            edit(uid){
                this.$emit('edit',uid)
            }
        },
        mounted() {
            this.getManageList()
            this.getCount()
        },
        computed: {
            ...mapGetters({
                // 获取管理员列表的值
                manageList: 'manage/getManageList',
                count: 'manage/getCount',
                size: 'manage/getSize'
            })

        }
    };
</script>

<style lang="" scoped>
    .el-pagination {
        float: right;
        margin-top: 20px;
    }
</style>