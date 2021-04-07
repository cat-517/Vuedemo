import React from 'react'
import '../assets/css/search.css'
import { getSearch, getSearchSong } from '../utils/axios'

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            searchList: [],
            resultList: [],
            isShow: false
        };
        this.val = React.createRef()
    }
    componentDidMount() {
        getSearch()
            .then(res => {
                if (res.code === 200) {
                    this.setState({
                        searchList: res.result.hots
                    })
                }
            }).catch(err => {
                console.log(err);
            })
    }
    // 封装搜索方法
    search(keywords) {
        // 点击时给input赋值
        this.val.current.value = keywords
        getSearchSong({ keywords })
            .then(res => {
                if (res.code === 200) {
                    this.setState({
                        resultList: res.result.songs,
                        isShow: true
                    })
                }
            }).catch(err => {
                console.log(err);
            })
    }
    goPlay(id) {
        this.props.history.push({
            pathname: '/play',
            state: {
                id
            }
        })
    }
    close() {
        this.val.current.value = ''
        this.setState({
            resultList: [],
            isShow: false
        })
    }
    // 键盘抬起
    KeyUp(e) {
        // 剔除空 不做数据交互
        if (e.target.value === '') {
            this.close()
            return
        }
        this.setState({
            isShow: true
        })
        this.search(e.target.value)
    }
    render() {
        const { searchList, resultList, isShow } = this.state
        let hotInfo = <div className="list">
            <div className="inner">
                <h3>热门搜索</h3>
                <ul>
                    {searchList.map(item => {
                        return (
                            <li onClick={this.search.bind(this, item.first)} key={item.first}>
                                <span className="link">{item.first}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
        let searchInfo = <div className="song">
            {resultList.map(item => {
                return (
                    <div key={item.id} onClick={this.goPlay.bind(this, item.id)} className="box">
                        <div className="l">
                            <p className="y">
                                {item.name}
                                <em>{item.alias ? item.alias[0] : ''}</em>
                            </p>
                            <p>
                                <i></i>
                                <span>{item.artists ? item.artists[0].name : ''} - {item.album ? item.album.name : ''}</span>
                            </p>
                        </div>
                        <div className="r">
                            <span></span>
                        </div>
                    </div>
                )
            })}
        </div>
        return (
            // 搜索
            <div className="search">
                <div className="wrap">
                    <div className="top">
                        <i className="bg"></i>
                        <input onChange={this.KeyUp.bind(this)} ref={this.val} type="text" placeholder="搜索歌手、歌曲、专辑" autoComplete="off" />
                        {
                            isShow ? <em onClick={this.close.bind(this)}>X</em> : ''
                        }
                    </div>
                </div>
                {resultList.length > 0 ? searchInfo : hotInfo}
            </div>)
    }
}

export default Home