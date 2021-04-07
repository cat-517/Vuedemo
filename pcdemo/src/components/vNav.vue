<template>
    <div>
        <!-- 导航菜单 -->
        <el-menu :default-active="defaultAction" background-color="#74787a" text-color="#fff"
            active-text-color="#ffd04b" unique-opened router>
            <el-menu-item index="/home">
                <i class="el-icon-share"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu :index="item.id.toString()" v-for='item in getUserInfo.menus' :key="item.id">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.title}}</span>
                </template>
                <el-menu-item v-for='menu in item.children' :key="menu.id" :index="menu.url">{{menu.title}}
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                defaultAction: '/home',
                // navList: []
            };
        },
        components: {

        },
        methods: {

        },
        mounted() {
            this.defaultAction = this.$route.path
            // if (sessionStorage.getItem('userInfo')){
            //     this.navList = JSON.parse(sessionStorage.getItem('userInfo')).menus
            // }
            
        },
        computed:{
            ...mapGetters(['getUserInfo'])
        }
    };
</script>

<style lang="" scoped>

</style>