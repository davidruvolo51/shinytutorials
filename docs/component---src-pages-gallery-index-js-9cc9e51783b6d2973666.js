(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"+Ihm":function(e,t,a){"use strict";var s=a("q1tI"),i=a.n(s);t.a=function(e){return i.a.createElement("header",{className:e.className?"hero hero-text "+e.className:"hero hero-text"},i.a.createElement("div",{className:"hero-content"},i.a.createElement("h1",null,e.title),e.subtitle?i.a.createElement("h2",null,e.subtitle):null,e.text?i.a.createElement("p",{className:"hero-text"},e.text):null))}},"7Or9":function(e,t,a){e.exports=a.p+"static/shinyTravel-28ca012363019a0058e41e820e10ce3e.png"},AMML:function(e,t,a){"use strict";a("y7hu");var s=a("q1tI"),i=a.n(s),n=a("Wbzz");t.a=function(e){var t=e.className?"post "+e.className:"post",a=e.isFeature?t+" post-feature":t+" post-plain";return i.a.createElement("div",{className:a,"aria-labelledby":e.title,key:e.id?e.id:null},e.img?i.a.createElement("div",{className:"post-image",style:{backgroundImage:"url("+e.img+")",height:""+(e.imgHeight?e.imgHeight:"250px")}}):null,e.titleIsLink?i.a.createElement("h3",{id:e.title,className:"post-title-link"},i.a.createElement(n.Link,{to:e.link},e.title),e.postStatus?i.a.createElement("span",{className:"post-status","data-value":e.postStatus},e.postStatus):null):i.a.createElement("h3",{id:e.title,className:"post-title"},e.title,e.postStatus?i.a.createElement("span",{className:"post-status","data-value":e.postStatus},e.postStatus):null),e.date?i.a.createElement("time",{className:"post-date"},e.date):null,e.abstract?i.a.createElement("p",{className:"post-desc"},e.abstract):null,e.keywords?i.a.createElement("ul",{className:"post-tags","aria-label":"post tags"},e.keywords.map((function(e,t){return i.a.createElement("li",{key:t},i.a.createElement("code",{className:"tag tag-"+e},e))}))):null,e.link?e.isExternalLink?i.a.createElement("a",{href:e.link,className:"post-link"},e.linkLabel):i.a.createElement(n.Link,{to:e.link,className:"post-link"},e.linkLabel):null)}},XNiZ:function(e,t,a){"use strict";var s=a("q1tI"),i=a.n(s);t.a=function(e){return i.a.createElement("main",{id:"main",className:e.className?"main "+e.className:"main","aria-label":"main content",style:e.style?e.style:null},e.children)}},"pw/R":function(e,t,a){"use strict";a.r(t);var s=a("q1tI"),i=a.n(s),n=a("TlQM"),l=a("+Ihm"),r=a("XNiZ"),o=a("ywux"),c=a("AMML"),p=a("veeS"),u=a("rKId"),d=a("7Or9");t.default=function(){return i.a.createElement(n.a,{title:"gallery",description:"A collection of methods and techniques for building shiny apps",author:"dcruvolo",keywords:["shiny","shiny tutorials","r","shiny examples"]},i.a.createElement(l.a,{title:"Shiny Apps Gallery",text:"Below you can find examples of shiny applications that demonstrate some of the methods discussed in the tutorials."}),i.a.createElement(r.a,{className:"shinyapps-gallery"},i.a.createElement(o.a,{isFullWidth:!0,className:"filled-section gallery-page","aria-labelledBy":"shiny-apps-gallery-title"},i.a.createElement("h2",{id:"shiny-apps-gallery-title"},"Available Applications"),i.a.createElement(c.a,{img:d,title:"shinyTravel: My 2020 Shiny Contest Entry",abstract:"The shinyTravel app is a data-driven shiny app that provides European travel recommendations based on users' preference for visting breweries, museums, and cafes with specialty coffee. Users rate how important it is to visit these locations while traveling using a scale of Not at all important to Essential. Based on how the user rates each location type, they will receive a list of three recommended European cities. Users can limit the search to specific countries and can exclude the larger cities from the results. They can also explore all locations using an interactive map and view summarized data tables. The shinyTravel app demonstrates how to design and develop a shiny application from scratch (i.e., shiny beyond bootstrap). This app also acts as an example of how to integrate frontend development tools into shiny to optimize apps for browsers and devices.",link:"https://davidruvolo.shinyapps.io/travel-app/",linkLabel:"View App",isFeature:!0,isExternalLink:!0,keywords:["shiny-contest","d3","mapbox","user-preferences"],date:"2020-03-11",className:"shinyapp-entry"}),i.a.createElement(c.a,{img:u,title:"runneR: An application for monitoring and visualizing running data",abstract:"One day, I decided to give myself a 1-hour shiny app challenge. I decided to create a shiny app to track my daily running habits (days run, monthly summary, distance, etc.). The challenge wasn't about writting code as fast as I could within 1 hour, it was about identifying areas of dvelop that I am comfortable with and where there's room for growth. I've continued to design and add new features to this application.",link:"https://github.com/davidruvolo51/shinyAppGallery/tree/master/runneR",linkLabel:"View Code",isFeature:!0,isExternalLink:!0,keywords:["js","css","ui-modules"],date:"2019-11-15",className:"shinyapp-entry"}),i.a.createElement(c.a,{img:p,imgHeight:"300px",title:"gridID Finder",abstract:"The purpose of the GRID_ID Finder shiny app is to quickly and efficiently interact with the GRID database. The entire database is 87k+ unique institutions. Using other programs to search the entire database was painfully slow. I wanted to have a web app where I could build queries, apply filters, and search/ filter the results in order to extract a specific id. I also wanted a way to copy the results into another file. The GRID_ID Finder shiny app accomplishes this task.",link:"https://github.com/davidruvolo51/shinyAppGallery/tree/master/grid_id_finder",linkLabel:"View Code",isFeature:!0,isExternalLink:!0,keywords:["js","css"],date:"2019-11-11",className:"shinyapp-entry"}))))}},rKId:function(e,t,a){e.exports=a.p+"static/runner-63fffc679b643e11f879c9d4ff27a777.png"},"t+fG":function(e,t,a){var s=a("P8UN"),i=a("96qb"),n=a("ap2Z"),l=/"/g,r=function(e,t,a,s){var i=String(n(e)),r="<"+t;return""!==a&&(r+=" "+a+'="'+String(s).replace(l,"&quot;")+'"'),r+">"+i+"</"+t+">"};e.exports=function(e,t){var a={};a[e]=t(r),s(s.P+s.F*i((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3})),"String",a)}},veeS:function(e,t,a){e.exports=a.p+"static/gridId-6d94d008cd5c5fb333c7f343c8b1fbb9.png"},y7hu:function(e,t,a){"use strict";a("t+fG")("link",(function(e){return function(t){return e(this,"a","href",t)}}))},ywux:function(e,t,a){"use strict";var s=a("q1tI"),i=a.n(s);t.a=function(e){var t=e.className?e.isFullWidth?"full-section "+e.className:"main-section "+e.className:e.isFullWidth?"main-section "+e.className:"main-section";return i.a.createElement("section",{className:t},e.isFullWidth?i.a.createElement("div",{className:"full-section-content"},e.children):e.children)}}}]);
//# sourceMappingURL=component---src-pages-gallery-index-js-9cc9e51783b6d2973666.js.map