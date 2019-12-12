////////////////////////////////////////////////////////////////////////////////
// FILE: index.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2019-11-19
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
				<Section className="welcome-section" aria-label="introduction">
					<h2>Hello!</h2>
					<p>This site was developed to provide a series of practical examples for developing shiny applications. All of the tutorials can be found in the <Link to="/tutorials">Tutorials</Link> index and you can read more about this project on the <Link to="/about">About</Link> page. I also have some example applications in the <Link to="/gallery">Gallery</Link>. If you have any questions, checkout the github repository <a href="https://github.com/davidruvolo51/shinyAppTutorials">Shiny Tutorials</a> or tweet me <a href="https://twitter.com/dcruvolo">@dcruvolo</a>.</p>
				</Section>
				<Section className="tutorial-latest" aria-label="latest post">
					<h2>Latest Posts</h2>
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
					<Link to="tutorials" className="btn-link btn-primary btn-centered">Read More</Link>
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
