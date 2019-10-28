////////////////////////////////////////////////////////////////////////////////
// FILE: dashboard.js
// AUTHOR: David Ruvolo
// CREATED: 2019-10-25
// MODIFIED: 2019-10-25
// PURPOSE: react component for dashboard illustration
// DEPENDENCIES: react
// STATUS: working
// COMMENTS: N
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import React from "react"
const Dashboard = (props) => {
    return (
        <svg className={props.className ? `illustration ${props.className}` : `illustration`} width="300px" height="200px" viewBox="0 0 300 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <title>dashboard</title>
            <desc>Created with Sketch.</desc>
            <defs>
                <rect id="path-1" x="0" y="0" width="101" height="148"></rect>
                <filter x="-5.9%" y="-4.1%" width="111.9%" height="108.1%" filterUnits="objectBoundingBox" id="filter-2">
                    <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                    <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                    <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.18 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                </filter>
                <rect id="path-3" x="0" y="0" width="71" height="66"></rect>
                <filter x="-8.5%" y="-9.1%" width="116.9%" height="118.2%" filterUnits="objectBoundingBox" id="filter-4">
                    <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                    <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                    <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.18 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                </filter>
                <rect id="path-5" x="0" y="0" width="71" height="66"></rect>
                <filter x="-8.5%" y="-9.1%" width="116.9%" height="118.2%" filterUnits="objectBoundingBox" id="filter-6">
                    <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                    <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                    <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.18 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                </filter>
                <rect id="path-7" x="0" y="0" width="151" height="74"></rect>
                <filter x="-4.0%" y="-8.1%" width="107.9%" height="116.2%" filterUnits="objectBoundingBox" id="filter-8">
                    <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                    <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                    <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.18 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                </filter>
            </defs>
            <g id="dashboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect id="background" fill="#F6F6F6" x="2" y="8" width="300" height="200" rx="6"></rect>
                <g id="menubar" transform="translate(2.000000, 6.000000)">
                    <path d="M0,0 L300,0 L300,15 L0,15 Z" id="background" fill="#4E5C68"></path>
                    <circle fill="#F6F6F6" cx="35.5" cy="7.5" r="3.5"></circle>
                    <circle fill="#F6F6F6" cx="23.5" cy="7.5" r="3.5"></circle>
                    <circle fill="#55D6BE" cx="11.5" cy="7.5" r="3.5"></circle>
                </g>
                <g id="left-panel" transform="translate(20.000000, 34.000000)">
                    <g id="background">
                        <use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1"></use>
                        <use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-1"></use>
                    </g>
                    <g id="text" transform="translate(9.000000, 11.000000)">
                        <rect fill="#4E5C68" x="0" y="0" width="60" height="6"></rect>
                        <rect fill="#A3A6A8" x="0" y="13" width="78" height="4"></rect>
                        <rect fill="#A3A6A8" x="0" y="22" width="78" height="4"></rect>
                        <rect fill="#A3A6A8" x="0" y="31" width="78" height="4"></rect>
                        <rect fill="#A3A6A8" x="0" y="40" width="78" height="4"></rect>
                        <rect fill="#A3A6A8" x="0" y="49" width="78" height="4"></rect>
                        <rect fill="#A3A6A8" x="0" y="59" width="60" height="4"></rect>
                    </g>
                    <g id="table" transform="translate(8.000000, 89.000000)">
                        <rect fill="#A3A6A8" x="1" y="0" width="20" height="4"></rect>
                        <text fontFamily="Helvetica" fontSize="6" fontWeight="500" letterSpacing="0.17416665" fill="#3F454B" fillOpacity="0.8">
                            <tspan x="7" y="15">é�</tspan>
                        </text>
                        <text fontFamily="Helvetica" fontSize="6" fontWeight="500" letterSpacing="0.17416665" fill="#3F454B" fillOpacity="0.8">
                            <tspan x="7" y="27">é�</tspan>
                        </text>
                        <text fontFamily="Helvetica" fontSize="6" fontWeight="500" letterSpacing="0.17416665" fill="#3F454B" fillOpacity="0.8">
                            <tspan x="7" y="39">é�</tspan>
                        </text>
                        <rect fill="#A3A6A8" x="31" y="0" width="20" height="4"></rect>
                        <text fontFamily="Helvetica" fontSize="6" fontWeight="500" letterSpacing="0.17416665" fill="#3F454B" fillOpacity="0.8">
                            <tspan x="35" y="15">NULL</tspan>
                        </text>
                        <text fontFamily="Helvetica" fontSize="6" fontWeight="500" letterSpacing="0.17416665" fill="#3F454B" fillOpacity="0.8">
                            <tspan x="33" y="27">"23.04"</tspan>
                        </text>
                        <text fontFamily="Helvetica" fontSize="6" fontWeight="500" letterSpacing="0.17416665" fill="#3F454B" fillOpacity="0.8">
                            <tspan x="35" y="39">NULL</tspan>
                        </text>
                        <rect fill="#A3A6A8" x="61" y="0" width="20" height="4"></rect>
                        <text fontFamily="Helvetica" fontSize="6" fontWeight="500" letterSpacing="0.17416665" fill="#3F454B" fillOpacity="0.8">
                            <tspan x="62" y="15">"false"</tspan>
                        </text>
                        <text fontFamily="Helvetica" fontSize="6" fontWeight="500" letterSpacing="0.17416665" fill="#3F454B" fillOpacity="0.8">
                            <tspan x="64" y="27">éÃ¤!</tspan>
                        </text>
                        <text fontFamily="Helvetica" fontSize="6" fontWeight="500" letterSpacing="0.17416665" fill="#3F454B" fillOpacity="0.8">
                            <tspan x="64" y="39">éÃ¤!</tspan>
                        </text>
                        <line x1="1.5" y1="6.5" x2="82.5" y2="6.5" stroke="#4E5C68" strokeWidth="0.7" strokeLinecap="square"></line>
                        <line x1="1" y1="30" x2="82" y2="30" stroke="#4E5C68" strokeWidth="0.7" strokeLinecap="square"></line>
                        <line x1="1" y1="19" x2="82" y2="19" stroke="#4E5C68" strokeWidth="0.7" strokeLinecap="square"></line>
                    </g>
                </g>
                <g id="right-bottom-left-panel" transform="translate(129.000000, 116.000000)">
                    <g id="background">
                        <use fill="black" fillOpacity="1" filter="url(#filter-4)" xlinkHref="#path-3"></use>
                        <use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-3"></use>
                    </g>
                    <g id="progress-ring" transform="translate(15.000000, 6.000000)">
                        <circle stroke="#BDBDBD" strokeWidth="2" cx="21" cy="20" r="20"></circle>
                        <path d="M38,7.44053319 C33.968304,4.0754099 28.4424156,2 22.3464138,2 C10.0048302,2 0,10.5065898 0,21 C0,31.4934102 10.0048302,40 22.3464138,40" id="Path" stroke="#5177b8" strokeWidth="6"></path>
                        <text fontFamily="Helvetica" fontSize="9" fontWeight="500" letterSpacing="0.285" fill="#3F454B" fillOpacity="0.8">
                            <tspan x="10" y="25">NaN</tspan>
                        </text>
                        <text fontFamily="Helvetica" fontSize="6" fontWeight="500" letterSpacing="0.17416665" fill="#3F454B" fillOpacity="0.8">
                            <tspan x="28" y="19">�</tspan>
                        </text>
                    </g>
                    <rect fill="#A3A6A8" x="16" y="55" width="40" height="6"></rect>
                </g >
                <g id="right-bottom-right-panel" transform="translate(209.000000, 116.000000)">
                    <g>
                        <use fill="black" fillOpacity="1" filter="url(#filter-6)" xlinkHref="#path-5"></use>
                        <use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-5"></use>
                    </g >
                    <g id="progress-ring" transform="translate(15.000000, 6.000000)">
                        <circle stroke="#BDBDBD" strokeWidth="2" cx="21" cy="20" r="20"></circle>
                        <path d="M6.77741354,7.37030242 C2.59721176,10.8228712 0,15.6535505 0,21 C0,31.4934102 10.0048302,40 22.3464138,40" stroke="#218573" strokeWidth="6"></path>
                        <text fontFamily="Helvetica" fontSize="9" fontWeight="500" letterSpacing="0.285" fill="#3F454B" fillOpacity="0.8">
                            <tspan x="10" y="24">NaN</tspan>
                        </text>
                        <text fontFamily="Helvetica" fontSize="6" fontWeight="500" letterSpacing="0.17416665" fill="#3F454B" fillOpacity="0.8">
                            <tspan x="28" y="19">�</tspan>
                        </text>
                    </g>
                    <rect fill="#A3A6A8" x="16" y="55" width="40" height="6"></rect>
                </g >
                <g id="right-top-panel" transform="translate(129.000000, 34.000000)">
                    <g id="background">
                        <use fill="black" fillOpacity="1" filter="url(#filter-8)" xlinkHref="#path-7"></use>
                        <use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-7"></use>
                    </g >
                    <g id="barchart" transform="translate(3.000000, 21.000000)">
                        <text fontFamily="Helvetica" fontSize="8" fontWeight="600" letterSpacing="0.17416665" fill="#e63638" fillOpacity="0.8">
                            <tspan x="20" y="8">Error: subscript out of bounds</tspan>
                        </text>
                        <g id="y-axis" stroke="#4E5C68" strokeLinecap="square" strokeWidth="0.7">
                            <g id="ticks" transform="translate(10.000000, 0.872727)">
                                <line x1="0" y1="33.8089951" x2="3.16043636" y2="33.8089951"></line>
                                <line x1="0.210695758" y1="21.1318049" x2="3.37113212" y2="21.1318049"></line>
                                <line x1="0.210695758" y1="11.0968" x2="3.16043636" y2="11.0968"></line>
                                <line x1="0.210695758" y1="0.0548878049" x2="3.37113212" y2="0.0548878049"></line>
                            </g>
                            <line x1="-9.62717633" y1="24.0000964" x2="36.6271763" y2="24.0000964" transform="translate(13.500000, 24.000096) rotate(90.000000) translate(-13.500000, -24.000096) "></line>
                        </g>
                        <g id="x-axis" transform="translate(12.000000, 46.254545)" stroke="#4E5C68" strokeLinecap="square" strokeWidth="0.7">
                            <g id="ticks" transform="translate(7.555490, 0.241039)">
                                <line x1="108.26504" y1="0.5" x2="109.26504" y2="0.5" transform="translate(108.765040, 0.500000) rotate(90.000000) translate(-108.765040, -0.500000) "></line>
                                <line x1="98.4902056" y1="0.5" x2="99.4902056" y2="0.5" transform="translate(98.990206, 0.500000) rotate(90.000000) translate(-98.990206, -0.500000) "></line>
                                <line x1="88.7153712" y1="0.5" x2="89.7153712" y2="0.5" transform="translate(89.215371, 0.500000) rotate(90.000000) translate(-89.215371, -0.500000) "></line>
                                <line x1="78.9405368" y1="0.5" x2="79.9405368" y2="0.5" transform="translate(79.440537, 0.500000) rotate(90.000000) translate(-79.440537, -0.500000) "></line>
                                <line x1="69.1657023" y1="0.5" x2="70.1657023" y2="0.5" transform="translate(69.665702, 0.500000) rotate(90.000000) translate(-69.665702, -0.500000) "></line>
                                <line x1="59.3908679" y1="0.5" x2="60.3908679" y2="0.5" transform="translate(59.890868, 0.500000) rotate(90.000000) translate(-59.890868, -0.500000) "></line>
                                <line x1="49.6160335" y1="0.5" x2="50.6160335" y2="0.5" transform="translate(50.116033, 0.500000) rotate(90.000000) translate(-50.116033, -0.500000) "></line>
                                <line x1="39.841199" y1="0.5" x2="40.841199" y2="0.5" transform="translate(40.341199, 0.500000) rotate(90.000000) translate(-40.341199, -0.500000) "></line>
                                <line x1="30.0663646" y1="0.5" x2="31.0663646" y2="0.5" transform="translate(30.566365, 0.500000) rotate(90.000000) translate(-30.566365, -0.500000) "></line>
                                <line x1="20.2915301" y1="0.5" x2="21.2915301" y2="0.5" transform="translate(20.791530, 0.500000) rotate(90.000000) translate(-20.791530, -0.500000) "></line>
                                <line x1="10.5166957" y1="0.5" x2="11.5166957" y2="0.5" transform="translate(11.016696, 0.500000) rotate(90.000000) translate(-11.016696, -0.500000) "></line>
                                <line x1="0.741861276" y1="0.5" x2="1.74186128" y2="0.5" transform="translate(1.241861, 0.500000) rotate(90.000000) translate(-1.241861, -0.500000) "></line>
                            </g>
                            <line x1="0" y1="0.0602597403" x2="123" y2="0.0602597403"></line>
                        </g>
                    </g>
                    <rect fill="#A3A6A8" x="11" y="8" width="60" height="6"></rect>
                </g >
            </g >
        </svg >
    )
}
export default Dashboard