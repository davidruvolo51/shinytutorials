////////////////////////////////////////////////////////////////////////////////
// FILE: menuBtn.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-26
// MODIFIED: 2020-04-23
// PURPOSE: react component for menu button
// DEPENDENCIES: react
// STATUS: working
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React, { useState, useEffect } from "react"

function MenuToggle() {
    // set status
    const [isOpen, setOpenStatus] = useState(false);
    useEffect(() => {
        // select elements
        const menu = document.querySelector(".navigation");
        if (isOpen) {
            menu.classList.add("expanded");
            menu.removeAttribute("hidden");
        } else {
            menu.setAttribute("hidden", "true");
            menu.classList.remove("expanded");
        }
    }, [isOpen])

    // render
    return (
        <button id="menuBtn" className={isOpen ? "open" : ""} aria-expanded={isOpen} onClick={() => setOpenStatus(!isOpen)}>
            <span className="menu-icon" aria-hidden="true">
                <span className="menu-bar"></span>
                <span className="menu-bar"></span>
                <span className="menu-bar"></span>
            </span>
        </button>
    )
}

export default MenuToggle