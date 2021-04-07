<template>
    <div id="sort">

        <!-- header -->
        <div class="header">
            <div class="t">
                <h1>{{$route.name}}</h1>
            </div>
            <input type="text" class="iconfont" :placeholder="r_icon">
        </div>

        <!-- aside -->
        <div class="aside">
            <van-sidebar v-model="activeKey" @change="onChange">
                <van-sidebar-item v-for="item in firstList" :key="item.id" :title="item.catename"></van-sidebar-item>
            </van-sidebar>
        </div>

        <!-- right -->
        <div class="right">
            <van-grid :border="false" :column-num="3">
                <van-grid-item :to="'/shopList?fid='+item.id" v-for="item in secondList" :key="item.id">
                    <img :src="item.img?$img+item.img:imgDefault">
                    <p>{{item.catename}}</p>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>

<script>
    import { getCateTree } from '@/utils/axios'
    export default {
        data() {
            return {
                r_icon: '\ue616 按内容搜索',
                r_num: 0,
                imgDefault: require('../assets/images/index/ai.jpg'),
                activeKey: 0,
                firstList: [],
                secondList: []
            };
        },
        components: {

        },
        methods: {
            onChange(idx) {
                this.secondList = this.firstList[idx].children
            }
        },
        mounted() {
            getCateTree()
                .then(res => {
                    if (res.code == 200) {
                        this.firstList = res.list
                        this.secondList = res.list[0].children
                    }
                }).catch(err => {
                    console.log(err);
                })
        },
    };
</script>

<style lang="" scoped>
    @import '../assets/css/sort.css';

    .van-sidebar {
        width: 100%;
    }

    .van-grid-item img {
        width: 1.28rem;
        height: 1.28rem;
        margin-bottom: .1rem;
    }

    .van-grid-item p {
        text-align: center;
        font-size: .24rem;
        color: #c6c6c6;
    }

    .van-grid-item {
        margin-bottom: .2rem;
    }
</style>