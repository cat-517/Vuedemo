<template>
    <div id="o">
        <!-- header -->
        <div class="header">
            <div class="top">
                <i class="iconfont">&#xe605;</i>
                <h1>{{o_title_t}}</h1>
            </div>

            <!-- down -->
            <div class="down clearfix">
                <h2>{{o_name}}<i>{{o_phone}}</i></h2>
                <p>{{o_address}}</p>
            </div>
        </div>

        <!-- main -->
        <div class="main">
            <div class="con">
                <!-- nav -->
                <div class="nav clearfix">
                    <img :src="o_img" alt="">
                    <h3>{{o_title_n}}</h3>
                    <span>{{o_lead}}</span>
                    <b class="iconfont">&#xe606;</b>
                    <em>{{o_pay}}</em>
                </div>

                <!-- list -->
                <div class="list" v-for='item in o_list' :key="item.id">
                    <img :src="item.img" alt="">
                    <div class="r">
                        <p class="t">{{item.title}}</p>
                        <p class="u clearfix">
                            <i>￥</i><em>{{item.price}}</em>
                            <b>{{item.num}}</b>
                        </p>
                        <p class="d">
                            <span>{{item.time}}</span>
                            <i>{{item.checp}}</i>
                        </p>
                    </div>
                </div>

                <div class="info clearfix">
                    <p class="y clearfix">
                        <span>发票类型</span>
                        <i>不开发票 ></i>
                    </p>
                    <p class="e clearfix">
                        <span>售后免邮</span>
                        <i>部分商家赠送</i>
                    </p>
                    <p class="s clearfix">
                        <span>买家留言</span>
                        <i>填写内容需要与商家协商并确认，45字内</i>
                    </p>
                </div>
            </div>
        </div>

        <!-- main2 -->
        <div class="main2 clearfix">
            <p class="y clearfix">
                <span>商品金额</span>
                <i>￥1998</i>
            </p>
            <p class="e clearfix">
                <span>优惠活动</span>
                <i>-￥200</i>
            </p>
        </div>

        <!-- footer -->
        <div class="footer">
            <div class="l">
                <h3>合计</h3>
                <span>已免运费</span>
            </div>
            <div class="m">
                <h3>￥1998</h3>
                <span>已优惠￥200元</span>
            </div>
            <div class="r">确认订单</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                o_title_t: '确认订单',
                o_name: '代用名',
                o_phone: '188 **** 8888',
                o_address: '北京 北京市 昌平区 朱辛庄中公教育实训基地IT教学楼 2号楼 2202室',
                o_img: require('../assets/images/order/selfsupport.png'),
                o_title_n: '品牌精选',
                o_pay: '已免运费',
                o_lead: '领券',
                o_list: [
                    {
                        id: 1,
                        img: require('../assets/images/shopList/01.png'),
                        title: '溪牧原山茶花洁面泡沫 氨基酸洗面奶150ML 浸透舒缓',
                        price: '999',
                        num: '×1',
                        time: '7天无理由退货',
                        checp: '特价'
                    },
                    {
                        id: 2,
                        img: require('../assets/images/shopList/02.png'),
                        title: '水肌美男士清爽控油洗面奶100g',
                        price: '999',
                        num: '×1',
                        time: '7天无理由退货',
                        checp: '特价'
                    },
                    {
                        id: 3,
                        img: require('../assets/images/shopList/01.png'),
                        title: '溪牧原山茶花洁面泡沫 氨基酸洗面奶150ML 浸透舒缓',
                        price: '999',
                        num: '×1',
                        time: '7天无理由退货',
                        checp: '特价'
                    },
                    {
                        id: 4,
                        img: require('../assets/images/shopList/02.png'),
                        title: '水肌美男士清爽控油洗面奶100g',
                        price: '999',
                        num: '×1',
                        time: '7天无理由退货',
                        checp: '特价'
                    }
                ]
            };
        },
        components: {

        },
        methods: {

        }
    };
</script>

<style lang="" scoped>
    @import '../assets/css/order.css';
</style>