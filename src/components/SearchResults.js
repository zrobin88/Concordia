import React, { Component } from 'react'
import './style.css'
import axios from 'axios'

const lfmKey = "e193748e40aa0cc6cfb11593cff93a81"
class TopTrackSearch extends Component {
    state={
        value:''
    }
    topTracksSearch=()=>{
        const searchValue = this.state.value
        axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${searchValue}&api_key=${lfmKey}&format=json`).then(res => {
           console.log(res.data)
        })
    }
    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    




}

export default TopTrackSearch