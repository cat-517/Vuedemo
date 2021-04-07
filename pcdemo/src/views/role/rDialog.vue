<template>
    <div>
        <el-dialog width="700px" :title="dialogInfo.isAdd?'添加角色':'编辑角色'" :visible.sync="dialogInfo.isShow" center
            :before-close="cancel">
            <el-form :model="addRoleInfo" :rules="rules" ref="addRoleInfo">
                <el-form-item label="角色名称" :label-width="Width" prop="rolename">
                    <el-input v-model="addRoleInfo.rolename" clearable autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色权限" :label-width="Width">
                    <el-tree :data="menuList" default-expand-all show-checkbox highlight-current node-key="id"
                        ref="tree" :props="defaultProps">
                    </el-tree>
                </el-form-item>
                <el-form-item label="状态" :label-width="Width">
                    <el-switch v-model="addRoleInfo.status" active-color="#13ce66" inactive-color="#ff4949"
                        :active-value="1" :inactive-value="2">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-if="dialogInfo.isAdd" @click="addRole" type="primary">确 定</el-button>
                <el-button v-else @click="editRole" type="primary">编 辑</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { addRole, getRoleInfo, updateRole } from '@/utils/axios'
    export default {
        data() {
            return {
                addRoleInfo: {
                    rolename: '',
                    menus: '',
                    status: 1
                },
                rules: {
                    rolename: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' },
                        { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
                    ]
                },
                Width: '90px',
                defaultProps: {
                    children: 'children',
                    label: 'title'
                }

            }
        },
        props: ['dialogInfo'],
        components: {

        },
        computed: {
            ...mapGetters({
                menuList: 'menu/getMenuList'
            })
        },
        methods: {
            ...mapActions({
                // 用于获取菜单列表信息
                getMenuList: 'menu/getMenuListAction',
                // 用于更新角色列表
                getRoleList: 'role/getRoleListAction',
            }),
            // 取消弹框
            cancel() {
                this.$emit('cancel', false)
                this.reset()
            },
            // 重置输入框
            reset() {
                this.addRoleInfo = {
                    rolename: '',
                    menus: '',
                    status: 1
                };
                this.$refs['addRoleInfo'].resetFields();
                // 重置tree结构
                this.$refs['tree'].setCheckedKeys([]);
            },
            // 添加角色信息
            addRole() {
                this.$refs['addRoleInfo'].validate((valid) => {
                    if (valid) {
                        // 将数组[1,2,3]转化为字符串'1,2,3'
                        this.addRoleInfo.menus = this.$refs['tree'].getCheckedKeys().join(',')
                        addRole(this.addRoleInfo)
                            .then((res) => {
                                if (res.data.code == 200) {
                                    this.$message.success(res.data.msg)
                                    // 添加完成后关闭并清除
                                    this.cancel()
                                    // 重新渲染
                                    this.getRoleList()
                                } else {
                                    this.$message.error(res.data.msg)
                                }
                            }).catch((err) => {
                                this.$message.error('捕获错误！')
                            })
                    } else {
                        this.$message.error('验证失败！')
                        return false;
                    }
                });
            },
            // 查询一条数据信息  并添加id属性
            oneRole(id) {
                getRoleInfo({ id })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.addRoleInfo = res.data.list
                            this.$refs['tree'].setCheckedKeys(this.addRoleInfo.menus.split(','))
                            this.addRoleInfo.id = id
                        }

                    }).catch(err => {
                        this.$message.err('错误捕获！')
                    })
            },
            // 回显数据信息 并进行编辑
            editRole() {
                this.$refs['addRoleInfo'].validate((valid) => {
                    if (valid) {
                        this.addRoleInfo.menus = this.$refs['tree'].getCheckedKeys().join(',')
                        updateRole(this.addRoleInfo)
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.$message.success(res.data.msg)
                                    this.cancel()
                                    this.getRoleList()
                                } else {
                                    this.$message.error(res.data.msg)
                                }
                            }).catch(err => {
                                this.$message.error('错误捕获！')
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        mounted() {
            if(this.getMenuList.length == 0){
                this.getMenuList()
            }
        },
    };
</script>

<style lang="" scoped>

</style>