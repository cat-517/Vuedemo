<template>
    <div>
        <el-dialog :title="dialogInfo.isAdd?'添加商品管理':'编辑商品管理'" :visible.sync="dialogInfo.isShow" width="700px" center
            :before-close="cancel" @opened="createEditor">
            <el-form :model="addGoodsInfo" :rules="rules" ref="addGoodsInfo">
                <el-form-item label="一级分类" :label-width="Width" prop="first_cateid">
                    <el-select @change="changeCate(false)" v-model="addGoodsInfo.first_cateid" placeholder="请选择一级分类">
                        <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类" :label-width="Width" prop="second_cateid">
                    <el-select v-model="addGoodsInfo.second_cateid" placeholder="请选择二级分类">
                        <el-option v-for="item in secondCate" :key="item.id" :label="item.catename" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称" :label-width="Width" prop="goodsname">
                    <el-input v-model="addGoodsInfo.goodsname" clearable autocomplete="off" placeholder="请输入商品名称">
                    </el-input>
                </el-form-item>
                <el-form-item label="价格" :label-width="Width" prop="price">
                    <el-input v-model="addGoodsInfo.price" clearable autocomplete="off" placeholder="请输入价格">
                    </el-input>
                </el-form-item>
                <el-form-item label="市场价格" :label-width="Width" prop="market_price">
                    <el-input v-model="addGoodsInfo.market_price" clearable autocomplete="off" placeholder="请输入市场价格">
                    </el-input>
                </el-form-item>
                <el-form-item label="图片" :label-width="Width">
                    <el-upload action="#" list-type="picture-card" :on-preview="onPreview" :on-remove="handleRemove"
                        :auto-upload='false' :limit='1' :on-exceed='onExceed' :on-change="onChange"
                        :file-list='fileList'>
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="商品规格" :label-width="Width" prop="specsid">
                    <el-select @change="changeSpecs(false)" v-model="addGoodsInfo.specsid" placeholder="请选择商品规格">
                        <el-option v-for="item in specsList" :key="item.id" :label="item.specsname" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="规格属性" :label-width="Width" prop="specsattr">
                    <el-select multiple v-model="addGoodsInfo.specsattr" placeholder="请选择规格属性">
                        <el-option v-for="item in secondSpecs" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否新品" :label-width="Width">
                    <el-radio v-model="addGoodsInfo.isnew" :label="1">是</el-radio>
                    <el-radio v-model="addGoodsInfo.isnew" :label="2">否</el-radio>
                </el-form-item>
                <el-form-item label="是否热卖" :label-width="Width">
                    <el-radio v-model="addGoodsInfo.ishot" :label="1">是</el-radio>
                    <el-radio v-model="addGoodsInfo.ishot" :label="2">否</el-radio>
                </el-form-item>
                <el-form-item label="商品描述" :label-width="Width">
                    <div id="wangeditor"></div>
                </el-form-item>

                <el-form-item label="状态" :label-width="Width">
                    <el-switch v-model="addGoodsInfo.status" active-color="#13ce66" inactive-color="#ff4949"
                        :active-value="1" :inactive-value="2">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-if="dialogInfo.isAdd" @click="addGoods" type="primary">确 定</el-button>
                <el-button v-else @click="editGoods" type="primary">编 辑</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    // 接口
    import { addGoods, goodsInfo, updateGoods } from '@/utils/axios'
    import E from 'wangeditor'
    export default {
        data() {
            return {
                Width: '90px',
                addGoodsInfo: {
                    first_cateid: '', // 一级分类
                    second_cateid: '', // 二级分类
                    goodsname: '', // 商品名称
                    price: '', // 商品价格
                    market_price: '', // 市场价格
                    img: '', // 商品图片
                    description: '', // 商品描述
                    specsid: '', // 规格编号
                    specsattr: '', // 规格属性
                    isnew: 1, // 是否新品
                    ishot: 1, // 是否热卖
                    status: 1 // 状态 1->正常 2->禁用
                },
                editor: null,
                // 创建二级分类数组
                secondCate: [],
                secondSpecs: [],
                rules: {
                    first_cateid: [
                        { required: true, message: '请选择一级分类', trigger: 'change' }
                    ],
                    second_cateid: [
                        { required: true, message: '请选择二级分类', trigger: 'blur' }
                    ],
                    goodsname: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请输入价格', trigger: 'blur' },
                    ],
                    market_price: [
                        { required: true, message: '请输入市场价格', trigger: 'blur' },
                    ],
                    specsid: [
                        { required: true, message: '请选择商品规格', trigger: 'change' }
                    ],
                    specsattr: [
                        { required: true, message: '请选择规格属性', trigger: 'blur' }
                    ]
                },
                // 用于控制图片预览的显示隐藏
                dialogVisible: false,
                // 预览调用的图片地址
                dialogImageUrl: '',
                // 设置图片地址 用于接收所有文件详情
                imgUrl: '',
                fileList: [], // 用于图片回显
            };
        },
        props: ['dialogInfo'],
        computed: {
            ...mapGetters({
                cateList: 'cate/getCateList',
                specsList: 'specs/getSpecsList'
            })
        },
        components: {

        },
        mounted() {
            // 调用分类列表
            this.getCateList()
            // this.getGoodsList()
            this.getSpecsList()

        },
        methods: {
            createEditor() {
                this.editor = new E('#wangeditor')
                this.editor.create()
                this.editor.txt.html(this.addGoodsInfo.description)
            },
            // 根据一级分类选择内容 获取二级分类
            changeCate(n) {
                // 利用双向数据绑定
                let idx = this.cateList.findIndex(item => item.id == this.addGoodsInfo.first_cateid)
                this.secondCate = this.cateList[idx].children
                // 判断去清空二级分类内容
                if (!n) {
                    this.addGoodsInfo.second_cateid = ''
                }
            },
            changeSpecs(n) {
                let idx = this.specsList.findIndex(item => item.id == this.addGoodsInfo.specsid)
                this.secondSpecs = this.specsList[idx].attrs
                if (!n) {
                    this.addGoodsInfo.specsattr = []
                }
            },
            // 预览的钩子函数
            onPreview(file) {
                // 得到文件地址后，把他复制给显示的属性
                this.dialogImageUrl = file.url
                // 打开图片预览弹框
                this.dialogVisible = true
            },
            // 移除时触发的钩子函数
            handleRemove(file, filelist) {

            },
            // 文件发生变化时触发的函数
            onChange(file, filelist) {
                // console.log(file, filelist);
                this.imgUrl = file.raw // 把文件详情赋值给图片地址
            },
            onExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            ...mapActions({
                getSpecsList: 'specs/getSpecsListAction',
                getGoodsList: 'goods/getGoodsListAction',
                getCateList: 'cate/getCateListAction',
                getCount: 'goods/getCountAction'
            }),
            // 点击关闭弹框
            cancel() {
                this.$emit('cancel', false)
                this.reset()
            },
            // 重置数据
            reset() {
                this.addGoodsInfo = {
                    first_cateid: '', // 一级分类
                    second_cateid: '', // 二级分类
                    goodsname: '', // 商品名称
                    price: '', // 商品价格
                    market_price: '', // 市场价格
                    img: '', // 商品图片
                    description: '', // 商品描述
                    specsid: '', // 规格编号
                    specsattr: '', // 规格属性
                    isnew: 1, // 是否新品
                    ishot: 1, // 是否热卖
                    status: 1 // 状态 1->正常 2->禁用
                };
                this.$refs['addGoodsInfo'].resetFields();
                this.fileList = []
            },
            // 获取要添加管理员信息
            addGoods() {
                this.$refs['addGoodsInfo'].validate((valid) => {
                    if (valid) {
                        // 格式化商品属性
                        this.addGoodsInfo.specsattr = this.addGoodsInfo.specsattr.join(',')
                        this.addGoodsInfo.img = this.imgUrl
                        this.addGoodsInfo.description = this.editor.txt.html()
                        let file = new FormData()
                        for (let i in this.addGoodsInfo) {
                            file.append(i, this.addGoodsInfo[i])
                        }
                        addGoods(file)
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.$message.success(res.data.msg)
                                    this.cancel()
                                    this.getGoodsList()
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
            oneGoods(id) {
                goodsInfo({ id })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.addGoodsInfo = res.data.list
                            this.fileList = this.addGoodsInfo.img ? [{ url: this.$imgUrl + this.addGoodsInfo.img }] : []
                            // 对规格属性转化
                            this.addGoodsInfo.specsattr = this.addGoodsInfo.specsattr ? this.addGoodsInfo.specsattr.split(',') : []
                            this.addGoodsInfo.id = id
                            this.changeCate(true)
                            this.changeSpecs(true)
                        }
                    }).catch(err => {
                        this.$message.error('捕获错误！')
                    })
            },
            // 修改信息
            editGoods() {
                this.addGoodsInfo.specsattr = this.addGoodsInfo.specsattr.join(',')
                this.addGoodsInfo.img = this.imgUrl ? this.imgUrl : this.addGoodsInfo.img
                this.addGoodsInfo.description = this.editor.txt.html()
                let file = new FormData()
                for (let i in this.addGoodsInfo) {
                    file.append(i, this.addGoodsInfo[i])
                }
                updateGoods(file)
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message.success(res.data.msg)
                            this.cancel()
                            this.getGoodsList()
                            this.getCount()
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    }).catch(err => {
                        this.$message.error('捕获错误！')
                    })
            }
        }
    };
</script>

<style lang="" scoped>
    .ipt {
        width: 76%;
    }
</style>