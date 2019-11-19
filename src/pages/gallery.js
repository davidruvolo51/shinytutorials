////////////////////////////////////////////////////////////////////////////////
// FILE: gallery.js
// AUTHOR: David Ruvolo
// CREATED: 2019-11-08
// MODIFIED: 2019-11-19
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
import Post from "../components/layouts/post-entry"
function Gallery(){
    return (
        <App title="gallery" description="A collection of methods and techniques for building shiny apps" author="dcruvolo" keywords={["shiny", "shiny tutorials", "r", "shiny examples"]}>
            <Hero title="Shiny Apps Gallery" text="Below you can find examples of shiny applications that demonstrate some of the methods discussed in the tutorials."/>
            <Main className="shinyapps-gallery" style={{padding: "72px 0"}}>
                <Section aria-labelledBy="shiny-apps-gallery-title">
                    <h2 id="shiny-apps-gallery-title">Available Applications</h2>
                    <Post
                        title="gridID Finder"
                        abstract="The purpose of the GRID_ID Finder shiny app is to quickly and efficiently interact with the GRID database. The entire database is 87k+ unique institutions. Using other programs to search the entire datase was painfully slow. I wanted to have a web app where I could build queries, apply filters, and search/ filter the results in order to extract a specific id. I also wanted a way to copy the results into another file. The GRID_ID Finder shiny app accomplishes this task."
                        link="https://github.com/davidruvolo51/shinyAppGallery/tree/master/grid_id_finder"
                        linkLabel="View Code"
                        keywords={["js","css"]}
                        date="2019-11-11"
                        className="shinyapp-entry"
                    />
                    <Post
                        title="runneR: An application for monitoring and visualizing running data"
                        abstract="One day, I decided to give myself a 1-hour shiny app challenge. I decided to create a shiny app to track my daily running habits (days run, monthly summary, distance, etc.). The challenge wasn't about writting code as fast as I could within 1 hour, it was about identifying areas of dvelop that I am comfortable with and where there's room for growth. I've continued to design and add new features to this application."
                        link="https://github.com/davidruvolo51/shinyAppGallery/tree/master/runneR"
                        linkLabel="View Code"
                        keywords={["js","css", "ui-modules"]}
                        date="2019-11-15"
                        className="shinyapp-entry"
                    />
                </Section>
            </Main>
        </App>
    )
}
export default Gallery