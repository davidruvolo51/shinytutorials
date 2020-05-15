////////////////////////////////////////////////////////////////////////////////
// FILE: lightbulb.js
// AUTHOR: David Ruvolo
// CREATED: 2020-05-14
// MODIFIED: 2020-05-14
// PURPOSE: lightbulb icon for theme toggle
// DEPENDENCIES: NA
// STATUS: in.rpgoress
// COMMENTS: @reference: https://github.com/sschoger/zondicons
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
function lightbulb(props) {
    return (
        <svg id="theme-toggle-icon" className={props.className ? `icon ${props.className}` : "icon"} width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <title>toggle theme</title>
            <desc>Created with Sketch.</desc>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="light-bulb" fill="#000000">
                    <path d="M11,11.8999819 C13.2822403,11.4367116 15,9.41895791 15,7 C15,4.23857625 12.7614237,2 10,2 C7.23857625,2 5,4.23857625 5,7 C5,9.41895791 6.71775968,11.4367116 9,11.8999819 L9,14 L11,14 L11,11.8999819 Z M13,13.3263688 C15.3649473,12.2029049 17,9.79239596 17,7 C17,3.13400675 13.8659932,0 10,0 C6.13400675,0 3,3.13400675 3,7 C3,9.79239596 4.63505267,12.2029049 7,13.3263688 L7,16 L13,16 L13,13.3263688 Z M7,17 L13,17 L13,18.5 C13,19.3284271 12.3349702,20 11.501424,20 L8.49857602,20 C7.67093534,20 7,19.3342028 7,18.5 L7,17 Z" id="Combined-Shape"></path>
                </g>
            </g>
        </svg>
    )
}
export default lightbulb
