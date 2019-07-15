import React, {Component} from 'react'
import './style.css'

class SearchResults extends Component{
    

    render() {
        return (
      
        <div className="row">
       
      \
        <div className="col-md-12 image-wrapper">
        
            <div className="image-results">
              {this.props.results.slice(0,25).map(image => (
                  <div>
                      {console.log(this.props.result)}
                      <a href = {image.user.links.html} alt="linktounsplash" target="_blank"> 
                      <img className="img-list" src={image.urls.small} alt="searchresult"
                           key={image.id}/>
                          </a>
      
                         
                  </div>

              ))}
     
        </div>
          </div>
   
          </div>
         

       
        )
      }




}

export default SearchResults