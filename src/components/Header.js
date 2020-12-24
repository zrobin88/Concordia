import React from 'react';
import SearchBar from './SearchBar'

const Header = () => {
    return (
        <div className="jumbotron text-light jumbotron-fluid header">
            <div className="container">
            <div className='row'>
            <div className='col-md-6'>
                <h1 className="display-4 kanit">Concordia Music</h1>
            </div> 
            <div className='col-md-6'>
                <h3 className='sub-header'>Look up any musical artist!</h3>
            </div> 
        </div>
                <p className="lead"></p>
         
            </div>
           
        </div>
        
    )
}

export default Header; 