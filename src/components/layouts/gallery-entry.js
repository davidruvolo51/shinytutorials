////////////////////////////////////////////////////////////////////////////////
// FILE: gallery-entry.js
// AUTHOR: David Ruvolo
// CREATED: 2019-11-14
// MODIFIED: 2019-11-14
// PURPOSE: react component for gallery entry
// DEPENDENCIES: 
// STATUS: in.progress
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
function GalleryEntry(props){
    return(
        <div className={props.className ? `gallery-entry ${props.className}` : `gallery-entry`} aria-labellyBy={props.title}>
            <h2 id={props.title}>{props.title}</h2>
            <p>{props.text}</p>
            <a href={props.linkHref}>{props.linkLabel}</a>
        </div>
    )
}
export default GalleryEntry
