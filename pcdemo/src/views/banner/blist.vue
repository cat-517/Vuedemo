<template>
    <div>
        <!-- 
            default-expand-all 是否全展开
         -->
        <el-table :data="bannerList" border style="width: 100%;">
            <el-table-column prop="id" label="编号" width="100">
            </el-table-column>
            <el-table-column prop="title" label="轮播图标题" width="160">
            </el-table-column>
            <el-table-column label="图片" width="220">
                <template slot-scope='item'>
                    <div>
                        <img class="imgUrl" :src="item.row.img?$imgUrl+item.row.img:imgDefault" alt="">
                    </div>
                </template>
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
    import { deleteBanner } from '@/utils/axios'
    export default {
        data() {
            return {
                imgDefault: require('@/assets/images/default.jpg')
            };
        },
        components: {

        },
        methods: {
            ...mapActions({
                getBannerList: 'banner/getBannerListAction'
            }),
            // 删除某一条分类信息
            deletes(id) {
                this.$confirm('是否确定删除此条数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteBanner({ id }).
                        then((res) => {
                            if (res.data.code == 200) {
                                // 重新渲染列表
                                this.getBannerList()
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
            // 页面一加载  就获取分类列表接口
            this.getBannerList()
        },
        computed: {
            ...mapGetters({
                bannerList: 'banner/getBannerList'
            })
        }
    };
</script>

<style lang="" scoped>
    .imgUrl {
        width: 90px;
        height: 90px;
    }
</style>