(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{AMML:function(e,t,a){"use strict";a("tUrg");var l=a("q1tI"),i=a.n(l),n=a("Wbzz");t.a=function(e){var t=e.className?"post "+e.className:"post",a=e.isFeature?t+" post-feature":t+" post-plain";return i.a.createElement("div",{className:a,"aria-labelledby":e.title,key:e.id?e.id:null},e.img?i.a.createElement("div",{className:"post-image",style:{backgroundImage:"url("+e.img+")",height:""+(e.imgHeight?e.imgHeight:"250px")}}):null,e.titleIsLink?i.a.createElement("h3",{id:e.title,className:"post-title-link"},i.a.createElement(n.Link,{to:e.link},e.title)):i.a.createElement("h3",{id:e.title,className:"post-title"},e.title),e.date?i.a.createElement("time",{className:"post-date"},e.date):null,i.a.createElement("p",{className:"post-desc"},e.abstract),e.keywords?i.a.createElement("ul",{className:"post-tags","aria-label":"post tags"},e.keywords.map((function(e,t){return i.a.createElement("li",{key:t},i.a.createElement("code",{className:"tag tag-"+e},e))}))):null,e.isExternalLink?i.a.createElement("a",{href:e.link,className:"post-link"},e.linkLabel):i.a.createElement(n.Link,{to:e.link,className:"post-link"},e.linkLabel))}},OGtf:function(e,t,a){var l=a("XKFU"),i=a("eeVq"),n=a("vhPU"),s=/"/g,r=function(e,t,a,l){var i=String(n(e)),r="<"+t;return""!==a&&(r+=" "+a+'="'+String(l).replace(s,"&quot;")+'"'),r+">"+i+"</"+t+">"};e.exports=function(e,t){var a={};a[e]=t(r),l(l.P+l.F*i((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3})),"String",a)}},RXBc:function(e,t,a){"use strict";a.r(t),a.d(t,"latestPosts",(function(){return u}));var l=a("q1tI"),i=a.n(l),n=a("Wbzz"),s=a("TlQM"),r=a("XNiZ"),o=a("IWow"),c=a("ywux"),m=a("AMML");t.default=function(e){var t=e.data.allMarkdownRemark.edges[0].node,a=e.data.allMarkdownRemark.edges[1].node;return i.a.createElement(s.a,{title:"home",description:"A collection of methods and techniques for building shiny apps",author:"dcruvolo",keywords:["shiny","shiny tutorials","r","shiny examples"]},i.a.createElement(o.a,{title:"shinyTutorials",subtitle:"A collection of methods and techniques for building shiny apps",image:"dashboard",className:"hero-style-1"}),i.a.createElement(r.a,null,i.a.createElement(c.a,{className:"welcome-section filled-section","aria-label":"introduction"},i.a.createElement("h2",null,"Welcome"),i.a.createElement("p",null,"The ",i.a.createElement("strong",null,"shinyTutorials")," site is collection of examples and tips for developing shiny applications. These tutorials provide methods for moving beyond basic shiny apps to developing your own features. All of the tutorials can be found in the ",i.a.createElement(n.Link,{to:"/tutorials"},"Tutorials")," page. If you are interested contributing to this project, checkout the github repository ",i.a.createElement("a",{href:"https://github.com/davidruvolo51/shinyAppTutorials"},"Shiny Tutorials"),".")),i.a.createElement(c.a,{isFullWidth:!0,className:"tutorial-latest filled-section","aria-label":"latest post"},i.a.createElement("h2",null,"Latest Tutorials"),i.a.createElement("p",null,"Read the latest tutorials."),i.a.createElement("div",{className:"flex flex-50x2-layout"},i.a.createElement(m.a,{isFeature:!0,className:"flex-child",title:t.frontmatter.title,link:t.fields.slug,linkLabel:"Read",abstract:t.frontmatter.abstract,date:t.frontmatter.date,keywords:t.frontmatter.keywords,id:t.frontmatter.title}),i.a.createElement(m.a,{isFeature:!0,className:"flex-child",title:a.frontmatter.title,link:a.fields.slug,linkLabel:"Read",abstract:a.frontmatter.abstract,date:a.frontmatter.date,keywords:a.frontmatter.keywords,id:t.frontmatter.title})),i.a.createElement(n.Link,{to:"tutorials",className:"btn btn-secondary btn-centered"},"More")),i.a.createElement(c.a,{isFullWidth:!0,className:"related-projects filled-section","aria-label":"related projects"},i.a.createElement("h2",null,"Related Projects"),i.a.createElement("p",null,"Take a look at other projects that I'm currently working on."),i.a.createElement("div",{className:"flex flex-50x2-layout"},i.a.createElement(m.a,{isFeature:!0,className:"flex-child",title:"Accessible Shiny",isExternalLink:!0,link:"https://github.com/davidruvolo51/accessibleshiny",linkLabel:"View",abstract:"I'm developing an R package for building web accessible shiny applications.",keywords:["pkg"],id:"project-r-accessibleshiny"}),i.a.createElement(m.a,{isFeature:!0,className:"flex-child",title:"browsertools",isExternalLink:!0,link:"https://github.com/davidruvolo51/browsertools",linkLabel:"View",abstract:"I am working on bundling JavaScript handlers into a package for use in shiny apps.",keywords:["pkg"],id:"project-r-browsertools"})))))};var u="1287019848"},XNiZ:function(e,t,a){"use strict";var l=a("q1tI"),i=a.n(l);t.a=function(e){return i.a.createElement("main",{id:"main",className:e.className?"main "+e.className:"main","aria-label":"main content",style:e.style?e.style:null},e.children)}},tUrg:function(e,t,a){"use strict";a("OGtf")("link",(function(e){return function(t){return e(this,"a","href",t)}}))},ywux:function(e,t,a){"use strict";var l=a("q1tI"),i=a.n(l);t.a=function(e){var t=e.className?e.isFullWidth?"full-section "+e.className:"main-section "+e.className:e.isFullWidth?"main-section "+e.className:"main-section";return i.a.createElement("section",{className:t},e.isFullWidth?i.a.createElement("div",{className:"full-section-content"},e.children):e.children)}}}]);
//# sourceMappingURL=component---src-pages-index-js-d18e6422d7577ab163ab.js.map