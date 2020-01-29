////////////////////////////////////////////////////////////////////////////////
// FILE: tutorials.js
// AUTHOR: David Ruvolo
// CREATED: 2019-11-05
// MODIFIED: 2020-01-29
// PURPOSE: tutorials index page
// DEPENDENCIES: see below
// STATUS: working
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

function Tutorials(props){

    // get posts data
	const postList = props.data.allMarkdownRemark;
	const keywords = Array.from([...new Set(postList.edges.map(n => n.node.frontmatter.keywords).flat().sort())])

    return (
        <App
			title="tutorials"
			description="A collection of methods and techniques for building shiny apps"
			author="dcruvolo"
			keywords={["shiny", "shiny tutorials", "r", "shiny examples"]}
		>
			<Hero title="Available Tutorials" text="Below you can find all of the available tutorials. Search for a tutorial by name, topic, date, or keyword."/>
			<Main>
				<div className="flex flex-30x70-layout tutorial-index">
					<Sidebar className="flex-child tutorial-index-sidebar">
						<h2 className="menu-title">Filter Tutorials</h2>
						<p className="menu-caption">Select a keyword</p>
						<TagsList keywords={ keywords } />
						<Reset />
					</Sidebar>
					<article className="flex-child tutorial-index-posts">
						<Search />
						{
							// map nodes -> blog post lists
							postList.edges.map(({ node }, i) => (
								<Post
									className="searchable"
									title={node.frontmatter.title}
									titleIsLink={true}
									link={node.fields.slug}
									linkLabel="Read"
									abstract={node.frontmatter.abstract}
									date={node.frontmatter.date}
									keywords={node.frontmatter.keywords}
									id={`${node.frontmatter.title}-${i}`}
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
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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
			updated
          }
        }
      }
    }
  }
`