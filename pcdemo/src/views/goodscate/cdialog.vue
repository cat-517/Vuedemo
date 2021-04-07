<template>
    <div>
        <el-dialog width="700px" :title="dialogInfo.isAdd?'添加商品分类':'编辑商品分类'" :visible.sync="dialogInfo.isShow" center
            :before-close="cancel">
            <el-form :model="addCateInfo" :rules="rules" ref="addCateInfo">
                <el-form-item label="上级分类" :label-width="formLabelWidth" prop="pid">
                    <el-select v-model="addCateInfo.pid" placeholder="请选择上级分类">
                        <el-option label='顶级菜单' :value="0"></el-option>
                        <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类名称" :label-width="formLabelWidth" prop="catename">
                    <el-input v-model="addCateInfo.catename" clearable autocomplete="off" placeholder="请输入分类名称">
                    </el-input>
                </el-form-item>
                <!--
                    上传图片一般分为两种情况：
                    一、直接调用图片服务器（后端提供的服务器地址）
                    二、后端服务器提供接口，如若调用接口 那action不能赋值

                    el-upload : 
                    action  必选参数，上传的地址
                    list-type  文件列表的类型  默认text
                    on-preview  文件预览
                    on-remove   文件删除  
                    auto-upload	是否在选取文件后立即进行上传 上传至服务器
                    on-change	文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
                    file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
                    on-exceed	文件超出个数限制时的钩子
                    limit	最大允许上传个数
                 -->
                <el-form-item v-if="addCateInfo.pid != 0" label="图片" :label-width="formLabelWidth">
                    <el-upload action="#" list-type="picture-card" :on-preview="onPreview" :on-remove="handleRemove"
                        :auto-upload='false' :limit='1' :on-exceed='onExceed' :on-change="onChange"
                        :file-list='fileList'>
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>

                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-switch v-model="addCateInfo.status" active-color="#13ce66" inactive-color="#ff4949"
                        :active-value="1" :inactive-value="2">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button @click="addCate" v-if='dialogInfo.isAdd' type="primary">添 加</el-button>
                <el-button @click="editCate" v-else type="primary">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { addCate, getCateInfo, updateCate } from '@/utils/axios'
    export default {
        data() {
            return {
                addCateInfo: {
                    pid: 0, // 上级分类编号
                    catename: '', // 分类名称
                    img: "", // 图片
                    status: 1 // 状态 1=>正常 2=>禁用
                },
                fileList: [], // 用于图片回显
                formLabelWidth: '90px',
                rules: {
                    pid: [
                        { required: true, message: '请选择上级分类', trigger: 'change' }
                    ],
                    catename: [
                        { required: true, message: '请输入分类名称', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ]
                },
                // 用于控制图片预览的显示隐藏
                dialogVisible: false,
                // 预览调用的图片地址
                dialogImageUrl: '',
                // 设置图片地址 用于接收所有文件详情
                imgUrl: ''
            };
        },
        components: {

        },
        mounted() {
            this.getCateList()
        },
        computed: {
            ...mapGetters({
                cateList: 'cate/getCateList'
            })
        },
        methods: {
            ...mapActions({
                getCateList: 'cate/getCateListAction'
            }),
            // 点击取消 关闭弹框
            cancel() {
                this.$emit('cancel', false)
                this.reset()
            },
            // 重置事件
            reset() {
                this.addCateInfo = {
                    pid: 0,
                    catename: '',
                    img: "",
                    status: 1
                }
                this.$refs['addCateInfo'].resetFields();
                this.fileList = []
            },
            // 点击添加
            addCate() {
                /*
                 * 有文件上传 文件的传输格式必须是FORMDATA的格式，enctype = 'multipart/form-data'
                 */
                this.$refs['addCateInfo'].validate((valid) => {
                    if (valid) {
                        this.addCateInfo.img = this.imgUrl
                        // FormData是key:value的形式 只能用append添加 查询时只能调用文件.get(key)方式
                        let file = new FormData()
                        for (let i in this.addCateInfo) {
                            file.append(i, this.addCateInfo[i])
                        }
                        // console.log(file.get('catename'));  // 取值
                        addCate(file)
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.$message.success(res.data.msg)
                                    this.cancel()
                                    this.getCateList()
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
            CateInfo(id) {
                getCateInfo({ id })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.addCateInfo = res.data.list
                            this.addCateInfo.id = id
                            // 判断图片是否存在
                            this.fileList = this.addCateInfo.img ? [{ url: this.$imgUrl + this.addCateInfo.img }] : []
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
            },
            editCate() {
                this.$refs['addCateInfo'].validate((valid) => {
                    if (valid) {
                        this.addCateInfo.img = this.imgUrl ? this.imgUrl : this.addCateInfo.img
                        let file = new FormData()
                        for (let i in this.addCateInfo) {
                            file.append(i, this.addCateInfo[i])
                        }
                        updateCate(file)
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.$message.success(res.data.msg)
                                    this.cancel()
                                    this.getCateList()
                                } else {
                                    this.$message.error(res.data.msg)
                                }
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            onExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            }
        },
        props: ['dialogInfo']
    };
</script>

<style lang="" scoped>

</style>