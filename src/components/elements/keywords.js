////////////////////////////////////////////////////////////////////////////////
// FILE: keywordButton.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2020-04-22
// PURPOSE: react component for taglist filters
// DEPENDENCIES: see below
// STATUS: working
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import PropTypes from "prop-types"

// functional component for individual button
function KeyWordButton(props) {

	// function that filters all posts
	function filter_posts(string) {
		
		// define vars and select elements
		let query = string.toLowerCase();
		let data = document.querySelectorAll(".searchable");
		document.querySelectorAll(".btn-keyword").forEach(b => b.classList.remove("selected"));
		document.querySelector(`*[query=${string}`).classList.add("selected")

		// search -- show/hide results
		if (query === "") {
			for (var e = 0; e < data.length; e++) {
				data[e].style.display = "block";
			}
		} else {

			// run through all ".posts" and show/hide div based on the query
			for (var i = 0; i < data.length; i++) {
				if (data[i].innerHTML.toLowerCase().indexOf(query) > 0) {
					data[i].style.display = "block";
				} else {
					data[i].style.display = "none";
				}
			}
		}
	}

	// render
	return (
		<button className="btn btn-keyword" query={props.keyword} key={props.keyword} onClick={() => { filter_posts(props.keyword) }}>
			{props.keyword}
		</button>
	)
}

// define keywords list
function KeyWordList(props){
    return (
        <ul className={ props.className ? `taglist ${props.className}` : "taglist"}>
            {
              props.keywords.map((key, k) => (
                <li key={k} className="taglist-item">
                  <KeyWordButton key={k} keyword={key} />
                </li>
              ))
            }
        </ul>
    )
}

// define proptypes for list
KeyWordList.propTypes = {
	className: PropTypes.string,
	keywords: PropTypes.array.isRequired
  }

export default KeyWordList