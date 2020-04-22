////////////////////////////////////////////////////////////////////////////////
// FILE: sidebar.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2020-04-22
// PURPOSE: react component for sidebar layout with collapsible sidebar panel
// DEPENDENCIES: react
// STATUS: working
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React, { useState, useEffect } from "react"

// parent component
function SideBarLayout(props) {
    return (
        <div className={props.className ? `sidebar-layout ${props.className}` : "sidebar-layout"}>
            {props.children}
        </div>
    )
}

// sidebar panel with collapsible section
function SideBarPanel(props) {

    // state
    const [open, setOpen] = useState(false);

    // resize function
    useEffect(() => {
        const resize = () => {
            let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if (w <= 812) {
                setOpen(false)
            } else {
                setOpen(true)
            }
        }

        // set init and resize
        resize();
        window.addEventListener("resize", resize);

        // cleanup
        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [])

    // function for status
    function expandPanel() {
        const content = document.querySelector(".sidebar-accordion");
        if (open) {
            content.removeAttribute("hidden");
        } else {
            content.setAttribute("hidden", "true")
        }
    }

    // render
    return (
        <aside className={props.className ? `sidebar-panel ${props.className}` : "sidebar-panel"}>
            <section className="sidebar-content">
                <h2 className="sidebar-title">
                    <button className="sidebar-toggle" onClick={() => {setOpen(!open); expandPanel()}} aria-expanded={open ? "true" : "false"}>
                        {props.title}
                        <svg width="25" height="25" viewBox="0 0 25 25" className={`sidebar-toggle-icon ${open ? "rotated" : ""}`} aria-hidden="true">
                            <circle cx="12.5" cy="12.5" r="12.5"></circle>
                            <line x1="12.5" y1="5" x2="12.5" y2="20" stroke="white" strokeLinecap="butt" strokeWidth="2.5" />
                            <line x1="5" y1="12.5" x2="20" y2="12.5" stroke="white" strokeLinecap="butt" strokeWidth="2.5" />
                        </svg>
                    </button>
                </h2>
                <div className={`sidebar-accordion ${open ? "expanded" : ""}`} hidden="">
                    <p className="sidebar-caption">{props.caption}</p>
                    {props.children}
                </div>
            </section>
        </aside>
    )
}

// main panel
function MainPanel(props) {
    return (
        <div className={props.className ? `main-panel ${props.className}` : "main-panel"}>
            {props.children}
        </div>
    )
}

// export
export { SideBarLayout, SideBarPanel, MainPanel }