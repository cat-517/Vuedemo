<template>
    <div>
        <el-dialog :title="dialogInfo.isAdd?'添加商品规格':'编辑商品规格'" :visible.sync="dialogInfo.isShow" width="700px" center
            :before-close="cancel">
            <el-form :model="addSpecsInfo" :rules="rules" ref="addSpecsInfo">
                <el-form-item label="规格名称" type="mini" :label-width="Width" prop="specsname">
                    <el-input v-model="addSpecsInfo.specsname" clearable autocomplete="off" placeholder="请输入规格名称">
                    </el-input>
                </el-form-item>

                <el-form-item v-for="(item, index) in attrArr" :label-width="Width" :label="'规格属性'+(index+1)"
                    :key="index">
                    <el-input class="ipt" v-model="item.value" placeholder="请输入商品属性"></el-input>
                    <el-button v-if='index == 0' type="primary" @click='addForm'>新增规格属性</el-button>
                    <el-button v-else type="danger" @click='delForm(item)'>删除</el-button>
                </el-form-item>

                <el-form-item label="状态" :label-width="Width">
                    <el-switch v-model="addSpecsInfo.status" active-color="#13ce66" inactive-color="#ff4949"
                        :active-value="1" :inactive-value="2">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-if="dialogInfo.isAdd" @click="addSpecs" type="primary">确 定</el-button>
                <el-button v-else @click="editSpecs" type="primary">编 辑</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    // 接口
    import { addSpecs, specsInfo, updateSpecs } from '@/utils/axios'
    export default {
        data() {
            return {
                Width: '90px',
                addSpecsInfo: {
                    specsname: '', // 规格名称
                    attrs: '', // 规格属性
                    status: 1 // 状态 1->正常 2->禁用
                },
                rules: {
                    specsname: [
                        { required: true, message: '请输入规格名称', trigger: 'blur' },
                        { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                    ]
                },
                // 动态添加表单项
                attrArr: [
                    {
                        value: ''
                    }
                ]
            };
        },
        props: ['dialogInfo'],
        components: {

        },
        methods: {
            ...mapActions({
                getSpecsList: 'specs/getSpecsListAction',
                getCount: 'specs/getCountAction'
            }),
            // 点击关闭弹框
            cancel() {
                this.$emit('cancel', false)
                this.reset()
            },
            // 重置数据
            reset() {
                this.addSpecsInfo = {
                    specsname: '', // 规格名称
                    attrs: '', // 规格属性
                    status: 1 // 状态 1->正常 2->禁用
                };
                this.$refs['addSpecsInfo'].resetFields();
                this.attrArr = [
                    {
                        value: ''
                    }
                ]
            },
            // 获取要添加管理员信息
            addSpecs() {
                this.$refs['addSpecsInfo'].validate((valid) => {
                    if (valid) {
                        this.addSpecsInfo.attrs = this.attrArr.map(item => item.value).join(',')
                        addSpecs(this.addSpecsInfo)
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.$message.success(res.data.msg)
                                    this.cancel()
                                    this.getSpecsList()
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
            oneSpecs(id) {
                specsInfo({ id })
                    .then(res => {
                        if (res.data.code == 200) {
                            let list = res.data.list[0]
                            list.attrs.map((item, index) => {
                                // 要从第二项开始循环赋值
                                if (index == 0) {
                                    this.attrArr[0].value = item
                                } else {
                                    this.attrArr.push({
                                        value: item
                                    })
                                }
                            })
                            this.addSpecsInfo = list
                            this.addSpecsInfo.id = id
                        }
                    }).catch(err => {
                        this.$message.error('捕获错误！')
                    })
            },
            // 修改信息
            editSpecs() {
                this.addSpecsInfo.attrs = this.attrArr.map(item => item.value).join(',')
                updateSpecs(this.addSpecsInfo)
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message.success(res.data.msg)
                            this.cancel()
                            this.getSpecsList()
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    }).catch(err => {
                        this.$message.error('捕获错误！')
                    })
            },
            // 点击出现新的输入框
            addForm() {
                if (this.attrArr.length < 4) {
                    this.attrArr.push({
                        value: ''
                    })
                } else {
                    this.$message.warning('最多添加4个规格属性！')
                }

            },
            // 点击删除末尾的输入框
            delForm(item) {
                var index = this.attrArr.indexOf(item)
                if (index !== -1) {
                    this.attrArr.splice(index, 1)
                }
            }
        }
    };
</script>

<style lang="" scoped>
    .ipt {
        width: 76%;
    }
</style>