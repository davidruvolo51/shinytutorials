////////////////////////////////////////////////////////////////////////////////
// FILE: article.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2019-12-15
// PURPOSE: react component for tutorials, i.e. as articles
// DEPENDENCIES: see below
// STATUS: working
// COMMENTS: requirements for this component are
//      - post: the prop that contains the content
//      - date: the date the post was published
//      - updated: the date the post was updated
//      - keywords: an array of keywords, if available
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
import PropTypes from "prop-types"
import "../styles/article.scss"
function Article(props) {
    return (
        <article className={props.className ? `article ${props.className}` : "article"}>
            <header className="article-header">
                <h1>{props.title}</h1>
                <h2>{props.subtitle}</h2>
                <p>{props.abstract}</p>
                <p className="article-dates">Published:<time>{props.date}</time></p>
                {
                    props.updated
                        ? (
                            props.updated !== props.date
                            ? (
                                // console.log(props.updated, props.data)
                            <p className="article-dates">Updated:<time>{props.updated}</time></p>
                            )
                            : null
                        )
                        : null
                }
                {
                    props.keywords
                        ? (
                            <ul className="post-meta-tags" aria-label="post tags">
                                {
                                    props.keywords.map(tag => (
                                        <li key={tag}>
                                            <code className={`tag tag-${tag}`}>{tag}</code>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                        : null
                }
            </header>
            <section className="article-body" dangerouslySetInnerHTML={{ __html: props.post }} />
        </article>
    )
}

// define props
Article.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    abstract: PropTypes.string,
    date: PropTypes.string,
    updated: PropTypes.string,
    keywords: PropTypes.array
}

// export
export default Article
