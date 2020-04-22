////////////////////////////////////////////////////////////////////////////////
// FILE: main.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2020-04-22
// PURPOSE: react component for <main> layout
// DEPENDENCIES: NA
// STATUS: working
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
import PropTypes from "prop-types"
function Main(props){
    return (
        <main id="main" className={ props.className ? `main ${props.className}` : "main"} aria-label="main content" style={props.style ? props.style : null}>
            {props.children}
        </main>
    )
}

// set props
Main.propTypes = {
    className: PropTypes.string
}

// export
export default Main