////////////////////////////////////////////////////////////////////////////////
// FILE: sidebar.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2019-11-14
// PURPOSE: react component for sidebar
// DEPENDENCIES: react
// STATUS: working
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
function Sidebar(props){
    return (
        <aside className={props.className ? `sidebar ${props.className}` : "sidebar"}>
            <section className="sidebar-content">
                {props.children}
            </section>
        </aside>
    )
}
export default Sidebar