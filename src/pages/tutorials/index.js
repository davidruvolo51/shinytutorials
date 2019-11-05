////////////////////////////////////////////////////////////////////////////////
// FILE: tutorials.js
// AUTHOR: David Ruvolo
// CREATED: 2019-11-05
// MODIFIED: 2019-11-05
// PURPOSE: tutorials index page
// DEPENDENCIES: see below
// STATUS: in.progress
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
import { graphql } from "gatsby"

// import layout components
import App from "../../components/layouts/app"
import Hero from "../../components/layouts/hero-alt"
import Main from "../../components/layouts/main"
import Sidebar from "../../components/layouts/sidebar"
import Search from "../../components/elements/searchForm"
import Reset from "../../components/elements/resetBtn"
import TagsList from "../../components/elements/tagsList"
import Post from "../../components/layouts/post-entry"

const Tutorials = (props) => {

    // get posts data
	const postList = props.data.allMarkdownRemark;
	const keywords = Array.from([...new Set(postList.edges.map(n => n.node.frontmatter.keywords).flat().sort())][0]);

    return (
        <App
			title="tutorials"
			description="A collection of methods and techniques for building shiny apps"
			author="dcruvolo"
			keywords={["shiny", "shiny tutorials", "r", "shiny examples"]}
		>
			<Hero title="Available Tutorials" text="Below you can find all of the available tutorials. Search for a tutorial by name, topic, date, etc or filter posts by keyword."/>
			<Main>
				<div className="flex flex-30x70-layout tutorial-index">
					<Sidebar className="flex-child tutorial-index-sidebar">
						<h2 className="menu-title">Filter Posts</h2>
						<p className="menu-caption">Select a keyword</p>
						<TagsList keywords={keywords} />
						<Reset />
					</Sidebar>
					<article className="flex-child tutorial-index-posts">
						<h2>Tutorials</h2>
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

export default Tutorials

// define query
export const MainIndex = graphql`
  query MainIndex {
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