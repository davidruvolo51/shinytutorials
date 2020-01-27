////////////////////////////////////////////////////////////////////////////////
// FILE: section.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-26
// MODIFIED: 2020-01-27
// PURPOSE: react component for sections
// DEPENDENCIES: react
// STATUS: working
// COMMENTS: n
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
function Section(props) {
    const css = props.className
        ? props.isFullWidth ? `full-section ${props.className}` : `main-section ${props.className}`
        : props.isFullWidth ? `main-section ${props.className}` : `main-section`;
    return (
        <section className={css}>
            {
                props.isFullWidth
                ? (
                    <div className="full-section-content">
                        { props.children }
                    </div>
                )
                : props.children
            }
        </section>
    )
}
export default Section