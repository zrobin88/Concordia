import React from 'react';
import SearchBar from './SearchBar'

const Header = () => {
    return (
        <div className="jumbotron text-light jumbotron-fluid header">
            <div className="container">
                <h1 className="display-4">React Image Search</h1>
                <p className="lead">Type any term to search for images on Unsplash!</p>
         
            </div>
            <SearchBar />
        </div>
        
    )
}

export default Header; 