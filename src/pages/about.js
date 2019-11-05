////////////////////////////////////////////////////////////////////////////////
// FILE: about.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-27
// MODIFIED: 2019-10-27
// PURPOSE: about page
// DEPENDENCIES: see below
// STATUS: in.progress
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"

import App from "../components/layouts/app"
import Main from "../components/layouts/main"
import Section from "../components/layouts/section"

// page
const About = (props) => {

    return (
        <App title="about" description="A collection of methods and techniques for building shiny apps" author="dcruvolo" keywords={["shiny", "shiny tutorials", "r", "shiny examples"]}>
            <Main style={{padding: "72px 0"}}>
				<Section aria-label="about">
					<h2>About the tutorials</h2>
					<p>In my early days of learning shiny, I kept a document of all my tips and tricks. It worked nicely, but it quickly became too cluttered and scattered. I decided to create this project to organize the material in to a series of practical examples and templates available for the wider R community.</p>
					<p>My interests are in web accessibility, data visualization and communication of results, and good design practices. Many of these tutorials focus heavily on html, css, and javascript, but I will try to keep things simple and provide links for further reading. Questions are welcome!</p>
					<p>All of the available tutorials are listed below and there are more on the way. Not all demos have available on github have tutorials written and some are due for upgrades. Suggestions, comments, ideas for improvement are always warmly welcomed. Open a new issue on github at <a href="https://github.com/davidruvolo51/shinyAppTutorials">davidruvolo51/shinyAppTutorials</a>.</p>
				</Section>
            </Main>
        </App>
    )
}
export default About