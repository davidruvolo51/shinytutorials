////////////////////////////////////////////////////////////////////////////////
// FILE: footer.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2019-11-14
// PURPOSE: footer component
// DEPENDENCIES: react, footer.scss, nav, twitter icon, github icon
// STATUS: working 
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
import "../styles/footer.scss"
import Nav from "./nav"
import Twitter from "../images/twitter"
import Github from "../images/github"
function Footer(){
  return (
    <footer className="footer">
      <h2>shinyTutorials</h2>
      <Nav className="footer-menu">
        <li className="menu-item">
          <a className="menu-link" href="https://www.twitter.com/dcruvolo">
            <Twitter className="menu-link-icon" />
            @dcruvolo
          </a>
        </li>
        <li className="menu-item">
          <a className="menu-link" href="https://github.com/davidruvolo51/shinyAppTutorials">
            <Github className="menu-link-icon" />
            shinyAppTutorials
          </a>
        </li>
      </Nav>
    </footer>
  )
}
export default Footer
