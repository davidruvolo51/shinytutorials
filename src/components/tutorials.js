////////////////////////////////////////////////////////////////////////////////
// FILE: tutorials.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2019-11-19
// PURPOSE: layout component for tutorials
// DEPENDENCIES: see below
// STATUS: in.progress
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
import { graphql } from "gatsby"
import App from "../components/layouts/app"
import Main from "../components/layouts/main"
import Article from "../components/layouts/article"
function BlogPost(props) {

  // define data
  const post = props.data.markdownRemark;
  const keywords = Array.from([post.frontmatter.keywords.sort()][0]);

  // render
  return (
    <App title={post.frontmatter.title} description={post.frontmatter.abstract} author="dcruvolo" keywords={keywords}>
      <Main className="tutorial">
        <Article
          post={post.html}
          title={post.frontmatter.title}
          subtitle={post.frontmatter.subtitle}
          abstract={post.frontmatter.abstract}
          date={post.frontmatter.date}
          updated={post.frontmatter.updated}
          keywords={keywords}
          className="flex-child"
        />
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
