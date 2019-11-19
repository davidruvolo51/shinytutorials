////////////////////////////////////////////////////////////////////////////////
// FILE: header.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2019-11-14
// PURPOSE: react component for page header, i.e., navbar
// DEPENDENCIES: react, link, home icon
// STATUS: working
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React, { Component } from "react"
import { Link } from "gatsby"
import Nav from "./nav"
import "../styles/nav.scss"
import MenuBtn from "../elements/menuBtn"
class Header extends Component {

	constructor(props) {
		super(props)
		this.___closeMenuOnResize = this.___closeMenuOnResize.bind(this);
	}

	// function: when screen is resized
	___closeMenuOnResize() {
		if (typeof window !== "undefined") {
			let breakpoint = 862;
			let width = window.innerWidth;
			if (width >= breakpoint) {
				const toggle = document.getElementById("menuBtn");
				const menu = document.querySelector(".navigation");
				menu.classList.remove("expanded");
				toggle.classList.remove("open");
				toggle.setAttribute("aria-expanded", false);
				menu.setAttribute("hidden", true);
			}
		}
	}

	// component did mount
	componentDidMount() {
		// if menu is opened and window is resized and the width is more than
		// the breakpoint defined in header.css, then close the menu (i.e., remove
		// the css class "expanded")
		window.addEventListener("resize", this.___closeMenuOnResize)
	}

	// lifecycle: will unmount
	componentWillUnmount() {
		// remove resizing listener
		window.removeEventListener("resize", this.___closeMenuOnResize);
	}

	render() {
		return (
			<nav className="nav" role="navigation">
				<Link to="/" className="nav-item brand-link">
					shinyTutorials
      			</Link>
				<Nav className="nav-item navigation" />
				<ul className="nav-item menu menu-btns" aria-label="site settings">
					<li className="menu-item menu-button">
						<MenuBtn />
					</li>
				</ul>
			</nav>
		)
	}
}
export default Header
