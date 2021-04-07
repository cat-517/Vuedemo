<template>
    <div>
        <!-- 将列表抽出 -->
        <el-table :data="goodsList" border style="width: 100%;">
            <el-table-column prop="id" label="商品编号" width="90">
            </el-table-column>
            <el-table-column prop="goodsname" label="商品名称" width="240">
            </el-table-column>
            <el-table-column prop="price" label="商品价格" width="100">
            </el-table-column>
            <el-table-column prop="market_price" label="市场价格" width="100">
            </el-table-column>
            <el-table-column label="图片" width="200">
                <template slot-scope="item">
                    <div>
                        <img class="img" :src="item.row.img?$imgUrl+item.row.img:imgDefault" alt="">
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="是否新品" width="80">
                <template slot-scope="item">
                    <div>
                        <el-tag v-if='item.row.isnew == 1' type="success">是</el-tag>
                        <el-tag v-else type="danger">否</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="是否热卖" width="80">
                <template slot-scope="item">
                    <div>
                        <el-tag v-if='item.row.ishot == 1' type="success">是</el-tag>
                        <el-tag v-else type="danger">否</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="80">
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
                        <el-button @click="del(item.row.id)" type="danger" size="small"><i class="el-icon-delete"></i>删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination @current-change="changePage" :page-size="size" background layout="prev, pager, next"
            :total="count">
        </el-pagination>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { deleteGoods } from '@/utils/axios'
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
                getGoodsList: 'goods/getGoodsListAction',
                // 获取总数
                getCount: 'goods/getCountAction',
                changePageAction: 'goods/changePageAction'
            }),
            // 切换页码的方法
            changePage(n) {
                this.changePageAction(n)
            },
            // 删除方法
            del(id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteGoods({ id })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message.success(res.data.msg)
                                this.getGoodsList()
                                this.getCount()
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        }).catch(err => {
                            this.$message.error('捕获错误！')
                        })
                }).catch(() => {
                    this.$message('已取消删除！')
                });
            },
            // 弹出编辑框
            edit(id) {
                this.$emit('edit', id)
            }
        },
        mounted() {
            this.getGoodsList()
            this.getCount()
        },
        computed: {
            ...mapGetters({
                // 获取管理员列表的值
                goodsList: 'goods/getGoodsList',
                count: 'goods/getCount',
                size: 'goods/getSize'
            })

        }
    };
</script>

<style lang="" scoped>
    .el-pagination {
        float: right;
        margin-top: 20px;
    }

    .img {
        width: 90px;
        height: 90px;
    }
</style>