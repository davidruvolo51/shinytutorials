////////////////////////////////////////////////////////////////////////////////
// FILE: about.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-27
// MODIFIED: 2020-01-07
// PURPOSE: about page
// DEPENDENCIES: see below
// STATUS: in.progress
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React, { Component } from "react"
import App from "../components/layouts/app"
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
class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            status: false
        }
        this.loadData = this.loadData.bind(this);
    }

    loadData() {
        fetch("https://api.github.com/users/davidruvolo51/repos")
            .then(response => {

                // handle bad responses
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject({
                        status: response.status,
                        statusText: response.statusText
                    })
                }

            }).then(data => {

                // pull currently active repos
                let raw = data.filter(d => d.name === "shinyAppTutorials" || d.name === "shinytutorials");
                const df = prepData(raw);
                this.setState({ data: df, status: true })

            }).catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        this.loadData();
    }

    ////////////////////////////////////////
    render() {
        return (
            <App title="about" description="A collection of methods and techniques for building shiny apps" author="dcruvolo" keywords={["shiny", "shiny tutorials", "r", "shiny examples"]} >
                <Main style={{ padding: "72px 0" }}>
                    <Section aria-labelledby="about-section-title">
                        <h2 id="about-section-title">About</h2>
                        <p>In my early days of learning shiny, I kept all of my notes on shiny in a single document. It worked nicely at the time, but it soon became too disorganized. I decided to structure my notes into a series of practical examples and make them available for the wider R community. This led to the development of the shiny tutorials site.</p>
                        <p>Many of the tutorials on this site were created in response to a question, experimentation, or they were developed to test a feature for use in other projects. There isn't a guiding principle for the tutorials, but tutorials tend to revolve around my interests in web accessibility, data visualization and communication of results, and good design practices. Most of the tutorials focus heavily on frontend languages (html, css, and javascript) but I will try to keep things simple and provide links for further reading.</p>
                    </Section>
                    <Section aria-labelledby="involved-section-title">
                        <h2 id="involved-section-title">Get Involved</h2>
                        <p>All of the available tutorials can be found on the tutorials page. Not all tutorials have demos available on github as some are more discussion focused. There are two repositories for this project. The <a href="https://github.com/davidruvolo51/shinytutorials">shinytutorials</a> repository is for the development of the static site (uses GatsbyJS) where all tutorials are drafted (in markdown). The <a href="https://github.com/davidruvolo51/shinyAppTutorials">shinyAppTutorials</a> repository is for developing and maintaining the example applications. Ideas for new tutorials can be found on the <a href="https://github.com/davidruvolo51/shinyAppTutorials/issues">shinyAppTutorials issues</a> page by filtering the labels for <em>Tutorial Ideas</em>.</p>
                        <p>The following table provides a summary of both repositories.</p>
                        {
                            this.state.status
                            ? datatable(this.state.data, "Repository Status")
                            : <span>There was a problem retrieving the data. Please try again later.</span>
                        }
                    </Section>
                </Main>
            </App>
        )
    }
}
export default About