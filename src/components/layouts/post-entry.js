////////////////////////////////////////////////////////////////////////////////
// FILE: post-entry.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-27
// MODIFIED: 2020-05-18
// PURPOSE: react component for post entries
// DEPENDENCIES: react
// STATUS: working
// COMMENTS:
//      The following props are used in this component
//          - id: unique it (useful for rendering posts in an interation)
//          - className: optional class names
//          - isFeature: applies css class if true 
//          - imagePath: a file path to the file
//          - imageAlt: text for the alt description
//          - title: post title
//          - titleIsLink: render post title as link (logical) 
//          - link: link to the post (uses <Link />)
//          - linkLabel: a string for link 
//          - abstract: summary of the post
//          - date: date the post was released
//          - keywords: an array of keywords
//          - postStatus: add a pill indicating if post is new
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

// render post component
function Post(props) {

    // process css
    const css_init = props.className ? `post ${props.className}` : `post`
    const css_type = props.isFeature ? `${css_init} post-feature` : `${css_init} post-plain`;

    // process card type


    // return component
    return (
        <div className={css_type} aria-labelledby={props.title} key={props.id ? props.id : null}>
            {
                // should an image by rendered
                props.img
                    ? (
                        <div className="post-image" style={{ backgroundImage: `url(${props.img})`, height: `${props.imgHeight ? props.imgHeight : "250px"}` }} />
                    )
                    : null
            }
            {
                // should a link be rendered
                props.titleIsLink
                    ? (
                        <h3 id={props.title} className="post-title-link">
                            <Link to={props.link}>{props.title}</Link>
                            {
                                props.postStatus
                                    ? <span className="post-status" data-value={props.postStatus}>{props.postStatus}</span>
                                    : null
                            }
                        </h3>
                    )
                    : (
                        <h3 id={props.title} className="post-title">
                            {props.title}
                            {
                                props.postStatus
                                    ? <span className="post-status" data-value={props.postStatus}>{props.postStatus}</span>
                                    : null
                            }
                        </h3>
                    )
            }
            {
                // publication date
                props.date
                    ? (
                        <time className="post-date">{props.date}</time>
                    )
                    : null
            }
            {
                props.abstract
                    ? <p className="post-desc">{props.abstract}</p>
                    : null
            }
            {
                // keywords
                props.keywords
                    ? (
                        <ul className="post-tags" aria-label="post tags">
                            {
                                props.keywords.map((tag, i) => (
                                    <li key={i}>
                                        <code className={`tag tag-${tag}`}>{tag}</code>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                    : null
            }
            {
                props.link
                    ? (
                        // some logic to determine if the input link is internal or external
                        props.isExternalLink
                            ? <a href={props.link} className="post-link">{props.linkLabel}</a>
                            : <Link to={props.link} className="post-link">{props.linkLabel}</Link>
                    )
                    : null
            }
        </div>
    )
}

// PROPS
Post.propTypes = {
    className: PropTypes.string,
    isFeature: PropTypes.bool,
    titleIsLink: PropTypes.bool,
    img: PropTypes.string,
    imgHeight: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.string,
    date: PropTypes.string,
    keywords: PropTypes.array,
    postStatus: PropTypes.string
}

// EXPORT 
export default Post