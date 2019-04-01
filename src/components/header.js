import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Home from "../images/home.svg"

const Header = () => (
  <header className="header">
    <Link to="/" className="header-link">
      <Home className="header-icon"/>
      shinyTutorials
    </Link>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
