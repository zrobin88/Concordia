import React, { Component } from "react";
import axios from 'axios';
import SearchResults from './SearchResults'
import './style.css';
import TopTracksDump from './TopTracksDump'
import SearchBtn from './SearchBtn'
import EventsBtn from './Instructions'

// const API_KEY = process.env.REACT_APP_API_KEY; 
const lfmKey = process.env.REACT_APP_LAST_FM_KEY
const eventKey = process.env.TM_KEY;

class SearchBar extends Component {
    state = {
        value: '',
        searchResult: [],
        artistBio: 'Search For Any Music Artist',
        artistName: '',
        artistImg: '',
        topTracks: [],
        tableCity: '' ,
        tableCountry: '' ,
        tableDate: '' ,
        tableVenue: '' ,
        upcomingEvents: {
            city: '' ,
            state: '' ,
            venueName: '' ,
            date: ''
        }

    }

    artistSearch = () => {
        const searchValue = this.state.value
        axios.get(`https://ws.audioscrobbler.com//2.0/?method=artist.getinfo&artist=${searchValue}&api_key=${lfmKey}&format=json`).then(res => {
            console.log('ARTIST DATA HERE', res.data);
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
                this.setState({ topTracks: trackArr })

            }
        })
    }

    eventsSearch = () => {
        const searchValue = this.state.value
        const cityArr = []
        let venueArr = []
        let dateArr =[]
        axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&keyword=${searchValue}`).then(res => {

            //destructuring
            // let { _embedded: { events, images, dates, venues } } = eventInfoResponse;

            for (let i = 0; i < 6; i++) {
                let eventInfoResponse = res.data._embedded.events[i];
                console.log('TICKETMASTER',eventInfoResponse)
                let cityName = eventInfoResponse._embedded.venues[0].city.name
                let ven = eventInfoResponse._embedded.venues[0].name
                let eventDate = eventInfoResponse.dates.start.localDate
                console.log(cityName)
                cityArr.push(cityName)
                venueArr.push(ven)
                dateArr.push(eventDate)
                this.setState(prevState => {
                    let upcomingEvents = Object.assign({}, prevState.upcomingEvents);  // creating copy of state variable 
                    upcomingEvents.city = cityArr;
                    upcomingEvents.venueName = venueArr;
                    upcomingEvents.date = dateArr
                    return { upcomingEvents };                                 // return new object 
                })
                this.setState({tableCity: 'City', tableCountry: 'Country', tableDate: 'Date', tableVenue: 'Venue'})


                // console.log(events[i]._embedded.venues[0].country.countryCode)
                // console.log(events[i]._embedded.venues[0].name)
                // console.log(events[i].dates.start.localDate)
                //   console.log(moment(events[i].dates.start.localTime, "HH:mm:ss").format("h:mm A"))

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
        e.preventDefault()
        this.setState({tableCity: '', tableCountry: '', tableDate: '', tableVenue: ''})
        this.topTracksSearch()

    }
    handleSubmitES = (e) => {
        e.preventDefault()
        this.setState({ toptracks: '' })
        this.eventsSearch()
    }


    render() {
        console.log(this.state)
        const { artistBio, artistImg, artistName, topTracks, upcomingEvents, tableCity, tableCountry, tableDate, tableVenue } = this.state;
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
                            placeholder="Search Musical Artists..."
                            onChange={this.handleChange} />

                        <button className="btn-success btn-large" style={{ 'border-radius': '5px', 'margin-right': '2px' }} type="submit">Search<i class="fa fa-search"></i></button>
                    </form>

                </div>
                <div className="jumbotron jumbotron-fluid bg-white" style={{ 'border-radius': '15px' }}>
                    <div className="container">
                        <div className='row'>
                            <div className='col-md-4'>
                                <img src={artistImg} />
                            </div>
                            <div className='col-md-8'>
                                <h1 className="display-4 kanit">{artistName}</h1>
                                <p className="lead kanit">{artistBio}</p>
                                <SearchBtn onClick={this.handleSubmitTT} />
                                <EventsBtn onClick={this.handleSubmitES} />
                                <div className='row'>
                                    {/* <p>{topTracks}</p> */}
                                    <ul className='kanit ttList'>
                                        {topTracks.map(function (trackArr, i) {
                                            console.log('test');
                                            return <li key={i}>{trackArr}</li>
                                        })}
                                    </ul>
                                </div>
                                <div className='row'>

                                    <table className="table table-striped results mt-5" placeholder="Results" id="resTable">

                                        <thead>
                                            <tr>
                                                <th scope="col">{tableCity}</th>
                                                <th scope="col">{tableCountry}</th>
                                                <th scope="col">{tableVenue}</th>
                                                <th scope="col">{tableDate}</th>
                                             
                                            </tr>
                                        </thead>
                                        <tbody>
                                         {Object.keys(upcomingEvents).map(i => {
                                                    return <td key={i}>{upcomingEvents[i]}</td>
                                                })}
                                        </tbody>
                                        </table>
                                            {/* <ul className='kanit ttList'>
                                                {Object.keys(this.state.upcomingEvents).map(i => {
                                                    return <p key={i}>{this.state.upcomingEvents[i]}</p>
                                                })}
                                            </ul> */}
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