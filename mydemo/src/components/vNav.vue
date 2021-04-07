<template>
    <div id="nav">
        <!-- 路由导航 -->
        <van-tabbar v-model="active" active-color="#ff6040" inactive-color="#000" route>
            <van-tabbar-item v-for="item in list" :key="item.id" :to='item.to' :icon="item.icon"
                @click="change(item.id)">{{item.title}}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                v_index: '商城',
                v_sort: '分类',
                v_cart: '购物车',
                v_mine: '我',
                active: 0,
                list: [
                    {
                        id: 0,
                        to: '/index',
                        icon: 'shop-o',
                        title: '商城'
                    },
                    {
                        id: 1,
                        to: '/sort',
                        icon: 'apps-o',
                        title: '分类'
                    },
                    {
                        id: 2,
                        to: '/cart',
                        icon: 'shopping-cart-o',
                        title: '购物车'
                    },
                    {
                        id: 3,
                        to: '/mine',
                        icon: 'contact',
                        title: '我'
                    }
                ]
            };
        },
        components: {

        },
        methods: {
            change(id) {
                this.active = id
            }
        },
    };
</script>

<style lang="" scoped>
    #nav .van-tabbar {
        height: 1.2rem;
    }
</style>