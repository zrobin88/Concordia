import React, { Component } from "react";
import axios from 'axios'; 
import SearchResults from './SearchResults'
import './style.css';



// const API_KEY = 'b71661f27a7080f087d50221b686a16e4549cebfd6d9edc870065558542e9ba9'
const API_KEY = process.env.REACT_APP_API_KEY; 

 class SearchBar extends Component {
     state = {
         value: "",
         searchResult:[]
     }

     handleChange = (e) =>{
         this.setState({
             value: e.target.value
         })
     }
     handleSubmit = (e) => {
         e.preventDefault()
         const searchValue = this.state.value
         axios.get(`https://api.unsplash.com/search/photos/?client_id=${API_KEY}&per_page=25&orientation=landscape&query=${searchValue}}`).then(res => {
             
             this.setState({
                 
                 searchResult: res.data.results
             }) 
                
 })
     }
     

  render() {
    return (
    
      <div>
          <form onSubmit={this.handleSubmit} className="search-container">
                  <input
                        class="field-container"
                        type='text'
                        id='search-bar'
                        value={this.state.value}
                        placeholder="Search Images..."
                        onChange={this.handleChange}/>
             
          <button className="btn-success btn-large" type="submit">submit<i class="fa fa-search"></i></button>
          </form>
          <SearchResults results={this.state.searchResult}/>
      </div>
    )
  }
}

export default SearchBar