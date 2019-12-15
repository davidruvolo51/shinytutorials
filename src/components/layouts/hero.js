////////////////////////////////////////////////////////////////////////////////
// FILE: hero.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2019-12-15
// PURPOSE: react component for page heros
// DEPENDENCIES: see below
// STATUS: working
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
import PropTypes from "prop-types"
import "../styles/hero.scss"
import BarChart from "../images/barchart"
import Dashboard from "../images/dashboard"
import DashboardFail from "../images/dashboard-fail"
function Hero(props){
    return (
        <header className={ props.className ? `hero hero-index ${props.className}` : "hero hero-index"} style={props.style ? props.style : null} >
            <div className="hero-content">
                {
                    // set image
                    props.image
                    ? (
                        props.image === "barchart"
                        ? <BarChart className="hero-image" />
                        : (
                            props.image === "dashboard"
                            ? <Dashboard className="hero-image" />
                            : (
                                props.image === "dashboard-fail"
                                ? <DashboardFail className="hero-image" />
                                : null
                            )
                         )
                    )
                    : null
                }
                <h1 className="hero-title">{ props.title }</h1>
                <h2>{ props.subtitle }</h2>
                <time className="hero-date">{props.date}</time>
            </div>
        </header>
    )
}

// SET PROPS
Hero.propTypes = {
    className: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    date: PropTypes.string
}

// EXPORT
export default Hero