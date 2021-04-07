import React from 'react'
import '../assets/css/recommend.css'

import 'swiper/js/swiper.esm.browser.bundle.min.js'
import 'swiper/css/swiper.min.css'
// 轮播样式
import Swiper from 'swiper'

// 调用轮播图
import { getBanner, getSongSheet, getNewSong } from '../utils/axios'

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            recList: [],
            songList: [],
            bannerList: []
        }
    }
    componentDidMount() {
        // 轮播
        getBanner()
            .then(res => {
                if (res.code === 200) {
                    this.setState({
                        bannerList: res.banners
                    }, () => {
                        new Swiper('.swiper-container', {
                            pagination: {
                                el: '.swiper-pagination',
                            },
                            loop: true,
                            autoplay: {
                                delay: 1500,
                                disableOnInteraction: false
                            },
                        })
                    })
                }
            }).catch(err => {
                console.log(err);
            });
        // 推荐歌单
        getSongSheet()
            .then(res => {
                if (res.code === 200) {
                    this.setState({
                        recList: res.result
                    })
                }
            }).catch(err => {
                console.log(err);
            });
        // 最新音乐
        getNewSong()
            .then(res => {
                if (res.code === 200) {
                    this.setState({
                        songList: res.result
                    })
                }
            }).catch(err => {
                console.log(err);
            })
    }
    // 推荐歌单列表页
    goSongList(id) {
        this.props.history.push('/songlist?id=' + id)
    }
    // 从最新音乐到播放页
    goPlay(id) {
        this.props.history.push({
            pathname: '/play',
            state: {
                id
            }
        })
    }
    render() {
        const { recList, songList, bannerList } = this.state
        return (
            // 推荐
            <div className="rec" >
                <div className="banner">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {bannerList.map(item => {
                                return (
                                    <div key={item.imageUrl} className="swiper-slide">
                                        <img src={item.imageUrl} alt="" />
                                    </div>
                                )
                            })}

                        </div>
                        <div className="swiper-pagination"></div>
                    </div>
                </div>

                <div className="top">
                    <h2>推荐歌单</h2>
                </div>

                <div className="list">
                    {recList.map(item => {
                        return (
                            <div onClick={this.goSongList.bind(this, item.id)} key={item.picUrl} className="info">
                                <img src={item.picUrl} alt="" />
                                <span>{`${(item.playCount / 1000).toFixed(1)}万`}</span>
                                <p>{item.name}</p>
                            </div>
                        )
                    })}
                </div>

                <div className="top">
                    <h2>最新音乐</h2>
                </div>

                <div className="song">
                    {songList.map(item => {
                        return (
                            <div key={item.picUrl} onClick={this.goPlay.bind(this, item.id)} className="wrap">
                                <div className="l">
                                    <p className="y">
                                        {item.name}
                                        <em>{item.song.alias[0]}</em>
                                    </p>
                                    <p>
                                        <i></i>
                                        <span>{item.song.artists[0].name} - {item.song.album.name}</span>
                                    </p>
                                </div>
                                <div className="r">
                                    <span></span>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="footer">
                    <div className="flogo">
                        <i></i>
                        <span>网抑云音乐</span>
                    </div>
                    <div className="app">打开APP，发现更多好音乐<i>&gt;</i></div>
                    <p className="t">网易公司版权所有©1997-2021杭州乐读科技有限公司运营</p>
                </div>
            </div>
        )
    }
}

export default Home