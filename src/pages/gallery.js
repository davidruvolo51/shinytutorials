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
import Hero from "../components/layouts/hero-alt"
import Main from "../components/layouts/main"
import Section from "../components/layouts/section"
function Gallery(props){
    return (
        <App title="gallery" description="A collection of methods and techniques for building shiny apps" author="dcruvolo" keywords={["shiny", "shiny tutorials", "r", "shiny examples"]}>
            <Hero title="Shiny Apps Gallery" text="Below you can find examples of shiny applications that demonstrate some of the methods discussed in the tutorials."/>
            <Main className="shinyapps-gallery" style={{padding: "72px 0"}}>
                <Section aria-labelledBy="shiny-apps-gallery-title">
                    <h2 id="shiny-apps-gallery-title">Available Applications</h2>
                    <p>I'm currently redesigning and updating the applications available in the <a href="https://github.com/davidruvolo51/shinyAppGallery">shinyAppGallery</a> repository (some are way overdue) so check back here soon for updates!</p>
                </Section>
            </Main>
        </App>
    )
}
export default Gallery