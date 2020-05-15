////////////////////////////////////////////////////////////////////////////////
// FILE: header.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2020-05-14
// PURPOSE: react component for page header, i.e., navbar
// DEPENDENCIES: react, link, home icon
// STATUS: working
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React, { useEffect } from "react"
import { Link } from "gatsby"
import { useLocalStorage } from "../hooks/useLocalStorage"
import useWindowSize from "../hooks/useWindowSize"
import Nav from "./nav"
import MenuBtn from "../elements/menuBtn"
import Lightbulb from "../images/lightbulb"


// define header component
function Header(props) {

	// window size
	const size = useWindowSize()
	useEffect(() => {
		if (size.width < 862) {
			const toggle = document.getElementById("menuBtn");
			const menu = document.querySelector(".navigation");
			menu.classList.remove("expanded");
			toggle.classList.remove("open");
			toggle.setAttribute("aria-expanded", false);
			menu.setAttribute("hidden", true);
		}
	}, [size])

	// theme
	const [isDark, setDark] = useLocalStorage("loadDarkTheme", false);
	useEffect(() => {
		if (isDark) {
			document.getElementsByTagName("body")[0].setAttribute("data-theme", "dark")
		} else {
			document.getElementsByTagName("body")[0].setAttribute("data-theme", "light")
		}
	}, [isDark])

	return (
		<nav className="nav" role="navigation">
			<Link to="/" className="nav-item brand-link">
				shinyTutorials
      			</Link>
			<Nav className="nav-item navigation" />
			<ul className="nav-item menu menu-btns">
				<li className="menu-item menu-button visible">
					<button id="themeToggle" className="menu-button" onClick={() => setDark(!isDark)}>
						<span className="visually-hidden">toggle theme</span>
						<Lightbulb className="theme-icon" />
					</button>
				</li>
				<li className="menu-item menu-button">
					<MenuBtn />
				</li>
			</ul>
		</nav>
	)
}
export default Header