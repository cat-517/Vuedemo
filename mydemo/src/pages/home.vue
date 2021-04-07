<template>
    <div>
        <!-- 路由视图 -->
        <router-view></router-view>

        <!-- 抽出导航部分 -->
        <v-nav></v-nav>
    </div>
</template>


<script>
    import vNav from '../components/vNav'
    export default {
        data() {
            return {

            };
        },
        components: {
            vNav
        },
        methods: {

        }
    };
</script>

<style lang="" scoped>

</style>