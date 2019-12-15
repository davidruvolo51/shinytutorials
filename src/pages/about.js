////////////////////////////////////////////////////////////////////////////////
// FILE: about.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-27
// MODIFIED: 2019-11-14
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
                        <p>In my early days of learning shiny, I kept a document of all my tips and tricks. It worked nicely, but it quickly became too cluttered and scattered. I decided to create this project to organize the material in to a series of practical examples and templates available for the wider R community.</p>
                        <p>My interests are in web accessibility, data visualization and communication of results, and good design practices. Many of these tutorials focus heavily on html, css, and javascript, but I will try to keep things simple and provide links for further reading. Questions are welcome!</p>
                    </Section>
                    <Section aria-labelledby="involved-section-title">
                        <h2 id="involved-section-title">Get Involved</h2>
                        <p>All of the available tutorials can be found on the tutorials page and there are more on the way. Not all tutorials have demos available on github as some are more discussion focused. Suggestions, comments, ideas for improvement are always warmly welcomed.</p>
                        <p>There are two repositories for this project. The <a href="https://github.com/davidruvolo51/shinytutorials">shinytutorials</a> repository is for the development of the static site (uses GatsbyJS) and the drafting of new tutorials (in markdown). The <a href="https://github.com/davidruvolo51/shinyAppTutorials">shinyAppTutorials</a> repository is for with developing and maintaining the example applications discussed in the tutorials. Ideas for new tutorials can be found on the <a href="https://github.com/davidruvolo51/shinyAppTutorials/issues">shinyAppTutorials issues</a> page; filter the labels for <em>Tutorial Ideas</em>.</p>
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