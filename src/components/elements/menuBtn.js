////////////////////////////////////////////////////////////////////////////////
// FILE: menuBtn.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-26
// MODIFIED: 2019-10-26
// PURPOSE: react component for menu button
// DEPENDENCIES: react
// STATUS: in.progress
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React, { Component } from "react"
class Menubtn extends Component {

    constructor(props) {
        super(props);
        this.___openMenu = this.___openMenu.bind(this);
    }
    // function: open menu
    ___openMenu() {

        // toggle sidebar and toggle button classes
        const toggle = document.getElementById("menuBtn");
        const menu = document.querySelector(".navigation");
        menu.classList.toggle("expanded");
        toggle.classList.toggle("open");

        // update aria attributes
        if (toggle.getAttribute("aria-expanded") === "false") {
            toggle.setAttribute("aria-expanded", true);
            menu.setAttribute("hidden", false);
        } else {
            toggle.setAttribute("aria-expanded", false);
            menu.setAttribute("hidden", true);
        }
    }

    // render
    render() {
        return (
            <button id="menuBtn" aria-label="open and close menu" aria-expanded="false" onClick={this.___openMenu}>
                {/* <label className="menu-label">Menu</label> */}
                <span className="menu-icon" aria-hidden="true">
                    <span className="menu-bar"></span>
                    <span className="menu-bar"></span>
                    <span className="menu-bar"></span>
                </span>
            </button>
        )
    }
}
export default Menubtn