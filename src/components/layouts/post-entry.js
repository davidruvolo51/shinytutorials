////////////////////////////////////////////////////////////////////////////////
// FILE: post-entry.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-27
// MODIFIED: 2019-10-27
// PURPOSE: react component for post entries
// DEPENDENCIES: react
// STATUS: in.progress
// COMMENTS: NA
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
import { Link } from "gatsby"
import "../styles/post-entry.scss"
const Post = (props) => {
    const c = props.className ? `post ${props.className}` : `post`
    const css = props.isFeature ? `${c} post-feature` : `${c} post-plain`;
    return (
        <div className={ css } aria-label={props.title} key={props.id ? props.id : null}>
            <h1 className="post-title">{props.title}</h1>
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