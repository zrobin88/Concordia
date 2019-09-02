import React, { Component } from 'react'
import './style.css'

const SearchBtn =(props)=>{
    return(
        <button className="btn-success btn-large" onClick={props.onClick}style={{ 'border-radius': '5px', 'margin-right': '2px' }} type="submit">Top Tracks<i class="fa fa-search"></i></button>
    )
}

export default SearchBtn