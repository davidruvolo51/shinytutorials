////////////////////////////////////////////////////////////////////////////////
// FILE: article.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2020-04-22
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
function Article(props) {
    return (
        <article className={props.className ? `article ${props.className}` : "article"}>
            {
                props.abstract
                    ? (
                        <section className="article-abstract">
                            <h2>Overview</h2>
                            {props.abstract}
                        </section>
                    )
                    : null
            }
            <section className="article-body" dangerouslySetInnerHTML={{ __html: props.post }} />
            <div className="article-footer">
                <p>Keywords</p>
                {
                    props.keywords
                        ? (
                            <ul className="post-meta-tags article-tags" aria-label="post tags">
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
            </div>
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
