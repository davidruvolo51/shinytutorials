////////////////////////////////////////////////////////////////////////////////
// FILE: barchart.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2019-10-25
// PURPOSE: react component for svg barchart
// DEPENDENCIES: react
// STATUS: working
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
const Barchart = (props) => (
    <svg className={props.className ? `illustration ${props.className}` : `illustration`} xmlns="http://www.w3.org/2000/svg" width="210" height="100" viewBox="0 0 210 100">
        <rect x="10" y="40" width="40" height="80" fill="#5C80BC"/>
        <rect x="60" y="20" width="40" height="100" fill="#5C80BC"/>
        <rect x="110" y="50" width="40" height="70" fill="#5C80BC"/>
        <rect x="160" y="80" width="40" height="40" fill="#5C80BC"/>
    </svg>
)
export default Barchart