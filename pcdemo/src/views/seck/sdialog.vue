<template>
    <div>
        <el-dialog width="700px" :title="dialogInfo.isAdd?'添加秒杀':'编辑秒杀'" :visible.sync="dialogInfo.isShow" center
            :before-close="cancel">
            <el-form :model="addSeckInfo" :rules="rules" ref="addSeckInfo">
                <el-form-item label="活动名称" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="addSeckInfo.title" clearable autocomplete="off" placeholder="请输入秒杀名称">
                    </el-input>
                </el-form-item>
                <el-form-item label="活动期限" :label-width="formLabelWidth">
                    <el-date-picker v-model="timer" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="一级分类" :label-width="formLabelWidth">
                    <el-select @change="changeCate(false)" v-model="addSeckInfo.first_cateid" placeholder="请选择一级分类">
                        <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类" :label-width="formLabelWidth">
                    <el-select @change="changeGoods(false)" v-model="addSeckInfo.second_cateid" placeholder="请选择二级分类">
                        <el-option v-for="item in secondCate" :key="item.id" :label="item.catename" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品" :label-width="formLabelWidth">
                    <el-select v-model="addSeckInfo.goodsid" placeholder="请选择商品">
                        <el-option v-for="item in goodsArr" :key="item.id" :label="item.goodsname" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-switch v-model="addSeckInfo.status" active-color="#13ce66" inactive-color="#ff4949"
                        :active-value="1" :inactive-value="2">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button @click="addSeck" v-if='dialogInfo.isAdd' type="primary">添 加</el-button>
                <el-button @click="editSeck" v-else type="primary">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { addSeck, seckInfo, updateSeck, goodsList } from '@/utils/axios'
    export default {
        data() {
            return {
                addSeckInfo: {
                    title: '',
                    begintime: '',
                    endtime: '',
                    first_cateid: '',
                    second_cateid: '',
                    goodsid: '',
                    status: 1
                },
                timer: "",// 时间
                formLabelWidth: '90px',
                secondCate: [], // 二级分类
                goodsArr: [],
                rules: {
                    title: [
                        { required: true, message: '请输入秒杀名称', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        components: {

        },
        mounted() {
            this.getSeckList(),
                this.getCateList()
        },
        computed: {
            ...mapGetters({
                cateList: 'cate/getCateList'
            })
        },
        methods: {
            changeCate(n) {
                let idx = this.cateList.findIndex(item => this.addSeckInfo.first_cateid == item.id)
                this.secondCate = this.cateList[idx].children
                if (!n) {
                    this.addSeckInfo.second_cateid = ''
                    this.addSeckInfo.goodsid = ''
                }
            },
            changeGoods(n) {
                goodsList({
                    fid: this.addSeckInfo.first_cateid,
                    sid: this.addSeckInfo.second_cateid
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.goodsArr = res.data.list
                        }
                    }).catch(err => {
                        this.$message.error('捕获错误')
                    })
                if (!n) {
                    this.addSeckInfo.goodsid = ''
                }
            },
            ...mapActions({
                getSeckList: 'seck/getSeckListAction',
                getCateList: 'cate/getCateListAction'
            }),
            // 点击取消 关闭弹框
            cancel() {
                this.$emit('cancel', false)
                this.reset()
            },
            // 重置事件
            reset() {
                this.addSeckInfo = {
                    title: '',
                    begintime: '',
                    endtime: '',
                    first_cateid: '',
                    second_cateid: '',
                    goodsid: '',
                    status: 1
                };
                this.$refs['addSeckInfo'].resetFields();
                this.timer = ''
            },
            // 点击添加
            addSeck() {
                /*
                 * 有文件上传 文件的传输格式必须是FORMDATA的格式，enctype = 'multipart/form-data'
                 */
                this.$refs['addSeckInfo'].validate((valid) => {
                    if (valid) {
                        this.addSeckInfo.begintime = new Date(this.timer[0]).getTime()
                        this.addSeckInfo.endtime = new Date(this.timer[1]).getTime()
                        addSeck(this.addSeckInfo)
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.$message.success(res.data.msg)
                                    this.cancel()
                                    this.getSeckList()
                                } else {
                                    this.$message.error(res.data.msg)
                                }
                            }).catch(err => {
                                this.$message.error('捕获错误！')
                            })
                    } else {
                        this.$message.error('验证失败！')
                    }
                });
            },
            seckInfo(id) {
                seckInfo({ id })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.addSeckInfo = res.data.list
                            this.addSeckInfo.id = id
                            // 时间回显
                            this.timer = [new Date(parseInt(this.addSeckInfo.begintime)), new Date(parseInt(this.addSeckInfo.endtime))]
                            this.changeCate(true)
                            this.changeGoods(true)
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
            },
            editSeck() {
                this.$refs['addSeckInfo'].validate((valid) => {
                    if (valid) {
                        this.addSeckInfo.begintime = new Date(this.timer[0]).getTime()
                        this.addSeckInfo.endtime = new Date(this.timer[1]).getTime()
                        updateSeck(this.addSeckInfo)
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.$message.success(res.data.msg)
                                    this.cancel()
                                    this.getSeckList()
                                } else {
                                    this.$message.error(res.data.msg)
                                }
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        props: ['dialogInfo']
    };
</script>

<style lang="" scoped>

</style>