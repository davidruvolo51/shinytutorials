// import PropTypes from "prop-types"
////////////////////////////////////////////////////////////////////////////////
// FILE: searchForm.js
// AUTHOR: David Ruvolo
// CREATED: 2019-11-06
// MODIFIED: 2020-01-29
// PURPOSE: react component for search
// DEPENDENCIES: react
// STATUS: working
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React, { Component } from 'react'
class Search extends Component {
    
    // init state
    state = {
        query: "",
        results: [],
    }

    // prevent default function
    handleSubmit = (event) => {
        event.preventDefault()
    }

    // filter html elements function
    filterPostsByString(string){

        // define vars
        let q = string.toLowerCase();
        let data = document.querySelectorAll(".searchable");
        
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

    // search event
    search = (event) => {
        const query = event.target.value;
        const results = this.filterPostsByString(query);
        this.setState({results, query})
    }

    render(){
        return(
        <form className="form" aria-label="search for tutorials" onSubmit={this.handleSubmit}>
            <label className="input-label" htmlFor="search">Search for a Tutorial</label>
            <p className="input-example">Search by tag, keyword, title, date. Ex: css, 2018, editing.</p>
            <input className="input input-select" type="search" name="search" id="search" value={this.state.query} onChange={this.search}/>
        </form>
        )
    }
}

export default Search
