import React from 'react'
import '../assets/css/rank.css'

import { getHotSong } from '../utils/axios'

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            rankList: [],
            month: '',
            day: ''
        }
    }
    // 调用接口
    componentDidMount() {
        setTimeout(() => {
            let time = new Date();
            this.setState({
                month: time.getMonth() + 1,
                day: time.getDate()
            })
        })
        getHotSong()
            .then(res => {
                if (res.code === 200) {
                    this.setState({
                        rankList: res.playlist.tracks.filter((item, idx) => idx < 20)
                    })
                }
            }).catch(err => {
                console.log(err);
            })

    }
    // 转换数字
    toTwo(num) {
        console.log('wsss');
        if (num < 10) {
            return '0' + num
        } else {
            return num
        }
    }
    // 到播放页
    goPlay(id) {
        this.props.history.push({
            pathname: '/play',
            state: {
                id
            }
        })
    }
    render() {
        const { rankList, month, day } = this.state
        return (
            // 热歌榜
            <div className="rank">

                <div className="logo">
                    <div className="bg"></div>
                    <p>更新日期：{month < 10 ? `0${month}` : month}月{day < 10 ? `0${day}` : day}日</p>
                </div>

                {rankList.map((item, idx) => {
                    return (
                        <div key={item.al.picUrl} onClick={this.goPlay.bind(this, item.id)} className="list">
                            {/* <div className={'left' + ' ' + [idx+1 < 4 ? 'active' : '']}> */}
                            <div className={`left ${[idx + 1 < 4 ? 'active' : '']}`}>
                                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                                {/* {idx + 1} */}
                                {/* {this.toTwo.bind(this, idx + 1)} */}
                            </div>
                            <div className="right">
                                <div className="wrap">
                                    <div className="l">
                                        <p className="y">
                                            {item.name}
                                            <em>{item.alia[0] ? `(${item.alia[0]})` : ''}</em>
                                        </p>
                                        <p>
                                            <i></i>
                                            <span>{item.ar[0].name}{item.ar[1] ? ` / ${item.ar[1].name}` : ''} - {item.al.name}</span>
                                        </p>
                                    </div>
                                    <div className="r">
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

                <div className="footer">
                    查看完整榜单<i>&gt;</i>
                </div>
            </div>)
    }
}

export default Home