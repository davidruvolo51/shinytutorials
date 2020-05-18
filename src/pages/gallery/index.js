////////////////////////////////////////////////////////////////////////////////
// FILE: gallery.js
// AUTHOR: David Ruvolo
// CREATED: 2019-11-08
// MODIFIED: 2020-05-18
// PURPOSE: react component for gallery page
// DEPENDENCIES: react
// STATUS: in.progress
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
import App from "../../components/layouts/app"
import Hero from "../../components/layouts/hero-alt"
import Main from "../../components/layouts/main"
import Section from "../../components/layouts/section"
import Post from "../../components/layouts/post-entry"

// import images
const gridImage = require("./gridId.png");
const runnerImage = require("./runner.png");
const shinyTravelImage = require("./shinyTravel.png");

// define component
function Gallery(){
    return (
        <App title="gallery" description="A collection of methods and techniques for building shiny apps" author="dcruvolo" keywords={["shiny", "shiny tutorials", "r", "shiny examples"]}>
            <Hero title="Shiny Apps Gallery" text="Below you can find examples of shiny applications that demonstrate some of the methods discussed in the tutorials."/>
            <Main className="shinyapps-gallery">
                <Section isFullWidth={true} className="filled-section gallery-page"  aria-labelledBy="shiny-apps-gallery-title">
                    <h2 id="shiny-apps-gallery-title">Available Applications</h2>
                    <Post
                        img={shinyTravelImage}
                        title = "shinyTravel: My 2020 Shiny Contest Entry"
                        abstract="The shinyTravel app is a data-driven shiny app that provides European travel recommendations based on users' preference for visting breweries, museums, and cafes with specialty coffee. Users rate how important it is to visit these locations while traveling using a scale of Not at all important to Essential. Based on how the user rates each location type, they will receive a list of three recommended European cities. Users can limit the search to specific countries and can exclude the larger cities from the results. They can also explore all locations using an interactive map and view summarized data tables. The shinyTravel app demonstrates how to design and develop a shiny application from scratch (i.e., shiny beyond bootstrap). This app also acts as an example of how to integrate frontend development tools into shiny to optimize apps for browsers and devices."
                        link="https://davidruvolo.shinyapps.io/travel-app/"
                        linkLabel="View App"
                        isFeature={true}
                        isExternalLink = {true}
                        keywords={["shiny-contest", "d3", "mapbox", "user-preferences"]}
                        date="2020-03-11"
                        className="shinyapp-entry"
                    />
                    <Post
                        img={ runnerImage }
                        title="runneR: An application for monitoring and visualizing running data"
                        abstract="One day, I decided to give myself a 1-hour shiny app challenge. I decided to create a shiny app to track my daily running habits (days run, monthly summary, distance, etc.). The challenge wasn't about writting code as fast as I could within 1 hour, it was about identifying areas of dvelop that I am comfortable with and where there's room for growth. I've continued to design and add new features to this application."
                        link="https://github.com/davidruvolo51/shinyAppGallery/tree/master/runneR"
                        linkLabel="View Code"
                        isFeature={true}
                        isExternalLink = {true}
                        keywords={["js","css", "ui-modules"]}
                        date="2019-11-15"
                        className="shinyapp-entry"
                    />
                    <Post
                        img={ gridImage }
                        imgHeight = "300px"
                        title="gridID Finder"
                        abstract="The purpose of the GRID_ID Finder shiny app is to quickly and efficiently interact with the GRID database. The entire database is 87k+ unique institutions. Using other programs to search the entire database was painfully slow. I wanted to have a web app where I could build queries, apply filters, and search/ filter the results in order to extract a specific id. I also wanted a way to copy the results into another file. The GRID_ID Finder shiny app accomplishes this task."
                        link="https://github.com/davidruvolo51/shinyAppGallery/tree/master/grid_id_finder"
                        linkLabel="View Code"
                        isFeature={true}
                        isExternalLink = {true}
                        keywords={["js","css"]}
                        date="2019-11-11"
                        className="shinyapp-entry"
                    />
                </Section>
            </Main>
        </App>
    )
}
export default Gallery