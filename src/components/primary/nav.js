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
import React, { Component } from "react"
import { Link } from "gatsby"
import { links } from "./nav.json"
import "../styles/navigation-links.scss"
import HomeIcon from "../images/home"
class Nav extends Component {

    constructor(props){
        super(props);
        this.state = { data: links }
    }

    render () {
        return (
            <ul className={this.props.className ? `menu ${this.props.className}` : "menu"} aria-label="site navigation">
                {
                    // map navigation links to li and sub ui/li elements
                    this.state.data.map((parent, i) => (

                        // map parent links
                        <li className={`menu-item ${parent.name.toLowerCase()}-item`} key={i}>
                            <Link className="menu-link" to={parent.path} data-live-page={parent.name.toLowerCase()}>
                                {
                                    // add condition for if the name is home
                                    parent.name.toLowerCase() === "home"
                                        ? <HomeIcon className="menu-link-icon" />
                                        : null
                                }
                                {
                                    // print the name of the link
                                    parent.name

                                    // if there are children links to be added,
                                    // you must add them as a submenu. See
                                    // rrads-site-react project for code
                                    // and implementation
                                }
                            </Link>
                        </li>
                    ))
                }
                {
                    // in some cases (like the footer), you may need to 
                    // add additional links. Instead of creating additional
                    // elements or components you can add the links here
                    this.props.children
                }
            </ul>
        )
    }
}
export default Nav