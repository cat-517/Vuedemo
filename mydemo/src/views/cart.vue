<template>
    <div id="ca">
        <div class="t">
            <i @click="$router.back()" class="iconfont">&#xe605;</i>
            <h1>购物车</h1>
        </div>

        <!-- 有数据展示 -->
        <van-list v-if="cartlist.length > 0">
            <van-swipe-cell v-for="item in cartlist" :key="item.id">
                <van-card :num="item.num" :price="item.price*item.num | toPrice(2)" :desc="item.goodsname"
                    :title="item.goodsname" class="goods-card" :thumb="item.img?$img+item.img:imgDefault">
                    <template #footer>
                        <van-stepper v-model="item.num" theme="round" button-size="22" disable-input />
                    </template>
                </van-card>
                <template #right>
                    <van-button square text="删除" type="danger" @click="del(item.id)" class="delete-button" />
                </template>
            </van-swipe-cell>
            <van-submit-bar :price="sum" button-text="提交订单" @submit="onSubmit(sum/100)">
                <van-checkbox v-model="checked">全选</van-checkbox>
            </van-submit-bar>
        </van-list>

        <!-- 无数据展示 -->
        <van-list v-else>
            <van-empty class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                description="购物车空空如也" />
        </van-list>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { Dialog, Toast } from 'vant';
    import { cartList, deleteCart } from '@/utils/axios'
    export default {
        data() {
            return {
                value: 1,
                cartlist: [],
                imgDefault: require('../assets/images/index/ai.jpg'),
                checked: false,
                isChecked: false
            };
        },
        components: {

        },
        methods: {
            onSubmit(sum) {
                Toast.success(`您选中的宝贝总价为：${sum}元`)
            },
            del(id) {
                deleteCart({ id })
                    .then(res => {
                        if (res.code == 200) {
                            Toast.success('删除成功')
                            // 删除成功后 重新调取查询接口
                            cartList({
                                uid: this.getUserInfo.uid
                            })
                                .then(res => {
                                    if (res.code == 200) {
                                        this.cartlist = res.list ? res.list : []
                                    } else {
                                        console.log(res.msg);
                                    }
                                }).catch(err => {
                                    console.log(err);
                                })
                        } else {
                            Toast.fail(res.msg)
                        }
                    }).catch(err => {
                        console.log(err);
                    })
            }
        },
        beforeRouteEnter(to, from, next) {
            // 进入组件之间没有this 所以不能用vuex
            if (sessionStorage.getItem('user')) {
                // 登录了跳转到购物车
                next()
            } else {
                Dialog.confirm({
                    title: '提示',
                    message: '您未登录，请先登录',
                })
                    .then(() => {
                        next('/sjLogin')
                    })
                    .catch(() => {
                        // 取消
                    });
            }
        },
        computed: {
            ...mapGetters(['getUserInfo']),
            sum() {
                let sumAll = 0
                this.cartlist.forEach(item => {
                    sumAll += item.price * item.num
                })
                return sumAll * 100
            }
        },
        mounted() {
            cartList({
                uid: this.getUserInfo.uid
            })
                .then(res => {
                    if (res.code == 200) {
                        this.cartlist = res.list ? res.list : []
                    } else {
                        console.log(res.msg);
                    }
                }).catch(err => {
                    console.log(err);
                })
        },
    };
</script>

<style lang="" scoped>
    @import '../assets/css/cart.css';

    .goods-card {
        margin: 0;
        background-color: #eee;
    }

    .delete-button {
        height: 100%;
    }

    .van-swipe-cell {
        margin-bottom: .2rem;
    }

    .custom-image>>>.van-empty__image {
        width: 90px;
        height: 90px;
    }

    .van-submit-bar {
        margin-bottom: 1.2rem;
    }
</style>