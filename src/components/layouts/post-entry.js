////////////////////////////////////////////////////////////////////////////////
// FILE: post-entry.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-27
// MODIFIED: 2019-11-14
// PURPOSE: react component for post entries
// DEPENDENCIES: react
// STATUS: working
// COMMENTS:
//      The following props are used in this component
//          - id: unique it (useful for rendering posts in an interation)
//          - className: optional class names
//          - isFeature: applies css class if true 
//          - title: post title
//          - titleIsLink: render post title as link (logical) 
//          - link: link to the post (uses <Link />)
//          - abstract: summary of the post
//          - date: date the post was released
//          - keywords: an array of keywords
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
import { Link } from "gatsby"
import "../styles/post-entry.scss"
function Post(props){
    const c = props.className ? `post ${props.className}` : `post`
    const css = props.isFeature ? `${c} post-feature` : `${c} post-plain`;
    return (
        <div className={ css } aria-labelledBy={props.title} key={props.id ? props.id : null}>
            {
                props.titleIsLink
                ? (
                    <h1 id={props.title} className="post-title-link">
                        <Link to={props.link}>{props.title}</Link>
                    </h1>
                )
                : (
                    <h1 id={props.title} className="post-title">{props.title}</h1>
                )
            }
            <p className="post-desc">{props.abstract}</p>
            <ul className="post-meta" aria-label="post details">
                <li className="post-meta-item">
                    <span className="post-date">{props.date}</span>
                </li>
                <li className="post-meta-item">
                    <ul className="post-meta-tags" aria-label="post tags">
                        {
                            props.keywords.map(tag => (
                                <li key={tag}>
                                    <code className={`tag tag-${tag}`}>{tag}</code>
                                </li>
                            ))
                        }
                    </ul>
                </li>
            </ul>
            <Link to={props.link} className="post-link">Read</Link>
        </div>
    )
}
export default Post