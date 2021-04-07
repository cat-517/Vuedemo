<template>
    <div>
        <el-dialog width="700px" :title="dialogInfo.isAdd?'添加轮播图':'编辑轮播图'" :visible.sync="dialogInfo.isShow" center
            :before-close="cancel">
            <el-form :model="addBannerInfo" :rules="rules" ref="addBannerInfo">
                <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="addBannerInfo.title" clearable autocomplete="off" placeholder="请输入轮播图名称">
                    </el-input>
                </el-form-item>
                <el-form-item label="图片" :label-width="formLabelWidth">
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
                    <el-switch v-model="addBannerInfo.status" active-color="#13ce66" inactive-color="#ff4949"
                        :active-value="1" :inactive-value="2">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button @click="addBanner" v-if='dialogInfo.isAdd' type="primary">添 加</el-button>
                <el-button @click="editBanner" v-else type="primary">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { addBanner, bannerInfo, updateBanner } from '@/utils/axios'
    export default {
        data() {
            return {
                addBannerInfo: {
                    title: '', // 分类名称
                    img: '', // 图片
                    status: 1 // 状态 1=>正常 2=>禁用
                },
                fileList: [], // 用于图片回显
                formLabelWidth: '90px',
                rules: {
                    title: [
                        { required: true, message: '请输入轮播图名称', trigger: 'blur' },
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
            this.getBannerList()
        },
        methods: {
            ...mapActions({
                getBannerList: 'banner/getBannerListAction'
            }),
            // 点击取消 关闭弹框
            cancel() {
                this.$emit('cancel', false)
                this.reset()
            },
            // 重置事件
            reset() {
                this.addBannerInfo = {
                    title: '', // 分类名称
                    img: '', // 图片
                    status: 1 // 状态 1=>正常 2=>禁用
                }
                this.$refs['addBannerInfo'].resetFields();
                this.fileList = []
            },
            // 点击添加
            addBanner() {
                /*
                 * 有文件上传 文件的传输格式必须是FORMDATA的格式，enctype = 'multipart/form-data'
                 */
                this.$refs['addBannerInfo'].validate((valid) => {
                    if (valid) {
                        this.addBannerInfo.img = this.imgUrl
                        // FormData是key:value的形式 只能用append添加 查询时只能调用文件.get(key)方式
                        let file = new FormData()
                        for (let i in this.addBannerInfo) {
                            file.append(i, this.addBannerInfo[i])
                        }
                        // console.log(file.get('catename'));  // 取值
                        addBanner(file)
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.$message.success(res.data.msg)
                                    this.cancel()
                                    this.getBannerList()
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
            bannerInfo(id) {
                bannerInfo({ id })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.addBannerInfo = res.data.list
                            this.addBannerInfo.id = id
                            // 判断图片是否存在
                            this.fileList = this.addBannerInfo.img ? [{ url: this.$imgUrl + this.addBannerInfo.img }] : []
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
            },
            editBanner() {
                this.$refs['addBannerInfo'].validate((valid) => {
                    if (valid) {
                        this.addBannerInfo.img = this.imgUrl ? this.imgUrl : this.addBannerInfo.img
                        let file = new FormData()
                        for (let i in this.addBannerInfo) {
                            file.append(i, this.addBannerInfo[i])
                        }
                        updateBanner(file)
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.$message.success(res.data.msg)
                                    this.cancel()
                                    this.getBannerList()
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