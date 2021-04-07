import http from './axios'

/*
 * 首页
 */
// 轮播图接口
export function getBanner() {
    return http.get('/banner')
}

// 推荐歌单
export function getSongSheet() {
    return http.get('/personalized', {
        params: {
            limit: 6
        }
    })
}

// 推荐新音乐
export function getNewSong() {
    return http.get('/personalized/newsong')
}

// 热歌榜
export function getHotSong() {
    return http.get('/playlist/detail', {
        params: {
            id: 3778678
        }
    })
}

// 搜索列表
export function getSearch() {
    return http.get('/search/hot')
}

// 推荐歌单列表 songList
export function getRecList(params) {
    return http.get('/playlist/detail', {
        params
    })
}

// 推荐歌单评论
export function getComment(params) {
    return http.get('/comment/playlist', {
        params
    })
}

// 歌曲详情
export function getSongDetail(params) {
    return http.get('/song/detail', {
        params
    })
}

// 获取歌词
export function getLyric(params) {
    return http.get('/lyric', {
        params
    })
}

// 获取音乐url
export function getUrl(params) {
    return http.get('/song/url', {
        params
    })
}

// 搜索接口
export function getSearchSong(params) {
    return http.get('/search', {
        params
    })
}