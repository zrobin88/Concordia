import React, { Component } from "react";
import axios from 'axios';
import SearchResults from './SearchResults'
import './style.css';
import TopTracksDump from './TopTracksDump'
import SearchBtn from './SearchBtn'


// const API_KEY = process.env.REACT_APP_API_KEY; 
const lfmKey = "e193748e40aa0cc6cfb11593cff93a81"
const eventKey = process.env.TM_KEY;

class SearchBar extends Component {
    state = {
        value: '',
        searchResult: [],
        artistBio: 'Search For Any Music Artist',
        artistName: '',
        artistImg: '',
        topTracks: [],
      
    }

    artistSearch = () => {
        const searchValue = this.state.value
        axios.get(`https://ws.audioscrobbler.com//2.0/?method=artist.getinfo&artist=${searchValue}&api_key=${lfmKey}&format=json`).then(res => {
            console.log('DATA HERE', res.data);
            const artistInfo = res.data.artist.bio.summary
            const artistImg = res.data.artist.image[2]["#text"]
            const bandName = res.data.artist.name
            // console.log(artistInfo, artistImg, bandName)
            this.setState({
                artistBio: artistInfo,
                artistName: bandName,
                artistImg: artistImg
            })

        })

    }

    topTracksSearch = () => {
        const searchValue = this.state.value
        let trackArr = []
        axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${searchValue}&api_key=${lfmKey}&format=json`).then(res => {
            for (let i = 0; i < 10; i++) {
                let trackResults = res.data.toptracks.track[i].name
                trackArr.push(trackResults)
                console.log('TRACK ARR', trackArr)
                this.setState({ topTracks: trackArr })

            }
        })
    }


    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.artistSearch()

    }
    handleSubmitTT = (e) => {
        this.topTracksSearch()

    }


    render() {
        console.log(this.state)
        const { artistBio, artistImg, artistName, topTracks } = this.state;
        console.log("IMAGE", artistImg)
        return (
            <div className='container main-container'>
                <div>
                    <form onSubmit={this.handleSubmit} className="search-container">
                        <input
                            class="field-container text-dark"
                            type='text'
                            id='search-bar'
                            style={{ 'border-radius': '5px', width: '30%', justifyContent: 'center' }}
                            value={this.state.value}
                            placeholder="Search Images..."
                            onChange={this.handleChange} />

                        <button className="btn-success btn-large" style={{ 'border-radius': '5px', 'margin-right': '2px' }} type="submit">Search<i class="fa fa-search"></i></button>
                    </form>

                </div>
                <div className="jumbotron jumbotron-fluid bg-white" style={{'border-radius':'15px'}}>
                    <div className="container">
                    <div className='row'>
                    <div className='col-md-4'>
                      <img src={artistImg}/>
                    </div>
                    <div className='col-md-8'>
                      <h1 className="display-4 kanit">{artistName}</h1>
                        <p className="lead kanit">{artistBio}</p>
                        <SearchBtn onClick={this.handleSubmitTT} />
                        <div className='row'>
                            {/* <p>{topTracks}</p> */}
                            <ul className='kanit ttList'>
                                {topTracks.map(function (trackArr, i) {
                                    console.log('test');
                                    return <li key={i}>{trackArr}</li>
                                })}
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default SearchBar