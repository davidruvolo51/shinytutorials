////////////////////////////////////////////////////////////////////////////////
// FILE: section.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-26
// MODIFIED: 2019-10-26
// PURPOSE: react component for sections
// DEPENDENCIES: react
// STATUS: working
// COMMENTS: n
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
const Section = (props) => {
    return (
        <section className={props.className ? `main-section ${props.className}` : `main-section`}>
            {props.children}
        </section>
    )
}
export default Section