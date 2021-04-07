<template>
    <div>
        <!-- 弹框 -->
        <el-dialog width="700px" :title="dislogInfo.isAdd?'添加菜单':'编辑菜单'" :visible.sync="dislogInfo.isShow" center
            :before-close="cancel">
            <el-form :model="addMenuInfo" :rules="rules" ref="addMenuInfo">
                <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="addMenuInfo.title" clearable autocomplete="off" placeholder="请输入菜单名称"></el-input>
                </el-form-item>
                <el-form-item label="上级菜单" :label-width="formLabelWidth" prop="pid">
                    <el-select v-model="addMenuInfo.pid" placeholder="请选择上级菜单">
                        <el-option label='顶级菜单' :value="0"></el-option>
                        <el-option v-for="item in menuList" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单类型" :label-width="formLabelWidth">
                    <el-radio v-model="addMenuInfo.type" :label="1">目录</el-radio>
                    <el-radio v-model="addMenuInfo.type" :label="2">菜单</el-radio>
                </el-form-item>
                <el-form-item v-show="addMenuInfo.type == 1" label="菜单图标" :label-width="formLabelWidth">
                    <el-select v-model="addMenuInfo.icon" placeholder="请选择图标">
                        <el-option v-for="item in iconList" :key="item.id" :label="item.name" :value="item.icon">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-show="addMenuInfo.type == 2" label="菜单地址" :label-width="formLabelWidth">
                    <el-select v-model="addMenuInfo.url" placeholder="请选择菜单地址">
                        <el-option v-for="item in indexRouters" :key="item.path" :label="item.name" :value="item.path">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-switch v-model="addMenuInfo.status" active-color="#13ce66" inactive-color="#ff4949"
                        :active-value="1" :inactive-value="2">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-if='dislogInfo.isAdd' type="primary" @click="addMenu">添 加</el-button>
                <el-button v-else type="primary" @click="editMenu">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { addMenu, getMenuInfo, postEditMenu } from '@/utils/axios'
    import { mapActions, mapGetters } from 'vuex'
    import { indexRouters } from '../../router'
    export default {
        data() {
            return {
                formLabelWidth: '90px', // label的宽度
                radio: '1',
                addMenuInfo: {
                    pid: 0, // 上级分类编号
                    title: '', // 标题
                    icon: '', // 图标
                    type: 1, // 类型 1->目录 2->菜单
                    url: '', // 菜单地址
                    status: 1 // 状态 1->正常 2->禁用
                },
                rules: {
                    title: [
                        { required: true, message: '请输入菜单名称', trigger: 'blur' },
                        { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
                    ],
                    pid: [
                        { required: true, message: '请选择上级菜单', trigger: 'change' }
                    ],
                },
                // 定义菜单集合
                indexRouters: indexRouters,
                iconList: [
                    {
                        id: 1,
                        name: '深色管理图标',
                        icon:'el-icon-s-tools'
                    },
                    {
                        id: 2,
                        name: '浅色管理图标',
                        icon:'el-icon-setting'
                    },
                    {
                        id: 3,
                        name: '深色商城图标',
                        icon:'el-icon-goods'
                    },
                    {
                        id: 4,
                        name: '浅色管理图标',
                        icon:'el-icon-s-goods'
                    }
                ]
            };
        },
        props: ['dislogInfo'],
        components: {

        },
        computed: {
            ...mapGetters({
                'menuList': 'menu/getMenuList'
            })
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
            // 点击确定 提交添加信息
            addMenu() {
                this.$refs['addMenuInfo'].validate((valid) => {
                    if (valid) {
                        addMenu(this.addMenuInfo).
                            then((res) => {
                                if (res.data.code == 200) {
                                    this.$message.success(res.data.msg)
                                    this.cancel()
                                    // 重新调用接口渲染列表
                                    this.getMenuList()
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
            // 重置输入框
            reset() {
                this.addMenuInfo = {
                    pid: 0,
                    title: '',
                    icon: '',
                    type: 1,
                    url: '',
                    status: 1
                },
                    this.$refs['addMenuInfo'].resetFields();
            },
            /*
             * 调用获取菜单列表的行动 当添加成功后 重新渲染列表信息
             */
            ...mapActions({
                getMenuList: 'menu/getMenuListAction'
            }),
            // 查询一条数据
            oneMenu(id) {
                getMenuInfo({ id }).
                    then(res => {
                        if (res.data.code == 200) {
                            this.addMenuInfo = res.data.list
                            this.addMenuInfo.id = id
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    }).catch(err => {
                        this.$message.error('错误捕获！')
                    })
            },
            // 提交编辑信息
            editMenu() {
                this.$refs['addMenuInfo'].validate((valid) => {
                    if (valid) {
                        postEditMenu(this.addMenuInfo).
                            then((res) => {
                                if (res.data.code == 200) {
                                    this.$message.success(res.data.msg)
                                    this.cancel()
                                    // 重新调用接口渲染列表
                                    this.getMenuList()
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