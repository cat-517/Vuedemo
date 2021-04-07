<template>
    <div id="shop">
        <!-- header -->
        <div class="header">
            <div class="t">
                <i @click="$router.back()" class="iconfont">&#xe605;</i>
                <h1>{{$route.name}}</h1>
            </div>
            <div class="top">
                <input type="text" class="iconfont" :placeholder="s_icon">
            </div>
            <!-- 头部导航 -->
            <div class="down">
                <ul>
                    <li @click='s_getIdx(idx)' v-for='(item,idx) in s_navList' :key="item.id"
                        :class="[idx == s_num?'active':'']">{{item.name}}
                        <div v-if='item.id==3'>
                            <i class="iconfont">&#xe733;</i>
                            <em class="iconfont">&#xe612;</em>
                        </div>
                    </li>
                </ul>
                <span>
                    <i class="iconfont">&#xe654;</i>筛选
                </span>
            </div>
        </div>

        <!-- main -->
        <div class="main">
            <div class="up">{{s_shop}}</div>
            <van-empty v-if="isShow" class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                description="该商品暂时缺货" />
            <van-card v-else @click="goDetail(item.id)" v-for='item in goodsList' :key="item.id" tag="促销"
                :price="item.price.toFixed(2)" :desc="item.goodsname" :title="item.goodsname"
                :thumb="item.img?$img+item.img:imgDefault" :origin-price="item.market_price.toFixed(2)" />
        </div>
    </div>
</template>

<script>
    import { getGoods } from '@/utils/axios'
    export default {
        data() {
            return {
                s_num: 0,
                imgDefault: require('../assets/images/index/ai.jpg'),
                s_icon: '\ue616 按内容搜索',
                s_shop: '筛选11.11大促商品',
                goodsList: [],
                s_navList: [
                    { id: 1, name: '综合推荐' },
                    { id: 2, name: '销量' },
                    { id: 3, name: '价格' },
                    { id: 4, name: '好评度' },
                    { id: 5, name: '店铺' }
                ],
            };
        },
        components: {

        },
        methods: {
            s_getIdx(i) {
                this.s_num = i
            },
            // 商品详情页
            goDetail(id) {
                this.$router.push({
                    path: '/detail',
                    query: {
                        id
                    }
                })
            }
        },
        computed: {
            isShow() {
                return Number(this.goodsList) == 0
            }
        },
        mounted() {
            getGoods({ fid: this.$route.query.fid })
                .then(res => {
                    if (res.code == 200) {
                        this.goodsList = res.list
                    }
                }).catch(err => {
                    console.log(err);
                })
        },
    };
</script>

<style lang="" scoped>
    @import '../assets/css/shopList.css';

    .custom-image .van-empty__image {
        width: 90px;
        height: 90px;
    }
</style>