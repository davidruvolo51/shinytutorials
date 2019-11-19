////////////////////////////////////////////////////////////////////////////////
// FILE: keywordButton.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2019-10-25
// PURPOSE: react component for taglist filters
// DEPENDENCIES: see below
// STATUS: working
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React, { Component } from 'react'
class KeyWordButton extends Component {

    constructor(props) {
      super(props);
      this.state = { isActive: false}
    }

    addActiveClass() {
      this.setState({ isActive: !this.state.isActive });
    }

    // function to filter posts by selected data-value
    filterPostsByKeywordButton(string){

      // define vars
      let q = string.toLowerCase();
      let data = document.querySelectorAll(".searchable");

      // add class to selected keyword button
      document.querySelectorAll(".menu-btn").forEach(b => b.classList.remove("selected"));
      document.querySelector(`*[query='${this.props.keyword}']`).classList.add("selected");
      
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

    filterByKeyword = (event) => {
      const query = this.props.keyword;
      this.filterPostsByKeywordButton(query);
    }

    render() {
        return(
          <button className="btn btn-keyword" key={this.props.keyword} query={this.props.keyword} onClick={this.filterByKeyword}>
            {this.props.keyword}
          </button>
        )
    }

}

export default KeyWordButton
