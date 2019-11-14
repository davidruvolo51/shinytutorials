////////////////////////////////////////////////////////////////////////////////
// FILE: tagsList.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2019-11-25
// PURPOSE: react component for tags list, i.e., list of keywords
// DEPENDENCIES: see below
// STATUS: in.progress
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
import KeyWordButton from "./keywordButton"
function Taglist(props){
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
export default Taglist