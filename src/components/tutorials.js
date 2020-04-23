////////////////////////////////////////////////////////////////////////////////
// FILE: tutorials.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2020-04-23
// PURPOSE: layout component for tutorials
// DEPENDENCIES: see below
// STATUS: in.progress
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
import { graphql } from "gatsby"
import App from "../components/layouts/app"
import Hero from "../components/layouts/hero"
import Main from "../components/layouts/main"
import { SideBarLayout, SideBarPanel, MainPanel } from "../components/layouts/sidebar"
import Article from "../components/layouts/article"
import dcruvoloImage from "../profiles/dcruvolo.jpeg"

// define profile image component
function ProfileImage(props) {
	return (
		<div className="article-profile">
			<img className="profile-img" src={props.src} alt={props.author} />
			<span className="profile-name">{props.author}</span>
		</div>
	)
}


// define blog post template
function BlogPost(props) {

	// define data
	const post = props.data.markdownRemark;
	const keywords = Array.from([post.frontmatter.keywords.sort()][0]);
	const toc = post.html.split("<!-- endexcerpt -->")[0];
	const content = post.html.split("<!-- endexcerpt -->")[1];

	// render
	return (
		<App title={post.frontmatter.title} description={`${post.frontmatter.title} ${post.frontmatter.subtitle}`} author="dcruvolo" keywords={keywords}>
			<Hero className="article-hero">
				<h1>{post.frontmatter.title}</h1>
				<h2>{post.frontmatter.subtitle}</h2>
				<p className="article-dates">Published:<time>{post.frontmatter.date}</time></p>
				{
					post.frontmatter.updated
						? (
							post.frontmatter.updated !== post.frontmatter.date
								? (
									<p className="article-dates">Updated:<time>{post.frontmatter.updated}</time></p>
								)
								: null
						)
						: null
				}
				<ProfileImage src={dcruvoloImage} author="@dcruvolo" />
			</Hero>
			<Main className="tutorial">
				<SideBarLayout>
					<SideBarPanel className="article-toc">
						<div dangerouslySetInnerHTML={{ __html: toc }} />
					</SideBarPanel>
					<MainPanel className="tutorial-body">
						<Article
							post={content}
							// title={post.frontmatter.title}
							abstract={post.frontmatter.abstract}
							date={post.frontmatter.date}
							updated={post.frontmatter.updated}
							keywords={keywords}
						/>
					</MainPanel>
				</SideBarLayout>
			</Main>
		</App>
	)
}

export default BlogPost
export const query = graphql`
  query postQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subtitle
        abstract
        date
        updated
        keywords
      }
    }
  }
`
