////////////////////////////////////////////////////////////////////////////////
// FILE: about.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-27
// MODIFIED: 2020-07-01
// PURPOSE: about page
// DEPENDENCIES: see below
// STATUS: in.progress
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React, { useState, useEffect } from "react"
import App from "../components/layouts/app"
import Hero from "../components/layouts/hero-alt"
import Main from "../components/layouts/main"
import Section from "../components/layouts/section"
import datatable from "../components/elements/datatable"

// format dates
function formatTime(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    let dateTime = new Date(date);
    return dateTime.toLocaleString("en-GB", options);
}

// prep data
function prepData(data) {
    let out = [];
    for (var i = 0; i < data.length; i++) {
        out.push({
            "repo": data[i].name,
            "created": formatTime(data[i].created_at),
            "updated": formatTime(data[i].updated_at),
            "issues": data[i].open_issues_count,
            "stars": data[i].stargazers_count,
            "forks": data[i].forks_count,
        });
    }
    return out;
}


// page
function About(props) {

    // set state for data
    const [data, setData] = useState('');
    const [status, setStatus] = useState(false);

    // fetch data on page load
    useEffect(() => {
        const fetchData = async () => {
            const url = "https://api.github.com/users/davidruvolo51/repos";
            await fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw response;
                    }
                })
                .then(data => {
                    const raw = data.filter(d => d.name === "shinyAppTutorials" || d.name === "shinytutorials");
                    const df = prepData(raw);
                    setData(df);
                    setStatus(true);
                })
                .catch(error => {
                    console.error("Error in fetch:", error)
                    setStatus(false);
                })
        }
        fetchData();
    }, [])

    ////////////////////////////////////////
    return (
        <App title="about" description="A collection of methods and techniques for building shiny apps" author="dcruvolo" keywords={["shiny", "shiny tutorials", "r", "shiny examples"]} >
            <Hero title="About" text="Learn more about the shinyTutorials site and how to get involved" />
            <Main className="about-page" style={{ padding: "72px 0" }}>
                <Section aria-labelledby="about-section-title">
                    <h2 id="about-section-title">About shinyTutorials</h2>
                    <p>In my early days of learning shiny, I kept all of my notes on shiny in a single document. It worked nicely at the time, but it soon became too disorganized. I decided to structure my notes into a series of practical examples and make them available for the wider R community. This led to the development of the shiny tutorials site.</p>
                    <p>Many of the tutorials on this site were created in response to a question, experimentation, or they were developed to test a feature for use in other projects. There isn't a guiding principle for the tutorials, but tutorials tend to revolve around the following topics.</p> 
                    <ul>
                        <li>Web accessibility and design</li>
                        <li>Data visualization</li>
                        <li>Good design and coding practices</li>
                        <li>Communication of scientific results</li>
                        <li>Building custom applications and components</li>
                        <li>Experimentation with R and Web application frameworks</li>
                        <li>Anything else that I find interesting or seems like a good challenge</li>
                    </ul>
                    <p>Most of the tutorials focus heavily on frontend markup languages (html, css, and javascript), but I will try to keep things simple and provide links for further reading.</p>
                </Section>
                <Section aria-labelledby="involved-section-title">
                    <h2 id="involved-section-title">Get Involved</h2>
                    <p>All feedback and suggestions are warmly welcome. Feel free to open an issue in one of the two repos related to this project.</p>
                    <ul>
                        <li><a href="https://github.com/davidruvolo51/shinytutorials">shinytutorials</a>: this repository is for the development of this site. If you would like to help improve the site or contribute posts, then get in touch with me by opening a new issue there. The site uses <a href="https://www.gatsbyjs.org">Gatsbyjs</a> and all tutorials are written using markdown. See the README for information on how to structure posts.</li>
                        <li><a href="https://github.com/davidruvolo51/shinyAppTutorials">shinyAppTutorials</a>: this repository is for developing and maintaining the example applications discussed on this site. Ideas for new tutorials can be found on the <a href="https://github.com/davidruvolo51/shinyAppTutorials/issues">shinyAppTutorials issues</a> page by filtering the labels for <em>Tutorial Ideas</em>.</li>
                    </ul>
                    <p>Another way to get involved is tackling one of the open issues. The following table displays the current status of each repository.</p>
                    {
                        status
                        ? datatable(data, "repos", "Repository Status")
                        : <span>There was a problem retrieving the data. Please try again later.</span>
                    }
                    <p>You can also get in touch with me on twitter <a href="https://twitter.com/dcruvolo">@dcruvolo</a>.</p>
                </Section>
                <Section aria-labelledby="notes-section-title">
                    <h2 id="notes-section-title">Notes</h2>
                    <p>This section provides a running list of information about the development of the site.</p>
                    <ul>
                        <li><strong>Read Time</strong>: Read time calculations are generated using the <a href="https://www.gatsbyjs.org/packages/gatsby-remark-reading-time/">gastby-remark-reading-time</a> plugin which uses 200 words per minute as the default. Time estimations also account for code blocks.</li>
                    </ul>
                </Section>
            </Main>
        </App>
    )
}
export default About