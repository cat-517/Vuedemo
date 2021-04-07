<template>
    <div id="detail">
        <!-- header -->
        <div class="header">
            <div class="t">
                <i @click="$router.back()" class="iconfont">&#xe605;</i>
                <h1>{{$route.name}}</h1>
            </div>
            <div class="top">
                <ul>
                    <li v-for="(item,idx) in navList" @click="change(idx)" :class="[idx == number?'active':'']"
                        :key="item.id">
                        <span>{{item.title}}</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="main">
            <!-- 产品展示 -->
            <div>
                <img class="imgurl" :src="goodsinfo.img?$img+goodsinfo.img:imgDefault" alt="">
            </div>
            <!-- 商品名称 -->
            <p class="name">{{goodsinfo.goodsname}}</p>
            <p class="price">
                <span class="y">￥{{price}}</span>
                <span class="e">￥{{market_price}}</span>
            </p>
            <!-- 购买数量 -->
            <div class="num">
                <i>购买数量</i>
                <van-stepper v-model="value" min="1" max="5" />
            </div>
            <div class="attr">
                <span class="attrs">商品属性</span>
                <van-button style="background-color: #fff;color: #666;" v-for='item in goodsinfo.specsattr' :key="item"
                    size="mini" type="warning">{{item}}</van-button>
            </div>
            <!-- 商品详情 -->
            <div class="footer">
                <p>商品详情</p>
                <div v-html="goodsinfo.description"></div>
            </div>

            <van-goods-action>
                <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
                <van-goods-action-icon icon="cart-o" text="购物车" />
                <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
                <van-goods-action-button @click="goCart" type="warning" text="加入购物车" />
                <van-goods-action-button @click="goBuy" type="danger" text="立即购买" />
            </van-goods-action>
        </div>
    </div>
</template>

<script>
    import { goodsInfo, addCart } from '@/utils/axios'
    import { Dialog, Toast } from 'vant'
    export default {
        data() {
            return {
                number: 0,
                value: 1,
                goodsinfo: '',
                imgDefault: require('../assets/images/index/ai.jpg'),
                navList: [
                    {
                        id: 1,
                        title: '商品'
                    },
                    {
                        id: 2,
                        title: '评价'
                    },
                    {
                        id: 3,
                        title: '详情'
                    },
                    {
                        id: 4,
                        title: '推荐'
                    }
                ]
            };
        },
        components: {

        },
        computed: {
            price() {
                return this.goodsinfo.price
            },
            market_price() {
                return this.goodsinfo.market_price
            }
        },
        methods: {
            change(i) {
                this.number = i
            },
            // 购物车
            goCart() {
                // 判断是否登录
                if (this.$store.state.userInfo) {
                    addCart({
                        uid: this.$store.getters.getUserInfo.uid,
                        goodsid: this.goodsinfo.id,
                        num: this.value
                    })
                        .then(res => {
                            if (res.code == 200) {
                                this.$router.push('/cart')
                            } else {
                                Toast.fail(res.msg)
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                } else {
                    Dialog.confirm({
                        title: '提示',
                        message: '您未登录，请先登录',
                    })
                        .then(() => {
                            this.$router.push('/sjLogin')
                        })
                        .catch(() => {
                            // 取消
                        });
                }

            },
            goBuy() {
                Dialog.alert({
                    title: '提示',
                    message: '您没什么可购买的',
                }).then(() => {

                });
            }
        },
        mounted() {
            goodsInfo({ id: this.$route.query.id })
                .then(res => {
                    if (res.code == 200) {
                        this.goodsinfo = res.list[0]
                        this.goodsinfo.price = res.list[0].price.toFixed(2)
                        this.goodsinfo.market_price = res.list[0].market_price.toFixed(2)
                        this.goodsinfo.specsattr = this.goodsinfo.specsattr ? this.goodsinfo.specsattr.split(',') : []
                    }
                }).catch(err => {
                    console.log(err);
                })
        },
    };
</script>

<style lang="" scoped>
    @import '../assets/css/detail.css';

    #detail .header {
        height: 1.52rem;
        background: linear-gradient(#ff6141, #ff8a7f);
        overflow: hidden;
    }

    #detail .header .t {
        height: .88rem;
        line-height: .84rem;
        color: #fff;
    }

    #detail .header .t i {
        float: left;
        font-size: .32rem;
        margin-left: .24rem;
    }

    #detail .header .t h1 {
        float: left;
        font-size: .32rem;
        margin-left: 2.5rem;
    }

    #detail .header .top {
        height: .64rem;
    }

    #detail .header .top ul {
        height: .64rem;
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    #detail .header .top ul li {
        width: .64rem;
        text-align: center;
        height: .64rem;
        line-height: .64rem;
        font-size: .28rem;
        color: #fff;
    }

    #detail .header .top .active {
        color: rgb(252, 18, 18);
        font-size: .31rem;
    }

    #detail .main .imgurl {
        width: 7.5rem;
        height: 7.5rem;
    }

    #detail .footer {
        padding-bottom: 1.3rem;
    }
</style>