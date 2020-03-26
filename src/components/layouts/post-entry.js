////////////////////////////////////////////////////////////////////////////////
// FILE: post-entry.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-27
// MODIFIED: 2020-03-26
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
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import "../styles/post-entry.scss"

// process link: is it an internal or external link?
function isExternalLink(props) {

    // match for external pattern - http will catch https
    const pattern = new RegExp("http");
    if (props.link.match(pattern)) {
        return <a href={props.link} className="post-link">{props.linkLabel}</a>;
    }
    // match for internal pattern
    if (props.link[0] === "/") {
        return <Link to={props.link} className="post-link">{props.linkLabel}</Link>
    }

}

// render post component
function Post(props) {

    // process css
    const css_init = props.className ? `post ${props.className}` : `post`
    const css_type = props.isFeature ? `${css_init} post-feature` : `${css_init} post-plain`;

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
                        </h3>
                    )
                    : (
                        <h3 id={props.title} className="post-title">{props.title}</h3>
                    )
            }
            <p className="post-desc">{props.abstract}</p>
            {
                props.data || props.keywords
                    ? (
                        <ul className="post-meta" aria-label="post details">
                            {
                                props.date
                                    ? (
                                        <li className="post-meta-item">
                                            <span className="post-date">{props.date}</span>
                                        </li>
                                    )
                                    : null
                            }
                            {
                                props.keywords
                                    ? (
                                        <li className="post-meta-item">
                                            <ul className="post-meta-tags" aria-label="post tags">
                                                {
                                                    props.keywords.map((tag, i) => (
                                                        <li key={i}>
                                                            <code className={`tag tag-${tag}`}>{tag}</code>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </li>
                                    )
                                    : null
                            }
                        </ul>
                    )
                    : null
            }
            {
                // some logic to determine if the input link is internal or external
                props.link
                    ? isExternalLink(props)
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
    keywords: PropTypes.array
}

// EXPORT 
export default Post