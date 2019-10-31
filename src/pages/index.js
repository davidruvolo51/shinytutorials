////////////////////////////////////////////////////////////////////////////////
// FILE: index.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2019-10-25
// PURPOSE: react component for home page
// DEPENDENCIES: see below
// STATUS: in.progress
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN

import React from "react"
import { graphql } from "gatsby"

// import layout components
import App from "../components/layouts/app"
import Main from "../components/layouts/main"
import Hero from "../components/layouts/hero"
import Section from "../components/layouts/section"
import Sidebar from "../components/layouts/sidebar"
import Search from "../components/elements/searchForm"
import Reset from "../components/elements/resetBtn"
import TagsList from "../components/elements/tagsList"
import Post from "../components/layouts/post-entry"

// build component
const IndexPage = (props) => {

	// get posts data
	const postList = props.data.allMarkdownRemark;
	const keywords = Array.from([...new Set(postList.edges.map(n => n.node.frontmatter.keywords).flat().sort())][0]);
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
				className="hero-style-3"
			/>
			<Main>
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
				</Section>
				<div className="flex flex-30x70-layout tutorial-index">
					<Sidebar className="flex-child tutorial-index-sidebar">
						<h2 className="menu-title">Filter Posts</h2>
						<p className="menu-caption">Select a keyword</p>
						<TagsList keywords={keywords} />
						<Reset />
					</Sidebar>
					<article className="flex-child tutorial-index-posts">
						<h2>Available Tutorials</h2>
						<Search />
						{
							// map nodes -> blog post lists
							postList.edges.map(({ node }, i) => (
								<Post
									className="searchable"
									title={node.frontmatter.title}
									link={node.fields.slug}
									abstract={node.frontmatter.abstract}
									date={node.frontmatter.date}
									keywords={node.frontmatter.keywords}
									id={i}
								/>
							))
						}
					</article>
				</div>
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
