////////////////////////////////////////////////////////////////////////////////
// FILE: index.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2019-11-06
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
const IndexPage = (props) => {

	// get posts data
	const postList = props.data.allMarkdownRemark;
	const dates = Array.from([...new Set(postList.edges.map(n => n.node.frontmatter.date).flat().sort())][0]);
	const latestPost1 = postList.edges.filter(n => n.node.frontmatter.date === dates[dates.length - 1])[0];
	const latestPost2 = postList.edges.filter(n => n.node.frontmatter.date === dates[dates.length - 2])[0];

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
				<Section aria-label="introduction">
					<h2>Hello!</h2>
					<p>This site was developed to provide a series of practical examples for developing shiny applications. All of the tutorials can be found in the <Link to="/tutorials">Tutorials</Link> index and you can read more about this project on the <Link to="/about">About</Link> page. If you have any questions, checkout the github repository <a href="https://github.com/davidruvolo51/shinyAppTutorials">Shiny Tutorials</a> or tweet me <a href="https://twitter.com/dcruvolo">@dcruvolo</a>.</p>
				</Section>
				<Section className="tutorial-latest" aria-label="latest post">
					<h2>Latest Posts</h2>
					<div className="flex flex-50x2-layout">
						<Post
							isFeature={true}
							className="flex-child"
							title={latestPost1.node.frontmatter.title}
							link={latestPost1.node.fields.slug}
							abstract={latestPost1.node.frontmatter.abstract}
							date={latestPost1.node.frontmatter.date}
							keywords={latestPost1.node.frontmatter.keywords}
						/>
						<Post
							isFeature={true}
							className="flex-child"
							title={latestPost2.node.frontmatter.title}
							link={latestPost2.node.fields.slug}
							abstract={latestPost2.node.frontmatter.abstract}
							date={latestPost2.node.frontmatter.date}
							keywords={latestPost2.node.frontmatter.keywords}
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
export const listQuery = graphql`
  query ListQuery {
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___title, frontmatter___date] }) {
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 250)
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
