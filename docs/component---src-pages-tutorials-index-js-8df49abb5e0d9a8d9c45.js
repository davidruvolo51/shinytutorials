(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"+Ihm":function(e,t,a){"use strict";var n=a("q1tI"),r=a.n(n);t.a=function(e){return r.a.createElement("header",{className:e.className?"hero hero-text "+e.className:"hero hero-text"},r.a.createElement("div",{className:"hero-content"},r.a.createElement("h1",null,e.title),e.subtitle?r.a.createElement("h2",null,e.subtitle):null,e.text?r.a.createElement("p",{className:"hero-text"},e.text):null))}},AMML:function(e,t,a){"use strict";a("tUrg");var n=a("q1tI"),r=a.n(n),l=a("Wbzz");t.a=function(e){var t=e.className?"post "+e.className:"post",a=e.isFeature?t+" post-feature":t+" post-plain";return r.a.createElement("div",{className:a,"aria-labelledby":e.title,key:e.id?e.id:null},e.img?r.a.createElement("div",{className:"post-image",style:{backgroundImage:"url("+e.img+")",height:""+(e.imgHeight?e.imgHeight:"250px")}}):null,e.titleIsLink?r.a.createElement("h3",{id:e.title,className:"post-title-link"},r.a.createElement(l.Link,{to:e.link},e.title)):r.a.createElement("h3",{id:e.title,className:"post-title"},e.title),e.date?r.a.createElement("time",{className:"post-date"},e.date):null,r.a.createElement("p",{className:"post-desc"},e.abstract),e.keywords?r.a.createElement("ul",{className:"post-tags","aria-label":"post tags"},e.keywords.map((function(e,t){return r.a.createElement("li",{key:t},r.a.createElement("code",{className:"tag tag-"+e},e))}))):null,e.isExternalLink?r.a.createElement("a",{href:e.link,className:"post-link"},e.linkLabel):r.a.createElement(l.Link,{to:e.link,className:"post-link"},e.linkLabel))}},OGtf:function(e,t,a){var n=a("XKFU"),r=a("eeVq"),l=a("vhPU"),s=/"/g,i=function(e,t,a,n){var r=String(l(e)),i="<"+t;return""!==a&&(i+=" "+a+'="'+String(n).replace(s,"&quot;")+'"'),i+">"+r+"</"+t+">"};e.exports=function(e,t){var a={};a[e]=t(i),n(n.P+n.F*r((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3})),"String",a)}},XNiZ:function(e,t,a){"use strict";var n=a("q1tI"),r=a.n(n);t.a=function(e){return r.a.createElement("main",{id:"main",className:e.className?"main "+e.className:"main","aria-label":"main content",style:e.style?e.style:null},e.children)}},anPZ:function(e,t,a){"use strict";a.r(t),a.d(t,"MainIndex",(function(){return b}));a("f3/d"),a("a1Th"),a("rE2o"),a("ioFf"),a("Vd3H"),a("rGqo"),a("yt8O"),a("Btvt"),a("T39b"),a("XfO3"),a("HEwt");var n=a("q1tI"),r=a.n(n),l=a("TlQM"),s=a("+Ihm"),i=a("XNiZ");var c=function(e){var t=Object(n.useState)(""),a=t[0],l=t[1];return Object(n.useEffect)((function(){var e=a.toLowerCase(),t=document.querySelectorAll(".searchable");if(""===e)for(var n=0;n<t.length;n++)t[n].style.display="block";else for(var r=0;r<t.length;r++)t[r].innerHTML.toLowerCase().indexOf(e)>0?t[r].style.display="block":t[r].style.display="none"}),[a]),r.a.createElement("form",{className:"form post-form","aria-label":"search for tutorials",onSubmit:function(e){e.preventDefault()}},r.a.createElement("label",{className:"input-label",htmlFor:"search"},"Search for a Tutorial"),r.a.createElement("p",{className:"input-example"},"Search by tag, keyword, title, date. Ex: css, 2018, editing."),r.a.createElement("input",{className:"input input-select",type:"search",name:"search",id:"search",onChange:function(e){e.preventDefault(),l(e.target.value)}}))};var o=function(e){return r.a.createElement("button",{id:"reset",className:"btn btn-secondary",onClick:function(){var e=document.querySelectorAll(".btn-keyword"),t=document.querySelectorAll(".post");e.forEach((function(e){return e.classList.remove("selected")})),t.forEach((function(e){return e.style.display="block"}))}},"Reset")},u=a("AMML");function m(e){return r.a.createElement("button",{className:"btn btn-keyword",query:e.keyword,key:e.keyword,onClick:function(){!function(e){var t=e.toLowerCase(),a=document.querySelectorAll(".searchable");if(document.querySelectorAll(".btn-keyword").forEach((function(e){return e.classList.remove("selected")})),document.querySelector("*[query="+e).classList.add("selected"),""===t)for(var n=0;n<a.length;n++)a[n].style.display="block";else for(var r=0;r<a.length;r++)a[r].innerHTML.toLowerCase().indexOf(t)>0?a[r].style.display="block":a[r].style.display="none"}(e.keyword)}},e.keyword)}var d=function(e){return r.a.createElement("ul",{className:e.className?"taglist "+e.className:"taglist"},e.keywords.map((function(e,t){return r.a.createElement("li",{key:t,className:"taglist-item"},r.a.createElement(m,{key:t,keyword:e}))})))},f=a("qcgn");function y(e){return function(e){if(Array.isArray(e))return p(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return p(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(a);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return p(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}t.default=function(e){var t=e.data.allMarkdownRemark,a=Array.from(y(new Set(t.edges.map((function(e){return e.node.frontmatter.keywords})).flat().sort())));return r.a.createElement(l.a,{title:"tutorials",description:"A collection of methods and techniques for building shiny apps",author:"dcruvolo",keywords:["shiny","shiny tutorials","r","shiny examples"]},r.a.createElement(s.a,{title:"Available Tutorials",text:"Below you can find all of the available tutorials. Search for a tutorial by name, topic, date, or keyword."}),r.a.createElement(i.a,null,r.a.createElement(f.b,{className:"tutorial-index"},r.a.createElement(f.c,{className:"flex-child",title:"Filter Tutorials",caption:"Select a keyword"},r.a.createElement(d,{keywords:a}),r.a.createElement(o,null)),r.a.createElement(f.a,null,r.a.createElement(c,null),t.edges.map((function(e,t){var a=e.node;return r.a.createElement(u.a,{className:"searchable",title:a.frontmatter.title,titleIsLink:!0,link:a.fields.slug,linkLabel:"Read",abstract:a.frontmatter.abstract,date:a.frontmatter.date,keywords:a.frontmatter.keywords,id:a.frontmatter.title+"-"+t,key:t})}))))))};var b="3556729961"},qcgn:function(e,t,a){"use strict";a.d(t,"b",(function(){return l})),a.d(t,"c",(function(){return s})),a.d(t,"a",(function(){return i}));var n=a("q1tI"),r=a.n(n);function l(e){return r.a.createElement("div",{className:e.className?"sidebar-layout "+e.className:"sidebar-layout"},e.children)}function s(e){return r.a.createElement("aside",{className:e.className?"sidebar-panel "+e.className:"sidebar-panel"},r.a.createElement("section",{className:"sidebar-content"},e.title?r.a.createElement("h2",{className:"sidebar-title"},e.title):null,e.caption?r.a.createElement("p",{className:"sidebar-caption"},e.caption):null,e.children))}function i(e){return r.a.createElement("div",{className:e.className?"main-panel "+e.className:"main-panel"},e.children)}},tUrg:function(e,t,a){"use strict";a("OGtf")("link",(function(e){return function(t){return e(this,"a","href",t)}}))}}]);
//# sourceMappingURL=component---src-pages-tutorials-index-js-8df49abb5e0d9a8d9c45.js.map