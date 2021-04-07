import React from 'react'
import '../assets/css/play.css'
import { getSongDetail, getLyric, getUrl } from '../utils/axios'

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            songDetail: {},
            name: '',
            lyric: '',
            url: '',
            ar: []
        }
    }
    componentDidMount() {
        // 歌曲详情
        getSongDetail({
            ids: this.props.location.state.id
        })
            .then(res => {
                if (res.code === 200) {
                    this.setState({
                        songDetail: res.songs[0],
                        name: res.songs[0].name,
                        ar: res.songs[0].ar
                    })
                }
            }).catch(err => {
                console.log(err);
            });
        // 获取歌词
        getLyric({
            id: this.props.location.state.id
        })
            .then(res => {
                if (res.code === 200) {
                    this.setState({
                        lyric: res.lrc.lyric
                    })
                }
            }).catch(err => {
                console.log(err);
            });
        // 歌曲url
        getUrl({
            id: this.props.location.state.id
        })
            .then(res => {
                if (res.code === 200) {
                    this.setState({
                        url: res.data[0].url
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
        const { songDetail, name, ar, lyric, url } = this.state
        return (
            <div className="play">

                <div className="img">
                    <p><i onClick={this.goBack.bind(this)}>&lt;</i>专辑图片</p>
                    <img src={songDetail.al ? songDetail.al.picUrl : ''} alt="" />
                </div>

                <div className="ar">
                    <span>{name} - </span>
                    {ar.map(item => {
                        return (
                            <span key={item.id}>{item.name} <i>/</i> </span>
                        )
                    })}
                </div>

                <div className="lyric">
                    {lyric}
                </div>

                <audio src={url} controls autoPlay></audio>
            </div>)
    }
}

export default Home