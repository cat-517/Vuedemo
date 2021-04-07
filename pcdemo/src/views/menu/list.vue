<template>
    <div>
        <!-- 
            default-expand-all 是否全展开
         -->
        <el-table :data="menuList" border style="width: 100%;" row-key="id" :tree-props="{children: 'children'}">
            <el-table-column prop="id" label="菜单编号" width="100">
            </el-table-column>
            <el-table-column prop="title" label="菜单名称" width="160">
            </el-table-column>
            <el-table-column prop="pid" label="上级菜单" width="160">
            </el-table-column>
            <el-table-column prop="icon" label="菜单图标" width="160">
            </el-table-column>
            <el-table-column prop="url" label="菜单地址">
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
                        <el-button @click="deletes(item.row.id)" type="danger" size="small"><i
                                class="el-icon-delete"></i>删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { deleteMenu } from '@/utils/axios'
    export default {
        data() {
            return {
            };
        },
        components: {

        },
        methods: {
            ...mapActions({
                getMenuList: 'menu/getMenuListAction'
            }),
            // 删除某一条菜单信息
            deletes(id) {
                this.$confirm('是否确定删除此条数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteMenu({ id }).
                        then((res) => {
                            if (res.data.code == 200) {
                                // 重新渲染列表
                                this.getMenuList()
                                this.$message.success(res.data.msg)
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        }).catch((err) => {
                            this.$message.error('捕获错误！')
                        })
                }).catch(() => {
                    this.$message.info('已取消删除！');
                });
            },
            // 点击弹出编辑框 并能够进行数据回显
            edit(id) {
                this.$emit('edit', id)
            }
        },
        mounted() {
            // 在仓库中创建好getters 打出Vue实例 在$store上查看getter的属性
            // console.log(this,'dialog');

            // 页面一加载  就获取菜单列表接口
            this.getMenuList()
        },
        computed: {
            ...mapGetters({
                menuList: 'menu/getMenuList'
            })
        }
    };
</script>

<style lang="" scoped>

</style>