<template>
    <div>
        <!-- 弹框 -->
        <el-dialog width="700px" title="编辑会员" :visible.sync="dislogInfo.isShow" center :before-close="cancel">
            <el-form :model="addMemberInfo" :rules="rules" ref="addMemberInfo">
                <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="addMemberInfo.phone" clearable autocomplete="off" placeholder="请输入手机号">
                    </el-input>
                </el-form-item>
                <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
                    <el-input v-model="addMemberInfo.nickname" clearable autocomplete="off" placeholder="请输入昵称">
                    </el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <p>留空则不修改原密码</p>
                    <el-input v-model="addMemberInfo.password" type="password" clearable autocomplete="off" placeholder="请输入密码">
                    </el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-switch v-model="addMemberInfo.status" active-color="#13ce66" inactive-color="#ff4949"
                        :active-value="1" :inactive-value="2">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="editMember">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { memberInfo, updateMember } from '@/utils/axios'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        data() {
            return {
                formLabelWidth: '90px', // label的宽度
                radio: '1',
                addMemberInfo: {
                    nickname: '',
                    phone: '',
                    password: '',
                    status: 1
                },
                rules: {
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '长度为 11 个字符', trigger: 'blur' }
                    ],
                    nickname: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        { min: 2, max: 8, message: '长度 2 至 8 个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        props: ['dislogInfo'],
        components: {

        },
        mounted() {
            // console.log(this);
        },
        methods: {
            // 点击关闭弹框 通过子传父改变isShow的值
            cancel() {
                this.$emit('cancel', false)
                this.reset()
            },
            // 重置输入框
            reset() {
                this.addMemberInfo = {
                    nickname: '',
                    phone: '',
                    password: '',
                    status: 1
                };
                this.$refs['addMemberInfo'].resetFields();
            },
            /*
             * 调用获取菜单列表的行动 当添加成功后 重新渲染列表信息
             */
            ...mapActions({
                getMemberList: 'member/getMemberListAction'
            }),
            // 查询一条数据
            oneMember(uid) {
                memberInfo({ uid }).
                    then(res => {
                        if (res.data.code == 200) {
                            this.addMemberInfo = res.data.list
                            this.addMemberInfo.uid = uid
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    }).catch(err => {
                        this.$message.error('错误捕获！')
                    })
            },
            // 提交编辑信息
            editMember() {
                this.$refs['addMemberInfo'].validate((valid) => {
                    if (valid) {
                        updateMember(this.addMemberInfo).
                            then((res) => {
                                if (res.data.code == 200) {
                                    this.$message.success(res.data.msg)
                                    this.cancel()
                                    // 重新调用接口渲染列表
                                    this.getMemberList()
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
            }
        }
    };
</script>

<style lang="" scoped>

</style>