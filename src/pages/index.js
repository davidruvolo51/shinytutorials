////////////////////////////////////////////////////////////////////////////////
// FILE: index.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2020-04-22
// PURPOSE: react component for home page
// DEPENDENCIES: see below
// STATUS: working
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
import { graphql, Link } from "gatsby"

// import layout components
import App from "../components/layouts/app"
import Main from "../components/layouts/main"
import Hero from "../components/layouts/hero"
import Section from "../components/layouts/section"
import Post from "../components/layouts/post-entry"

// build component
function IndexPage(props) {

	// isolate first and second posts for ease
	const latestPost1 = props.data.allMarkdownRemark.edges[0].node
	const latestPost2 = props.data.allMarkdownRemark.edges[1].node

	// render  
	return (
		<App
			title="home"
			description="A collection of methods and techniques for building shiny apps"
			author="dcruvolo"
			keywords={["shiny", "shiny tutorials", "r", "shiny examples"]}
		>
			<Hero
				title="shinyTutorials"
				subtitle="A collection of methods and techniques for building shiny apps"
				image="dashboard"
				className="hero-style-1"
			/>
			<Main>
				<Section className="welcome-section filled-section" aria-label="introduction">
					<h2>Welcome</h2>
					<p>The <strong>shinyTutorials</strong> site is collection of examples and tips for developing shiny applications. These tutorials provide methods for moving beyond basic shiny apps to developing your own features. All of the tutorials can be found in the <Link to="/tutorials">Tutorials</Link> page. If you are interested contributing to this project, checkout the github repository <a href="https://github.com/davidruvolo51/shinyAppTutorials">Shiny Tutorials</a>.</p>
				</Section>
				<Section isFullWidth={true} className="tutorial-latest filled-section" aria-label="latest post">
					<h2>Latest Tutorials</h2>
					<p>Read the latest tutorials.</p>
					<div className="flex flex-50x2-layout">
						<Post
							isFeature={true}
							className="flex-child"
							title={latestPost1.frontmatter.title}
							link={latestPost1.fields.slug}
							linkLabel="Read"
							abstract={latestPost1.frontmatter.abstract}
							date={latestPost1.frontmatter.date}
							keywords={latestPost1.frontmatter.keywords}
							id={latestPost1.frontmatter.title}
						/>
						<Post
							isFeature={true}
							className="flex-child"
							title={latestPost2.frontmatter.title}
							link={latestPost2.fields.slug}
							linkLabel="Read"
							abstract={latestPost2.frontmatter.abstract}
							date={latestPost2.frontmatter.date}
							keywords={latestPost2.frontmatter.keywords}
							id={latestPost1.frontmatter.title}
						/>
					</div>
					<Link to="tutorials" className="btn btn-secondary btn-centered">More</Link>
				</Section>
				<Section isFullWidth={true} className="related-projects filled-section" aria-label="related projects">
					<h2>Related Projects</h2>
					<p>Take a look at other projects that I'm currently working on.</p>
					<div className="flex flex-50x2-layout">
						<Post
							isFeature={true}
							className="flex-child"
							title="Accessible Shiny"
							isExternalLink={true}
							link="https://github.com/davidruvolo51/accessibleshiny"
							linkLabel="View"
							abstract="I'm developing an R package for building web accessible shiny applications."
							keywords={["pkg"]}
							id="project-r-accessibleshiny"
						/>
						<Post
							isFeature={true}
							className="flex-child"
							title="browsertools"
							isExternalLink={true}
							link="https://github.com/davidruvolo51/browsertools"
							linkLabel="View"
							abstract="I am working on bundling JavaScript handlers into a package for use in shiny apps."
							keywords={["pkg"]}
							id="project-r-browsertools"
						/>
					</div>
				</Section>
			</Main>
		</App>
	)
}
export default IndexPage


// define query
export const latestPosts = graphql`
query RecentPosts {
	allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, limit: 2) {
	  edges {
		node {
		  fields {
			slug
		  }
		  frontmatter {
			abstract
			date
			title
			keywords
		  }
		}
	  }
	}
  }  
`
