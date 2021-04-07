/*
 * 编写index.js文件 方便引入查找
 */
import http from './axios'

// ---------------------------------------
/*
 * author : dd
 * 封装菜单接口
 */

// 添加菜单
export function addMenu(data) {
    return http.post('/api/menuadd', data)
}

// 菜单编辑
export function postEditMenu(data) {
    return http.post('/api/menuedit', data)
}

// 菜单删除
export function deleteMenu(data) {
    return http.post('/api/menudelete', data)
}

// 菜单列表
export function getMenuList() {
    return http.get('/api/menulist', {
        params: {
            istree: true
        }
    })
}

// 一条菜单列表数据
export function getMenuInfo(params) {
    return http.get('/api/menuinfo', {
        params
    })
}

// ---------------------------------------
/*
 * author : dd
 *  封装角色接口
 */
// 添加角色
export function addRole(data) {
    return http.post('/api/roleadd', data)
}

// 删除角色
export function deleteRole(data) {
    return http.post('/api/roledelete', data)
}

// 修改角色
export function updateRole(data) {
    return http.post('/api/roleedit', data)
}

// 获取角色列表
export function getRoleList() {
    return http.get('/api/rolelist')
}

// 获取一条角色列表
export function getRoleInfo(params) {
    return http.get('/api/roleinfo', {
        params
    })
}

// ---------------------------------------
/*
 * author : dd
 *  封装管理员接口
 */

// 添加管理员
export function addManage(data) {
    return http.post('/api/useradd', data)
}

// 管理员总数
export function manageAll() {
    return http.get('/api/usercount')
}

// 管理员列表
export function manageList(params) {
    return http.get('/api/userlist', {
        params
    })
}

// 管理员一条信息获取
export function manageInfo(params) {
    return http.get('/api/userinfo', {
        params
    })
}

// 管理员修改
export function updateManage(data) {
    return http.post('/api/useredit', data)
}

// 管理员删除
export function deleteManage(data) {
    return http.post('/api/userdelete', data)
}

// 管理员登录
export function manageLogin(data) {
    return http.post('/api/userlogin', data)
}

// ------------------------------------------
/*
 * 封装商品分类接口
 */
// 商品分类添加
export function addCate(data) {
    return http.post('/api/cateadd', data)
}

// 商品分类列表
export function getCateList() {
    return http.get('/api/catelist', {
        params: {
            istree: true
        }
    })
}

// 商品分类获取 一条
export function getCateInfo(params) {
    return http.get('/api/cateinfo', {
        params
    })
}

// 商品修改
export function updateCate(data) {
    return http.post('/api/cateedit', data)
}

// 商品删除
export function deleteCate(data) {
    return http.post('/api/catedelete', data)
}


// ---------------------------------------
/*
 * 封装商品规格接口
 */
// 商品规格添加
export function addSpecs(data) {
    return http.post('/api/specsadd', data)
}

// 商品规格总数
export function specsCount() {
    return http.get('/api/specscount')
}

// 商品规格列表 分页
export function specsList(params) {
    return http.get('/api/specslist', {
        params
    })
}

// 商品规格获取 一条
export function specsInfo(params) {
    return http.get('/api/specsinfo', {
        params
    })
}

// 商品规格修改
export function updateSpecs(data) {
    return http.post('/api/specsedit', data)
}

// 商品规格删除
export function deleteSpecs(data) {
    return http.post('/api/specsdelete', data)
}

// ---------------------------------------------
/*
 * 商品管理
 */
// 商品添加
export function addGoods(data) {
    return http.post('/api/goodsadd', data)
}

// 商品总数  用于计算分页
export function goodsCount() {
    return http.get('/api/goodscount')
}

// 商品列表 分页
export function goodsList(params) {
    return http.get('/api/goodslist', {
        params
    })
}

// 商品获取 一条
export function goodsInfo(params) {
    return http.get('/api/goodsinfo', {
        params
    })
}

// 商品修改
export function updateGoods(data) {
    return http.post('/api/goodsedit', data)
}

// 商品删除
export function deleteGoods(data) {
    return http.post('/api/goodsdelete', data)
}

// ---------------------------------------------
/*
 * 轮播图管理
 */
// 添加轮播图
export function addBanner(data) {
    return http.post('/api/banneradd', data)
}

// 轮播图列表
export function bannerList() {
    return http.get('/api/bannerlist')
}

// 获取一条
export function bannerInfo(params) {
    return http.get('/api/bannerinfo', {
        params
    })
}

// 修改
export function updateBanner(data) {
    return http.post('/api/banneredit', data)
}

// 删除
export function deleteBanner(data) {
    return http.post('/api/bannerdelete', data)
}

// ---------------------------------------------
/*
 * 会员管理
 */
// 会员列表
export function memberList() {
    return http.get('/api/memberlist')
}

// 获取一条会员信息
export function memberInfo(params) {
    return http.get('/api/memberinfo', {
        params
    })
}

// 会员修改
export function updateMember(data) {
    return http.post('/api/memberedit', data)
}

// ---------------------------------------------
/*
 * 限时管理
 */
// 限时秒杀添加
export function addSeck(data) {
    return http.post('/api/seckadd', data)
}

// 限时秒杀列表
export function seckList() {
    return http.get('/api/secklist')
}

// 限时秒杀获取 一条
export function seckInfo(params) {
    return http.get('/api/seckinfo', {
        params
    })
}

// 限时秒杀修改
export function updateSeck(data) {
    return http.post('/api/seckedit', data)
}

// 限时秒杀删除
export function deleteSeck(data){
    return http.post('/api/seckdelete',data)
}
