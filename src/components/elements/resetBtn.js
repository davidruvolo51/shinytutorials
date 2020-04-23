////////////////////////////////////////////////////////////////////////////////
// FILE: resetBtn.js
// AUTHOR: David Ruvolo
// CREATED: 2019-11-06
// MODIFIED: 2020-04-23
// PURPOSE: react component for reset button
// DEPENDENCIES: React
// STATUS: working
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from 'react'
function Reset(props) {
    function reset_filters() {
        const tags = document.querySelectorAll(".btn-keyword");
        const data = document.querySelectorAll(".post");
        tags.forEach(t => t.classList.remove("selected"));
        data.forEach(d => d.style.display = "block");
    }
    return(
        <button id="reset" className="btn btn-secondary" onClick={reset_filters}>Reset</button>
    )
}
export default Reset