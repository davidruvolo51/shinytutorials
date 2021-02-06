////////////////////////////////////////////////////////////////////////////////
// FILE: sidebar.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2021-02-06
// PURPOSE: react component for sidebar layout with collapsible sidebar panel
// DEPENDENCIES: react
// STATUS: working
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"

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
    return (
        <aside className={props.className ? `sidebar-panel ${props.className}` : "sidebar-panel"}>
            <section className="sidebar-content">
                { props.title ? <h2 className="sidebar-title">{props.title}</h2> : null }
                { props.caption ? <p className="sidebar-caption">{props.caption}</p> : null }
                { props.children }
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