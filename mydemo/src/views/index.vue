<template>
    <div>
        <!-- header -->
        <header class="header">
            <div class="t">
                <i class="iconfont">&#xe605;</i>
                <h1>{{$route.name}}</h1>
            </div>
            <div class="top">
                <i class="iconfont">&#xe611;</i>
                <img :src="logo" alt="">
                <input type="text" class="iconfont" :placeholder="i_icon">
                <b class="iconfont">&#xe6cb;</b>
            </div>
            <!-- 头部导航 -->
            <div class="down">
                <ul>
                    <li @click='getIdx(idx)' v-for='(item,idx) in navList' :key="item.id"><i
                            :class="[idx==num ? 'active':'']">{{item.name}}</i></li>
                </ul>
                <span>
                    <i class="iconfont">&#xe601;</i>分类
                </span>
            </div>
        </header>

        <!-- banner -->
        <div class="banner">
            <div class="b_top">
                <van-swipe class="my-swipe" :autoplay="2000" indicator-color="#444">
                    <van-swipe-item v-for='item in bannerImg' :key="item.id">
                        <img :src="$img+item.img" alt="">
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="b_nav">
                <ul>
                    <li v-for='item in bannerList' :key="item.id">
                        <div>
                            <img :src="item.img" alt="">
                            <p>{{item.name}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- con -->
        <div class="con">
            <!-- left -->
            <div class="l">
                <div class="top">
                    <span class="t1">{{con_l_title1}}</span>
                    <span class="t2">{{con_l_title2}}</span>
                    <img :src="con_l_img" alt="">
                </div>
                <p class="m">{{con_l_title3}}</p>
                <van-count-down :time="time">
                    <template #default="timeData">
                        <span class="block">{{ timeData.hours }}</span>
                        <span class="colon">:</span>
                        <span class="block">{{ timeData.minutes }}</span>
                        <span class="colon">:</span>
                        <span class="block">{{ timeData.seconds }}</span>
                    </template>
                </van-count-down>
            </div>
            <div class="r">
                <div class="top">
                    <p class="r_t1">{{con_r_title1}}</p>
                    <p class="r_t2">{{con_r_title2}}</p>
                    <div>
                        <span>{{con_r_title3}}</span>
                        <img :src="con_l_img" alt="">
                    </div>
                </div>
                <div class="down">
                    <p class="r_t3">{{con_r_title4}}</p>
                    <p class="r_t4">{{con_r_title5}}</p>
                    <div>
                        <span>{{con_r_title6}}</span>
                        <img :src="con_l_img" alt="">
                    </div>
                </div>
            </div>
        </div>

        <!-- list -->
        <div class="list">
            <van-tabs v-model="active" animated swipeable background="#eee">
                <van-tab title="热卖商品">
                    <van-card v-for="item in hotList" :key="item.id" :price="item.price.toFixed(2)"
                        :desc="item.goodsname" :title="item.goodsname" tag="热卖"
                        :thumb="item.img?$img+item.img:imgDefault" />
                </van-tab>
                <van-tab title="时尚潮品">
                    <van-card v-for="item in newList" :key="item.id" :price="item.price.toFixed(2)"
                        :desc="item.goodsname" :title="item.goodsname" tag="潮品"
                        :thumb="item.img?$img+item.img:imgDefault" />
                </van-tab>
                <van-tab title="全部商品">
                    <van-card v-for="item in allList" :key="item.id" :price="item.price.toFixed(2)"
                        :desc="item.goodsname" :title="item.goodsname" :thumb="item.img?$img+item.img:imgDefault" />
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import { getBanner, indexGoods, getSeck } from '@/utils/axios'
    import axios from 'axios';
    export default {
        data() {
            return {
                num: 0,
                active: 0,
                time: '',
                i_icon: '\ue616 按内容搜索',
                logo: require('../assets/images/index/white.png'),
                banner: require('../assets/images/index/beside.png'),
                con_l_title1: '限时秒杀',
                con_l_title2: '查看更多',
                con_l_img: require('../assets/images/index/r.png'),
                imgDefault: require('../assets/images/index/ai.jpg'),
                con_l_title3: '每天0点场，好货秒不停',
                con_r_title1: '品牌上新',
                con_r_title2: '9点整，抢大牌',
                con_r_title3: '疯抢红包',
                con_r_title4: '日用好物',
                con_r_title5: '愿君多采撷',
                con_r_title6: '塞满奖券',
                timeData: {
                    hours: '',
                    minutes: '',
                    seconds: ''
                },
                bannerImg: [],
                hotList: [],
                newList: [],
                allList: [],
                navList: [
                    { id: 1, name: '推荐' },
                    { id: 2, name: '女装' },
                    { id: 3, name: '鞋包' },
                    { id: 4, name: '居家' },
                    { id: 5, name: '母婴' },
                    { id: 6, name: '美妆' },
                ],
                bannerList: [
                    {
                        id: 1,
                        img: require('../assets/images/index/seckill.png'),
                        name: '限时秒杀'
                    },
                    {
                        id: 2,
                        img: require('../assets/images/index/top.png'),
                        name: '畅销商品'
                    },
                    {
                        id: 3,
                        img: require('../assets/images/index/brand.png'),
                        name: '品质大牌'
                    },
                    {
                        id: 4,
                        img: require('../assets/images/index/selfsupport.png'),
                        name: '小U自营'
                    },
                    {
                        id: 5,
                        img: require('../assets/images/index/integral.png'),
                        name: '积分商城'
                    }
                ],
            }
        },
        methods: {
            getIdx(i) {
                this.num = i
            }
        },
        mounted() {
            // 轮播图接口
            getBanner()
                .then(res => {
                    if (res.code == 200) {
                        this.bannerImg = res.list
                    }
                }).catch(err => {
                    console.log(err);
                });
            // 商品列表接口
            indexGoods()
                .then(res => {
                    if (res.code == 200) {
                        this.hotList = res.list[0].content
                        this.newList = res.list[1].content
                        this.allList = res.list[2].content
                    }
                }).catch(err => {
                    console.log(err);
                })

            // 并发处理
            // axios.all([getBanner(), indexGoods()])
            //     .then(axios.spread((banner, goods) => {
            //         if (banner.code == 200) {
            //             this.bannerImg = banner.list
            //         }
            //         if (goods.code == 200) {
            //             this.hotList = goods.list[0].content
            //             this.newList = goods.list[1].content
            //             this.allList = goods.list[2].content
            //         }
            //     }))

            // 秒杀
            getSeck()
                .then(res => {
                    if (res.code == 200) {
                        let now = new Date().getTime()
                        let val = parseInt((res.list[0].endtime) - now)
                        this.time = val
                    }
                }).catch(err => {
                    console.log(err);
                })
        },
    }
</script>

<style scoped>
    @import '../assets/css/index.css';

    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: .4rem;
        line-height: 4rem;
        text-align: center;
    }

    .my-swipe .van-swipe-item img {
        height: 4rem;
        width: 100%;
        vertical-align: top;
    }

    .van-count-down {
        padding-left: .2rem;
        margin-top: .2rem;
    }

    .colon {
        display: inline-block;
        margin: 0 -2px;
        color: #adc975;
    }

    .block {
        display: inline-block;
        width: 22px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        background: linear-gradient(#85a642, #afca77);
        border-radius: .08rem;
    }
</style>