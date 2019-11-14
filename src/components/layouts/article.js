////////////////////////////////////////////////////////////////////////////////
// FILE: article.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2019-11-14
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
import "../styles/article.scss"
function Article(props){
    // date options
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    // return
    return (
        <article className={props.className ? `article ${props.className}` : "article"}>
            <header className="article-header">
                <h1>{props.title}</h1>
                <h2>{props.subtitle}</h2>
                <p>{props.abstract}</p>
                <time>{props.date}</time>
            </header>
            <section className="article-body" dangerouslySetInnerHTML={{ __html: props.post }} />
            <footer className="article-footer">
                {
                    props.date
                        ? (
                            <span className="date">published: <time>{props.date.toLocaleString("en-GB", options)}</time></span>
                        )
                        : null
                }
                {
                    props.updated
                        ? (<span className="date">updated: <time>{props.updated.toLocaleString("en-GB", options)}</time></span>)
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
            </footer>
        </article>
    )
}
export default Article
