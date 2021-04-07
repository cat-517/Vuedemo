<template>
    <div id="m">
        <!-- 已登录 -->
        <!-- header -->
        <div v-if="getUserInfo" class="header clearfix">
            <div class="t">
                <i class="iconfont">&#xe605;</i>
                <h1>我的</h1>
            </div>
            <!-- top -->
            <div class="top">
                <img :src="m_head" alt="">
                <div class="info">
                    <p>{{getUserInfo.nickname}}</p>
                    <span>{{m_data}}</span>
                </div>
                <div class="btn">
                    <van-button type="warning" @click="logout" size="mini">退出</van-button>
                </div>
                <div class="day">
                    <span>{{m_day}}</span>
                </div>
            </div>

            <!-- middle -->
            <div class="mid">
                <ul>
                    <li v-for='item in m_infoList' :key="item.id">
                        <p class="num">{{item.num}}</p>
                        <p>{{item.title}}</p>
                    </li>
                </ul>
            </div>

            <!-- order -->
            <div class="order">
                <!-- up -->
                <div class="up">
                    <h3>{{m_order}}</h3>
                    <span class="iconfont">全部订单<i>&#xe731;</i></span>
                </div>
                <ul>
                    <li v-for='item in m_shopList' :key="item.id">
                        <img :src="item.img" alt="">
                        <p>{{item.title}}</p>
                    </li>
                </ul>
            </div>

            <!-- footer -->
            <div class="footer clearfix">
                <ul>
                    <li v-for='item in m_list' :key="item.id">
                        <img :src="item.img" alt="">
                        <span>{{item.title}}</span>
                        <em class="iconfont">&#xe731;</em>
                        <b v-if='item.id == 2'>剩余200U币</b>
                    </li>
                </ul>
            </div>
        </div>

        <div v-else class="header clearfix">
            <div class="t">
                <h1>我的</h1>
            </div>
            <!-- top -->
            <div class="top">
                <img :src="m_head1" alt="">
                <div class="info">
                    <p>{{m_title}}</p>
                    <span>{{m_data}}</span>
                </div>
                <div class="btn">
                    <van-button type="danger" @click="login" size="mini">请登录</van-button>
                </div>
                <div class="day">
                    <span>{{m_day}}</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { Dialog } from 'vant'
    export default {
        data() {
            return {
                m_head: require('../assets/images/mine/cat.jpg'),
                m_head1: require('../assets/images/index/ai.jpg'),
                m_title: '我是段段',
                m_data: '完善资料让小U更懂您',
                m_day: '每日签到',
                m_order: '我的订单',
                m_infoList: [
                    {
                        id: 1,
                        num: 12,
                        title: '我的收藏'
                    },
                    {
                        id: 2,
                        num: 12,
                        title: '浏览记录'
                    },
                    {
                        id: 3,
                        num: '￥0',
                        title: '我的红包'
                    },
                    {
                        id: 4,
                        num: '12',
                        title: '优惠券'
                    }
                ],
                m_shopList: [
                    {
                        id: 1,
                        img: require('../assets/images/mine/payment.png'),
                        title: '待付款'
                    },
                    {

                        id: 2,
                        img: require('../assets/images/mine/delivery.png'),
                        title: '待收货'
                    },
                    {

                        id: 3,
                        img: require('../assets/images/mine/evaluation.png'),
                        title: '评价'
                    },
                    {

                        id: 4,
                        img: require('../assets/images/mine/service.png'),
                        title: '售后/退款'
                    }
                ],
                m_list: [
                    {
                        id: 1,
                        img: require('../assets/images/mine/address.png'),
                        title: '地址管理'
                    },
                    {
                        id: 2,
                        img: require('../assets/images/mine/wallet.png'),
                        title: '我的钱包'
                    },
                    {
                        id: 3,
                        img: require('../assets/images/mine/QR_code.png'),
                        title: '我的二维码'
                    },
                    {
                        id: 4,
                        img: require('../assets/images/mine/partner.png'),
                        title: '我的小伙伴'
                    },
                    {
                        id: 5,
                        img: require('../assets/images/mine/free.png'),
                        title: '0元试用'
                    },
                ]
            };
        },
        components: {

        },
        methods: {
            ...mapActions(['changeUserAction']),
            logout() {
                Dialog.confirm({
                    title: '提示',
                    message: '是否退出登录？',
                })
                    .then(() => {
                        this.changeUserAction(false)
                        this.$router.push('/sjLogin')
                    }).catch(() => {
                        
                    });
            },
            login() {
                this.$router.push('/sjLogin')
            }
        },
        computed: {
            ...mapGetters(['getUserInfo'])
        }
    };
</script>

<style lang="" scoped>
    @import '../assets/css/mine.css';
</style>