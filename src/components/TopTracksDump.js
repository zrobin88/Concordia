import React, { Component } from 'react'
import './style.css'

const TopTracksDump = (props) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title name">{props.name} Top Tracks</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text tracks">{props.tracks}</p>
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
            </div>
        </div>
        

    )

}

export default TopTracksDump;