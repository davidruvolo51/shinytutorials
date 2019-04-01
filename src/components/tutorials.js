import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

function BlogPost(props) {
  const post = props.data.markdownRemark
  return (
    <Layout>
      <main className="main" id="content" aria-label="main content">
        <article className="tutorial-post">
          <header className="tutorial-header">
            <h1>{post.frontmatter.title}</h1>
            <p>{post.frontmatter.subtitle}</p>
            <time>{post.frontmatter.date}</time>
          </header>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </main>
    </Layout>
  )
}

export default BlogPost
export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subtitle
        excerpt
        date
        keywords
      }
    }
  }
`
