////////////////////////////////////////////////////////////////////////////////
// FILE: header.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2020-05-18
// PURPOSE: react component for page header, i.e., navbar
// DEPENDENCIES: react, link, home icon
// STATUS: working
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useWindowSize } from "../hooks/useWindowSize"
import Nav from "./nav"
import Lightbulb from "../images/lightbulb"

// define header component
function Header() {

	// set "is menu open" status
	const [isOpen, setOpenStatus] = useState(false);
	const winSize = useWindowSize();
	useEffect(() => {
		if (typeof winSize !== "undefined") {
			const breakpoint = 972;
			if (winSize.width <= breakpoint) {
				setOpenStatus(false)
			}
		}
	}, [winSize])

	// theme
	const [isDark, setDark] = useLocalStorage("loadDarkTheme", false);
	useEffect(() => {
		if (typeof isDark !== "undefined") {
			if (isDark) {
				document.getElementsByTagName("body")[0].setAttribute("data-theme", "dark")
			} else {
				document.getElementsByTagName("body")[0].setAttribute("data-theme", "light")
			}
		}
	}, [isDark])

	return (
		<nav className="nav" role="navigation">
			<Link to="/" className="nav-item brand-link">shinyTutorials</Link>
			<Nav className={`nav-item navigation ${isOpen ? "expanded" : ""}`} />
			<ul className="nav-item menu menu-btns">
				<li className="menu-item menu-button visible">
					<button id="themeToggle" className="menu-button" onClick={() => setDark(!isDark)}>
						<span className="visually-hidden">toggle theme</span>
						<Lightbulb className="theme-icon" />
					</button>
				</li>
				<li className="menu-item menu-button">
					<button id="menuBtn" className={isOpen ? "open" : ""} aria-expanded={isOpen} onClick={() => setOpenStatus(!isOpen)}>
						<span className="visually-hidden">open or close menu</span>
						<span className="menu-icon" aria-hidden="true">
							<span className="menu-bar"></span>
							<span className="menu-bar"></span>
							<span className="menu-bar"></span>
						</span>
					</button>
				</li>
			</ul>
		</nav>
	)
}
export default Header
