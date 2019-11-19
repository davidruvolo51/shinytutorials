////////////////////////////////////////////////////////////////////////////////
// FILE: hero-alt.js
// AUTHOR: David Ruvolo
// CREATED: 2019-11-05
// MODIFIED: 2019-11-14
// PURPOSE: hero-alt is a text based hero for other pages and sections
// DEPENDENCIES: see below
// STATUS: working
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
function Header(props){
    return (
        <header className={props.className ? `hero hero-text ${props.className}` : "hero hero-text"}>
            <div className="hero-content">
                <h1>{props.title}</h1>
                {
                    props.subtitle
                        ? (
                            <h2>{props.subtitle}</h2>
                        )
                        : null
                }
                {
                    props.text
                        ? (
                            <p className="hero-text">{props.text}</p>
                        )
                        : null
                }
            </div>
        </header>
    )
}
export default Header