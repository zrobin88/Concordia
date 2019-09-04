import React, { Component } from 'react'
import './style.css'

const EventsBtn =(props)=>{
    return(
        <button className="btn-success btn-large" onClick={props.onClick}style={{ 'border-radius': '5px', 'margin-right': '2px' }} type="submit"><i class="fa fa-search">Events</i></button>
    )
}

export default EventsBtn