////////////////////////////////////////////////////////////////////////////////
// FILE: themeToggle.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-26
// MODIFIED: 2019-10-26
// PURPOSE: react component for theme button
// DEPENDENCIES: react
// STATUS: in.progress
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React, { Component } from "react"
class Toggle extends Component {


    ___changeTheme() {
        console.log("doing something cool");
    }

    ___onClick = (event) => {
        this.___changeTheme()
    }

    render() {
        return (
            <button className="btn btn-secondary" id="themeBtn" onClick={this.___onClick}>
                Change Theme
            </button>
        )
    }
}
export default Toggle