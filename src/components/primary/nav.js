////////////////////////////////////////////////////////////////////////////////
// FILE: nav.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2020-07-01
// PURPOSE: primary navigation
// DEPENDENCIES: see below
// STATUS: working
// COMMENTS: if there are children links to be added, you must add them as a 
// submenu. See rrads-site-react project for code and implementation
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { links } from "./nav.json"
import HomeIcon from "../images/home"
function Nav(props) {

    // load data
    const [data, setData] = useState('');
    useEffect(() => {
        setData(links);
    }, [])

    // render
    return (
        <ul className={props.className ? `menu ${props.className}` : "menu"}>
            {
                data
                    ? (
                        data.map((parent, i) => {
                            return (
                                <li className={`menu-item ${parent.name.toLowerCase()}-item`} key={i}>
                                    {
                                        parent.path === "/" || parent.path === "" || parent.name === "Home"
                                        ? (
                                            <Link className="menu-link" to="/">
                                                <HomeIcon className="menu-link-icon" />
                                                {parent.name}
                                            </Link>
                                        )
                                        : (
                                            <Link className="menu-link" to={`/${parent.path}/`}>
                                                {parent.name}
                                            </Link>
                                        )

                                    }
                                </li>
                            )
                        })
                    )
                    : null
            }
            {
                props.children
                ? props.children
                : null
            }
        </ul>
    )
}
export default Nav