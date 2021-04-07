<template>
    <div>
        <el-dialog :title="dialogInfo.isAdd?'添加管理员':'编辑管理员'" :visible.sync="dialogInfo.isShow" width="700px" center
            :before-close="cancel">
            <el-form :model="addAdminInfo" :rules="rules" ref="addAdminInfo">
                <el-form-item label="所属角色" :label-width="Width" prop="roleid">
                    <el-select v-model="addAdminInfo.roleid" placeholder="请选择角色">
                        <el-option v-for="item in roleList" :key="item.id" :value="item.id" :label="item.rolename">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="用户名称" :label-width="Width" prop="username">
                    <el-input v-model="addAdminInfo.username" clearable autocomplete="off" placeholder="请输入用户名称">
                    </el-input>
                </el-form-item>

                <el-form-item label="密码" :label-width="Width">
                    <el-input v-model="addAdminInfo.password" clearable show-password type="password" autocomplete="off"
                        placeholder="请输入用户密码">
                    </el-input>
                </el-form-item>

                <el-form-item label="状态" :label-width="Width">
                    <el-switch v-model="addAdminInfo.status" active-color="#13ce66" inactive-color="#ff4949"
                        :active-value="1" :inactive-value="2">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-if="dialogInfo.isAdd" @click="addManage" type="primary">确 定</el-button>
                <el-button v-else @click="editManage" type="primary">编 辑</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    // 接口
    import { addManage, deleteManage, manageInfo, updateManage } from '@/utils/axios'
    export default {
        data() {
            return {
                Width: '90px',
                addAdminInfo: {
                    roleid: '', // 角色编号
                    username: '', // 管理员名称 
                    password: '', // 密码
                    status: 1 // 状态 1->正常 2->禁用
                },
                rules: {
                    roleid: [
                        { required: true, message: '请选择角色', trigger: 'change' }
                    ],
                    username: [
                        { required: true, message: '请输入用户名称', trigger: 'blur' },
                        { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
                    ]
                },

            };
        },
        props: ['dialogInfo'],
        components: {

        },
        computed: {
            ...mapGetters({
                // 获取角色的值
                roleList: 'role/getRoleList'
            })
        },
        methods: {
            ...mapActions({
                // 通过此找角色信息的活动 然后查询接口将信息提交
                getRoleList: 'role/getRoleListAction',
                getManageList: 'manage/getManageListAction',
                getCount: 'manage/getCountAction'
            }),
            // 点击关闭弹框
            cancel() {
                this.$emit('cancel', false)
                this.reset()
            },
            // 重置数据
            reset() {
                this.addAdminInfo = {
                    roleid: '',
                    username: '',
                    password: '',
                    status: 1
                };
                this.$refs['addAdminInfo'].resetFields();
            },
            // 获取要添加管理员信息
            addManage() {
                this.$refs['addAdminInfo'].validate((valid) => {
                    if (valid) {
                        addManage(this.addAdminInfo)
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.$message.success(res.data.msg)
                                    this.cancel()
                                    this.getManageList()
                                    this.getCount()
                                } else {
                                    this.$message.error(res.data.msg)
                                }
                            }).catch(err => {
                                this.$message.error('捕获错误！')
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 获取一条信息
            oneManage(uid) {
                manageInfo({ uid })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.addAdminInfo = res.data.list
                            this.addAdminInfo.uid = uid
                        }
                    }).catch(err => {
                        this.$message.error('捕获错误！')
                    })
            },
            // 修改信息
            editManage() {
                updateManage(this.addAdminInfo)
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message.success(res.data.msg)
                            this.cancel()
                            this.getManageList()
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    }).catch(err => {
                        this.$message.error('捕获错误！')
                    })
            }
        },
        mounted() {
            // 页面加载完成后 获取角色信息 然后找到mapActions找活动
            this.getRoleList()

        },
    };
</script>

<style lang="" scoped>

</style>