////////////////////////////////////////////////////////////////////////////////
// FILE: searchForm.js
// AUTHOR: David Ruvolo
// CREATED: 2019-11-06
// MODIFIED: 2020-04-22
// PURPOSE: react component for search
// DEPENDENCIES: react
// STATUS: working
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React, { useState, useEffect } from 'react'
function Search(props) {

    // on submit
    const onSubmit = (event) => {
        event.preventDefault()
    }

    // setState
    const [query, setQuery] = useState('');
    const onChange = (event) => {
        event.preventDefault();
        setQuery(event.target.value);
    }

    // filter html elements function
    useEffect(() => {
        let q = query.toLowerCase();
        let data = document.querySelectorAll(".searchable");

        // search -- show/hide results
        if (q === "") {
            for (var e = 0; e < data.length; e++) {
                data[e].style.display = "block";
            }
        } else {

            // run through all ".posts" and show/hide div based on the query
            for (var i = 0; i < data.length; i++) {
                if (data[i].innerHTML.toLowerCase().indexOf(q) > 0) {
                    data[i].style.display = "block";
                } else {
                    data[i].style.display = "none";
                }
            }
        }
    }, [query])

    // render component
    return (
        <form className="form post-form" aria-label="search for tutorials" onSubmit={onSubmit}>
            <label className="input-label" htmlFor="search">Search for a Tutorial</label>
            <p className="input-example">Search by tag, keyword, title, date. Ex: css, 2018, editing.</p>
            <input className="input input-select" type="search" name="search" id="search" onChange={onChange} />
        </form>
    )
}

export default Search
