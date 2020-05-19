////////////////////////////////////////////////////////////////////////////////
// FILE: privacy.js
// AUTHOR: David Ruvolo
// CREATED: 2020-05-19
// MODIFIED: 2020-05-19
// PURPOSE: privacy page
// DEPENDENCIES: see below
// STATUS: working ; on.going
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
import React from "react"
import App from "../components/layouts/app"
import Hero from "../components/layouts/hero-alt"
import Main from "../components/layouts/main"
import Section from "../components/layouts/section"
function Privacy() {

    // data policy last updated
    const policy_updated_date = "19 May 2020";

    // page
    return (
        <App title="privacy" description="A collection of methods and techniques for building shiny apps" author="dcruvolo" keywords={["shiny", "shiny tutorials", "r", "shiny examples"]} >
            <Hero title="Privacy" text={`Effective as of ${policy_updated_date}`}/>
            <Main className="privacy-page">
                <Section aria-labelledby="privacy-title">
                    <h2 id="privacy-title">Privacy Information</h2>
                    <p>The <strong>shinyTutorials</strong> site is an open source website dedicated to providing demonstrations and examples for building <a href="https://shiny.rstudio.com">Shiny</a> applications. This purpose of this page is to inform you of how <strong>shinyTutorials</strong> uses personal data collected from you when you visit this site.</p>
                </Section>
                <Section arialabelledby="datacollected-title">
                    <h2 id="datacollected-title">Collected Data</h2>
                    <p><strong>shinyTutorials</strong> collects various data to improve the performance and usability of the site.</p>
                    <h3>Personal identifying Information</h3>
                    <p><strong>shinyTutorials</strong> does not ask for or collect any personal identifying information.</p>
                    <h3>Tracking</h3>
                    <p><strong>shinyTutorials</strong> uses the <a href="https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/">gastby-plugin-google-analytics</a> plugin to enable <a href="https://developers.google.com/analytics">Google Analytics</a> on this site. This is important for understanding how the site is used. This includes user-level metrics (such as page views, referring sites, device type, geographical analysis, visit duration) and site performance metrics (e.g., page load times). Data is used to understand which tutorials are more popular and how users access the site. This is useful as it helps inform how to write to tutorials, useful for improving the site, and optimizing the site for devices. Data is stored and processed by Google.</p>
                    <p>You may opt out of Google Analytics by adding the Google Analytics Opt-out Browser Add-on, enabling your browser's "Do Not Track" setting, and/or using another anti-tracking tool.</p>
                </Section>
                <Section arialabelledby="storage-title">
                    <h2 id="storage-title">Local Storage</h2>
                    <p>localStorage is a file placed on your computer created by a website that is used to store standard Internet log information and visitor behavior information. When you visit our websites, we may collect and store information from you automatically through localStorage.</p>
                    <p><strong>shinyTutorials</strong> uses localStorage to save preferences for selected theme (i.e., light or dark). This value is acccessed each time you visit the site. When the theme is changed, the value is updated in local storage. Data can be removed by clearing your browser's cache or removing data for this site. You can opt out of this feature by blocking this site from accessing localStorage in your browser's settings. However, doing so may cause the site to perform not as expected.</p>
                </Section>
                <Section>
                    <h2>Use of Data</h2>
                    <p><strong>shinyTutorials</strong> does not&mdash;a has no intention to&mdash;share or sell any user data. Data is used to understand which tutorials are more popular and how users access the site. Specifically, data is used for:</p>
                    <ul>
                        <li>Maintaining popular tutorials by updating and revising content, as well as ensuring the examples work.</li>
                        <li>Monitoring site performance to ensure delivery of content</li>
                        <li>Redesigning and Optimizing the site for all device types</li>
                    </ul>
                </Section>
                <Section arialabelledby="privacy-other-sites-title">
                    <h2 id="privacy-other-sites-title">Privacy Policies of Other Websites</h2>
                    <p><strong>shinyTutorials</strong> website contains links to other websites. Our privacy policy applies only to our website, so if you click on a link to another website, you should read their privacy policy.</p>
                </Section>
                <Section arialabelledby="changes-to-privacy-title">
                    <h2 id="changes-to-privacy-title">Changes to Privacy Policy</h2>
                    <p><strong>shinyTutorials</strong> keeps its privacy policy under regular review and places any updates on this web page. This privacy policy was last updated on {policy_updated_date}.</p>
                </Section>
                <Section>
                    <h2 id="questions-title">Questions</h2>
                    <p>Feedback or questions about this site is welcome. Open a new issue on GitHub: <a href="https://github.com/davidruvolo51/shinytutorials/issues">shinyTutorials/issues</a>.</p>
                </Section>
            </Main>
        </App>
    )
}
export default Privacy