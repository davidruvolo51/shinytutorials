import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Hero from "../images/dashboard.svg"
import SEO from "../components/seo"
import Search from "../components/searchForm"
import KeyWordButton from "../components/keywordButton"
import Reset from "../components/resetBtn"

const IndexPage = (props) => {

  // get posts data
  const postList = props.data.allMarkdownRemark;

  // get unique keywords
  const keywords = Array.from([...new Set(postList.edges.map(n => n.node.frontmatter.keywords).flat().sort())][0]);

  // render  
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <header className="hero">
        <div className="hero-content">
          <h3>shinyTutorials</h3>
          <h1>A collection of methods and techniques for building shiny apps.</h1>
          <Hero className="hero-image" />
        </div>
      </header>
      <div className="tutorial-block" aria-label="tutorials: view, search, and filter tutorials">
        <nav className="tutorial-nav tutorial-tags" aria-label="categories: filter tutorials by a specific category">
          <h2 className="menu-title">Tags</h2>
          <ul className="menu">
          {
            keywords.map( (key,k) => (
              <li key={key} className="menu-item">
                <KeyWordButton keyword={key}>{key}</KeyWordButton>
              </li>
            ))
          }
          </ul>
          <Reset />
        </nav>
        <article className="tutorial-list">
          <div className="tutorial-list-content">
            <h2>Tutorials</h2>
            <Search />
            {postList.edges.map(({node},i) => (
              <section className="post" aria-label={node.frontmatter.title} key={node.frontmatter.title.toString()}>
                <Link to={node.fields.slug} className="link">
                  <h1 className="post-title">{node.frontmatter.title}</h1>
                </Link>
                <p className="post-desc">{node.frontmatter.excerpt}</p>
                <span className="post-date">{node.frontmatter.date}</span>
                <ul className="post-tags-list">
                {node.frontmatter.keywords.map(tag => (
                  <li key={tag.toString()}>{tag}</li>
                ))}
                </ul>
              </section>
            ))}
          </div>
        </article>
      </div>
    </Layout>
  )
}

export default IndexPage

export const listQuery = graphql`
  query ListQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 250)
          frontmatter {
            excerpt
            date(formatString: "MMMM YYYY")
            title
            keywords
          }
        }
      }
    }
  }
`
