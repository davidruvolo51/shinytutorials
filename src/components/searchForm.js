// import PropTypes from "prop-types"
import React, { Component } from 'react'


class Search extends Component {
    
    state = {
        query: "",
        results: [],
    }

    handleSubmit = event => {
        event.preventDefault()
    }

    filterPostsByString(string){

        // define vars
        let q = string.toLowerCase();
        let data = document.querySelectorAll(".post");
        
        // search -- show/hide results
        if(q === ""){
            for(var e=0; e < data.length; e++){
                data[e].style.display = "block";
            }
        } else {

            // run through all ".posts" and show/hide div based on the query
            for(var i = 0; i < data.length; i++){
                if(data[i].innerHTML.toLowerCase().indexOf(q) > 0){
                    data[i].style.display = "block";
                } else {
                    data[i].style.display = "none";
                }
            }
        }
    }

    search = event => {
        const query = event.target.value;
        const results = this.filterPostsByString(query);
        this.setState({results, query})
    }

    render(){
        return(
        <form aria-label="search for tutorials" onSubmit={this.handleSubmit}>
            <label htmlFor="search">Search</label>
            <input 
            type="search" 
            name="search" 
            id="search" 
            value={this.state.query} 
            onChange={this.search}
            />
        </form>
        )
    }
}

export default Search
