import PropTypes from "prop-types"
import React from "react"

import Twitter from "../images/twitter.svg"
import Github from "../images/github.svg"

const Footer = ({ siteTitle }) => (
  <footer className="footer">
    <ul className="external-links">
      <li className="link">
        <a
          className="nav-link"
          href="https://github.com/davidruvolo51/shinytutorials"
          aria-label="github.com/davidruvolo51"
        >
          <Github aria-hidden="true" />
          View on GitHub
        </a>
      </li>
      <li className="link">
        <a
          className="nav-link"
          href="https://www.twitter.com/dcruvolo"
          aria-label="twitter.com/dcruvolo"
        >
          <Twitter aria-hidden="true" />
          Follow me on twitter
        </a>
      </li>
    </ul>
  </footer>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer
