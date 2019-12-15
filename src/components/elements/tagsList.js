////////////////////////////////////////////////////////////////////////////////
// FILE: tagsList.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2019-12-15
// PURPOSE: react component for tags list, i.e., list of keywords
// DEPENDENCIES: see below
// STATUS: in.progress
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
import PropTypes from "prop-types"
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

// set props
Taglist.propTypes = {
  className: PropTypes.string,
  keywords: PropTypes.array.isRequired
}

// export
export default Taglist