////////////////////////////////////////////////////////////////////////////////
// FILE: nav.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2019-10-25
// PURPOSE: primary navigation
// DEPENDENCIES: see below
// STATUS: in.progress
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
import { Link } from "gatsby"
import "../styles/navigation-links.scss"
import HomeIcon from "../images/home"
const Nav = (props) => {
    return (
        <ul className={props.className ? `menu ${props.className}` : "menu"} aria-label="page navigation">
            <li className="menu-item">
                <Link to="/" className="menu-link">
                    <HomeIcon className="menu-link-icon" />
                    Home
                </Link>
            </li>
            <li className="menu-item">
                <Link to="/tutorials" className="menu-link">tutorials</Link>
            </li>
            <li className="menu-item">
                <Link to="/about" className="menu-link">about</Link>
            </li>
            {props.children}
        </ul>
    )
}
export default Nav