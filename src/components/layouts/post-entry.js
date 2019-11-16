////////////////////////////////////////////////////////////////////////////////
// FILE: post-entry.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-27
// MODIFIED: 2019-11-15
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
import { Link } from "gatsby"
import "../styles/post-entry.scss"

// process link: is it an internal or external link?
function isExternalLink(string){

    // match for external pattern - http will catch https
    const pattern = new RegExp("http");
    if( string.match(pattern) ){
        return true;
    } 
    // match for internal pattern
    if( string[0] === "/" ){
        return false
    }

}


// render post component
function Post(props){

    // process css
    const c = props.className ? `post ${props.className}` : `post`
    const css = props.isFeature ? `${c} post-feature` : `${c} post-plain`;

    // return component
    return (
        <div className={ css } aria-labelledby={props.title} key={props.id ? props.id : null}>
            {
                // should an image by rendered? (make sure an alt description is provided)
                props.imagePath
                ? (
                    <img src={props.imagePath} alt={props.imageAlt} />
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
            {
                // some logic to determine if the input link is internal or external
                props.link
                ? (
                    isExternalLink(props.link)
                    ? <a href={props.link} className="post-link">{props.linkLabel}</a>
                    : <Link to={props.link} className="post-link">{props.linkLabel}</Link>
                )
                : null
            }
        </div>
    )
}
export default Post