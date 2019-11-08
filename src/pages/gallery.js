////////////////////////////////////////////////////////////////////////////////
// FILE: gallery.js
// AUTHOR: David Ruvolo
// CREATED: 2019-11-08
// MODIFIED: 2019-11-08
// PURPOSE: react component for gallery page
// DEPENDENCIES: react
// STATUS: in.progress
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
import App from "../components/layouts/app"
import Main from "../components/layouts/main"
import Section from "../components/layouts/section"
const Gallery = () => {
    return (
        <App title="gallery" description="A collection of methods and techniques for building shiny apps" author="dcruvolo" keywords={["shiny", "shiny tutorials", "r", "shiny examples"]}>
            <Main style={{padding: "72px 0"}}>
                <Section aria-label="introduction">
                    <h2>Shiny Apps Gallery</h2>
                    <p>I'm planning to use this page as a gallery of shiny applications that demonstrate the concepts outlined in the tutorials. There are few examples available on github at <a href="https://github.com/davidruvolo51/shinyAppGallery">shinyAppGallery</a>, but these are fairly outdated. I'm currently redesigning and updating these applications (some are way overdue) so check back here soon for updates!</p>
                </Section>
            </Main>
        </App>
    )
}
export default Gallery