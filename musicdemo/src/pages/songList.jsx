import React from 'react'
import '../assets/css/songList.css'
import { getRecList, getComment } from '../utils/axios'
// 解析url
import qs from 'qs'

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            titleList: [],
            getrecList: [],
            comments: [],
            hotComments: []
        }
    }
    componentDidMount() {
        let query = this.props.location.search.slice(1)
        query = qs.parse(query)
        // 推荐歌单
        getRecList(query)
            .then(res => {
                if (res.code === 200) {
                    this.setState({
                        titleList: res.playlist,
                        getrecList: res.playlist.tracks
                    })
                }
            }).catch(err => {
                console.log(err);
            });
        // 推荐歌单评论
        getComment({
            id: query.id,
            limit: 10
        })
            .then(res => {
                if (res.code === 200) {
                    this.setState({
                        comments: res.comments,
                        hotComments: res.hotComments
                    })
                }
            }).catch(err => {
                console.log(err);
            })
    }
    goBack() {
        this.props.history.go(-1)
    }
    render() {
        const { titleList, getrecList, comments, hotComments } = this.state
        return (
            <div className="song">
                <div className="head">
                    <i onClick={this.goBack.bind(this)}>&lt;</i>
                    <span>网抑云音乐</span>
                </div>

                <div className="top">
                    <img src={titleList.coverImgUrl} alt="" />
                    <div className="inner">
                        <div className="title">
                            {titleList.name}
                        </div>
                        <div className="day">{titleList.updateFrequency}</div>
                        <div className="con">
                            <span>{titleList.description}</span>
                        </div>
                    </div>
                </div>

                <div className="list">
                    <h3>歌曲列表</h3>
                    {getrecList.map((item, idx) => {
                        return (
                            <div key={item.id} className="wbox">
                                <div className="left">{idx + 1}</div>
                                <div className="wrap">
                                    <div className="l">
                                        <p className="y">
                                            {item.name}
                                            <em>{item.alia[0] ? `(${item.alia[0]})` : ''}</em>
                                        </p>
                                        <p className="e">
                                            <span>{item.ar[0].name}{item.ar[1] ? ` / ${item.ar[1].name}` : ''} - {item.al.name}</span>
                                        </p>
                                    </div>
                                    <div className="r">
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="footer">
                    查看更多歌曲，请下载客户端
                </div>

                <div className="com">
                    <div className="like">
                        <h3>精彩评论</h3>
                    </div>
                    {/* comments */}
                    {comments.map((item, idx) => {
                        return (
                            <div key={idx} className="coms clearfix">
                                <div className="l">
                                    <img src={item.user.avatarUrl} alt="" />
                                </div>
                                <div className="r">
                                    <div className="up">
                                        <span>{item.user.nickname}</span>
                                        <i>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path fill="#999" d="m25.857 14.752c-.015.059-1.506 5.867-2.932 8.813-1.162 2.402-3 2.436-3.099 2.436h-12.826v-13c3 0 5.728-4 5.728-7.275 0-3.725 1.433-3.725 2.142-3.725 1.327 0 1.978 1.345 1.978 4 0 2.872-.832 4.525-.839 4.537-.161.31-.155.682.027.981.181.299.5.482.849.482h6.942c.922 0 1.551.215 1.866.64.467.626.286 1.705.164 2.112m-23.857 10.248v-10c0-1.795.659-1.981.855-2h2.145v13h-2.173c-.829 0-.827-.648-.827-1m25.309-13.54c-.713-.969-1.886-1.46-3.482-1.46h-5.519c.26-.932.519-2.285.519-4 0-5.221-2.507-6-4-6-1.909 0-4.185.993-4.185 5.725 0 2.206-1.923 5.275-3.815 5.275h-4-.011c-1.034.011-2.816.862-2.816 4v10.02c0 1.198.675 2.979 2.827 2.979h16.971.035c.364 0 3.224-.113 4.894-3.564 1.514-3.127 3.01-8.942 3.056-9.14.071-.23.664-2.289-.474-3.836"></path></svg>
                                        </i>
                                        <em>{item.likedCount > 0 ? item.likedCount : ''}</em>
                                    </div>
                                    <div className="down">
                                        <span>{item.content}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="com end">
                    <div className="like">
                        <h3>最新评论</h3>
                    </div>
                    {/* comments */}
                    {hotComments.map((item, idx) => {
                        return (
                            <div key={idx} className="coms clearfix">
                                <div className="l">
                                    <img src={item.user.avatarUrl} alt="" />
                                </div>
                                <div className="r">
                                    <div className="up">
                                        <span>{item.user.nickname}</span>
                                        <i>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path fill="#999" d="m25.857 14.752c-.015.059-1.506 5.867-2.932 8.813-1.162 2.402-3 2.436-3.099 2.436h-12.826v-13c3 0 5.728-4 5.728-7.275 0-3.725 1.433-3.725 2.142-3.725 1.327 0 1.978 1.345 1.978 4 0 2.872-.832 4.525-.839 4.537-.161.31-.155.682.027.981.181.299.5.482.849.482h6.942c.922 0 1.551.215 1.866.64.467.626.286 1.705.164 2.112m-23.857 10.248v-10c0-1.795.659-1.981.855-2h2.145v13h-2.173c-.829 0-.827-.648-.827-1m25.309-13.54c-.713-.969-1.886-1.46-3.482-1.46h-5.519c.26-.932.519-2.285.519-4 0-5.221-2.507-6-4-6-1.909 0-4.185.993-4.185 5.725 0 2.206-1.923 5.275-3.815 5.275h-4-.011c-1.034.011-2.816.862-2.816 4v10.02c0 1.198.675 2.979 2.827 2.979h16.971.035c.364 0 3.224-.113 4.894-3.564 1.514-3.127 3.01-8.942 3.056-9.14.071-.23.664-2.289-.474-3.836"></path></svg>
                                        </i>
                                        <em>{item.likedCount > 0 ? item.likedCount : ''}</em>
                                    </div>
                                    <div className="down">
                                        <span>{item.content}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="finish">
                    <span>收藏歌单</span>
                </div>
            </div >)
    }
}

export default Home