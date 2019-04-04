(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{148:function(e,t,r){"use strict";r.r(t);r(175),r(157),r(88),r(57),r(38),r(177),r(82),r(159);var n=r(0),a=r.n(n),i=r(149),l=r(156),o=r(183),s=r.n(o),c=r(161),u=(r(83),r(7)),f=r.n(u),m=function(e){function t(){for(var t,r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];return(t=e.call.apply(e,[this].concat(n))||this).state={query:"",results:[]},t.handleSubmit=function(e){e.preventDefault()},t.search=function(e){var r=e.target.value,n=t.filterPostsByString(r);t.setState({results:n,query:r})},t}f()(t,e);var r=t.prototype;return r.filterPostsByString=function(e){var t=e.toLowerCase(),r=document.querySelectorAll(".post");if(""===t)for(var n=0;n<r.length;n++)r[n].style.display="block";else for(var a=0;a<r.length;a++)r[a].innerHTML.toLowerCase().indexOf(t)>0?r[a].style.display="block":r[a].style.display="none"},r.render=function(){return a.a.createElement("form",{"aria-label":"search for tutorials",onSubmit:this.handleSubmit},a.a.createElement("label",{htmlFor:"search"},"Search"),a.a.createElement("input",{type:"search",name:"search",id:"search",value:this.state.query,onChange:this.search}))},t}(n.Component),h=function(e){function t(t){var r;return(r=e.call(this,t)||this).filterByKeyword=function(e){var t=r.props.keyword;r.filterPostsByKeywordButton(t)},r.state={isActive:!1},r}f()(t,e);var r=t.prototype;return r.addActiveClass=function(){this.setState({isActive:!this.state.isActive})},r.filterPostsByKeywordButton=function(e){var t=e.toLowerCase(),r=document.querySelectorAll(".post");if(""===t)for(var n=0;n<r.length;n++)r[n].style.display="block";else for(var a=0;a<r.length;a++)r[a].innerHTML.toLowerCase().indexOf(t)>0?r[a].style.display="block":r[a].style.display="none"},r.render=function(){return a.a.createElement("button",{className:"menu-btn",key:this.props.keyword,query:this.props.keyword,onClick:this.filterByKeyword},this.props.keyword)},t}(n.Component),d=function(e){function t(){for(var t,r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];return(t=e.call.apply(e,[this].concat(n))||this).reset=function(e){t.resetForm()},t}f()(t,e);var r=t.prototype;return r.resetForm=function(){var e=document.querySelectorAll(".tutorial-nav .menu .menu-item"),t=document.querySelectorAll(".post");e.forEach(function(e){return e.classList.remove("selected")}),t.forEach(function(e){return e.style.display="block"})},r.render=function(){return a.a.createElement("button",{id:"reset",className:"reset",onClick:this.reset},"Reset filters")},t}(n.Component);r.d(t,"listQuery",function(){return p});t.default=function(e){var t=e.data.allMarkdownRemark,r=Array.from([].concat(new Set(t.edges.map(function(e){return e.node.frontmatter.keywords}).flat().sort()))[0]);return a.a.createElement(l.a,null,a.a.createElement(c.a,{title:"Home",keywords:["gatsby","application","react"]}),a.a.createElement("header",{className:"hero"},a.a.createElement("div",{className:"hero-content"},a.a.createElement("h3",null,"shinyTutorials"),a.a.createElement("h1",null,"A collection of methods and techniques for building shiny apps."),a.a.createElement(s.a,{className:"hero-image"}))),a.a.createElement("div",{className:"tutorial-block","aria-label":"tutorials: view, search, and filter tutorials"},a.a.createElement("nav",{className:"tutorial-nav tutorial-tags","aria-label":"categories: filter tutorials by a specific category"},a.a.createElement("h2",{className:"menu-title"},"Tags"),a.a.createElement("ul",{className:"menu"},r.map(function(e,t){return a.a.createElement("li",{key:e,className:"menu-item"},a.a.createElement(h,{keyword:e},e))})),a.a.createElement(d,null)),a.a.createElement("article",{className:"tutorial-list"},a.a.createElement("div",{className:"tutorial-list-content"},a.a.createElement("h2",null,"Tutorials"),a.a.createElement(m,null),t.edges.map(function(e,t){var r=e.node;return a.a.createElement("section",{className:"post","aria-label":r.frontmatter.title,key:r.frontmatter.title.toString()},a.a.createElement(i.a,{to:r.fields.slug,className:"link"},a.a.createElement("h1",{className:"post-title"},r.frontmatter.title)),a.a.createElement("p",{className:"post-desc"},r.frontmatter.abstract),a.a.createElement("span",{className:"post-date"},r.frontmatter.date),a.a.createElement("ul",{className:"post-tags-list"},r.frontmatter.keywords.map(function(e){return a.a.createElement("li",{key:e.toString()},e)})))})))))};var p="4013954936"},149:function(e,t,r){"use strict";r.d(t,"b",function(){return u});var n=r(0),a=r.n(n),i=r(4),l=r.n(i),o=r(33),s=r.n(o);r.d(t,"a",function(){return s.a});r(150);var c=a.a.createContext({}),u=function(e){return a.a.createElement(c.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):a.a.createElement("div",null,"Loading (StaticQuery)")})};u.propTypes={data:l.a.object,query:l.a.string.isRequired,render:l.a.func,children:l.a.func}},150:function(e,t,r){var n;e.exports=(n=r(152))&&n.default||n},151:function(e){e.exports={data:{site:{siteMetadata:{title:"dcrData | shinyTutorials"}}}}},152:function(e,t,r){"use strict";r.r(t);r(34);var n=r(0),a=r.n(n),i=r(4),l=r.n(i),o=r(56),s=r(2),c=function(e){var t=e.location,r=s.default.getResourcesForPathnameSync(t.pathname);return a.a.createElement(o.a,Object.assign({location:t,pageResources:r},r.json))};c.propTypes={location:l.a.shape({pathname:l.a.string.isRequired}).isRequired},t.default=c},153:function(e,t,r){var n=r(0);function a(e){return n.createElement("svg",e,n.createElement("path",{d:"M570.24 247.41L512 199.52V104a8 8 0 0 0-8-8h-32a8 8 0 0 0-7.95 7.88v56.22L323.87 45a56.06 56.06 0 0 0-71.74 0L5.76 247.41a16 16 0 0 0-2 22.54L14 282.25a16 16 0 0 0 22.53 2L64 261.69V448a32.09 32.09 0 0 0 32 32h128a32.09 32.09 0 0 0 32-32V344h64v104a32.09 32.09 0 0 0 32 32h128a32.07 32.07 0 0 0 32-31.76V261.67l27.53 22.62a16 16 0 0 0 22.53-2L572.29 270a16 16 0 0 0-2.05-22.59zM463.85 432H368V328a32.09 32.09 0 0 0-32-32h-96a32.09 32.09 0 0 0-32 32v104h-96V222.27L288 77.65l176 144.56z"}))}a.defaultProps={viewBox:"0 0 576 512"},e.exports=a,a.default=a},154:function(e,t,r){var n=r(0);function a(e){return n.createElement("svg",e,n.createElement("path",{d:"M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"}))}a.defaultProps={height:"30",width:"30",role:"img",viewBox:"0 0 24 24"},e.exports=a,a.default=a},155:function(e,t,r){var n=r(0);function a(e){return n.createElement("svg",e,n.createElement("path",{d:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"}))}a.defaultProps={height:"30",width:"30",role:"img",viewBox:"0 0 24 24"},e.exports=a,a.default=a},156:function(e,t,r){"use strict";var n=r(151),a=r(0),i=r.n(a),l=r(4),o=r.n(l),s=r(149),c=r(153),u=r.n(c),f=function(){return i.a.createElement("header",{className:"header"},i.a.createElement(s.a,{to:"/",className:"header-link"},i.a.createElement(u.a,{className:"header-icon"}),"shinyTutorials"))};f.propTypes={siteTitle:o.a.string},f.defaultProps={siteTitle:""};var m=f,h=r(154),d=r.n(h),p=r(155),y=r.n(p),k=function(e){e.siteTitle;return i.a.createElement("footer",{className:"footer"},i.a.createElement("ul",{className:"external-links"},i.a.createElement("li",{className:"link"},i.a.createElement("a",{className:"nav-link",href:"https://github.com/davidruvolo51/shinytutorials","aria-label":"github.com/davidruvolo51"},i.a.createElement(y.a,{"aria-hidden":"true"}),"View on GitHub")),i.a.createElement("li",{className:"link"},i.a.createElement("a",{className:"nav-link",href:"https://www.twitter.com/dcruvolo","aria-label":"twitter.com/dcruvolo"},i.a.createElement(d.a,{"aria-hidden":"true"}),"Follow me on twitter"))))};k.propTypes={siteTitle:o.a.string},k.defaultProps={siteTitle:""};var v=k,E=(r(144),function(e){var t=e.children;return i.a.createElement(s.b,{query:"755544856",render:function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement(m,{siteTitle:e.site.siteMetadata.title}),i.a.createElement("main",{className:"main",id:"content","aria-label":"main content"},t),i.a.createElement(v,null))},data:n})});E.propTypes={children:o.a.node.isRequired};t.a=E},157:function(e,t,r){"use strict";var n=r(12),a=r(28),i=r(26),l=r(18),o=[].sort,s=[1,2,3];n(n.P+n.F*(l(function(){s.sort(void 0)})||!l(function(){s.sort(null)})||!r(158)(o)),"Array",{sort:function(e){return void 0===e?o.call(i(this)):o.call(i(this),a(e))}})},158:function(e,t,r){"use strict";var n=r(18);e.exports=function(e,t){return!!e&&n(function(){t?e.call(null,function(){},1):e.call(null)})}},159:function(e,t,r){"use strict";var n=r(20),a=r(12),i=r(26),l=r(78),o=r(79),s=r(15),c=r(160),u=r(80);a(a.S+a.F*!r(74)(function(e){Array.from(e)}),"Array",{from:function(e){var t,r,a,f,m=i(e),h="function"==typeof this?this:Array,d=arguments.length,p=d>1?arguments[1]:void 0,y=void 0!==p,k=0,v=u(m);if(y&&(p=n(p,d>2?arguments[2]:void 0,2)),null==v||h==Array&&o(v))for(r=new h(t=s(m.length));t>k;k++)c(r,k,y?p(m[k],k):m[k]);else for(f=v.call(m),r=new h;!(a=f.next()).done;k++)c(r,k,y?l(f,p,[a.value,k],!0):a.value);return r.length=k,r}})},160:function(e,t,r){"use strict";var n=r(25),a=r(55);e.exports=function(e,t,r){t in e?n.f(e,t,a(0,r)):e[t]=r}},161:function(e,t,r){"use strict";var n=r(162),a=r(0),i=r.n(a),l=r(4),o=r.n(l),s=r(163),c=r.n(s);function u(e){var t=e.description,r=e.lang,a=e.meta,l=e.keywords,o=e.title,s=n.data.site,u=t||s.siteMetadata.description;return i.a.createElement(c.a,{htmlAttributes:{lang:r},title:o,titleTemplate:"%s | "+s.siteMetadata.title,meta:[{name:"description",content:u},{property:"og:title",content:o},{property:"og:description",content:u},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:s.siteMetadata.author},{name:"twitter:title",content:o},{name:"twitter:description",content:u}].concat(l.length>0?{name:"keywords",content:l.join(", ")}:[]).concat(a)})}u.defaultProps={lang:"en",meta:[],keywords:[]},u.propTypes={description:o.a.string,lang:o.a.string,meta:o.a.array,keywords:o.a.arrayOf(o.a.string),title:o.a.string.isRequired},t.a=u},162:function(e){e.exports={data:{site:{siteMetadata:{title:"dcrData | shinyTutorials",description:"a collection of how-to guides and demonstrations for building shiny apps",author:"@dcruvolo"}}}}},165:function(e,t,r){var n=r(35)("meta"),a=r(11),i=r(27),l=r(25).f,o=0,s=Object.isExtensible||function(){return!0},c=!r(18)(function(){return s(Object.preventExtensions({}))}),u=function(e){l(e,n,{value:{i:"O"+ ++o,w:{}}})},f=e.exports={KEY:n,NEED:!1,fastKey:function(e,t){if(!a(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!i(e,n)){if(!s(e))return"F";if(!t)return"E";u(e)}return e[n].i},getWeak:function(e,t){if(!i(e,n)){if(!s(e))return!0;if(!t)return!1;u(e)}return e[n].w},onFreeze:function(e){return c&&f.NEED&&s(e)&&!i(e,n)&&u(e),e}}},166:function(e,t,r){var n=r(11);e.exports=function(e,t){if(!n(e)||e._t!==t)throw TypeError("Incompatible receiver, "+t+" required!");return e}},175:function(e,t,r){"use strict";r(176);var n=r(5),a=r(75),i=r(19),l=/./.toString,o=function(e){r(14)(RegExp.prototype,"toString",e,!0)};r(18)(function(){return"/a/b"!=l.call({source:"a",flags:"b"})})?o(function(){var e=n(this);return"/".concat(e.source,"/","flags"in e?e.flags:!i&&e instanceof RegExp?a.call(e):void 0)}):"toString"!=l.name&&o(function(){return l.call(this)})},176:function(e,t,r){r(19)&&"g"!=/./g.flags&&r(25).f(RegExp.prototype,"flags",{configurable:!0,get:r(75)})},177:function(e,t,r){"use strict";var n=r(178),a=r(166);e.exports=r(179)("Set",function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}},{add:function(e){return n.def(a(this,"Set"),e=0===e?0:e,e)}},n)},178:function(e,t,r){"use strict";var n=r(25).f,a=r(90),i=r(81),l=r(20),o=r(76),s=r(77),c=r(58),u=r(89),f=r(87),m=r(19),h=r(165).fastKey,d=r(166),p=m?"_s":"size",y=function(e,t){var r,n=h(t);if("F"!==n)return e._i[n];for(r=e._f;r;r=r.n)if(r.k==t)return r};e.exports={getConstructor:function(e,t,r,c){var u=e(function(e,n){o(e,u,t,"_i"),e._t=t,e._i=a(null),e._f=void 0,e._l=void 0,e[p]=0,null!=n&&s(n,r,e[c],e)});return i(u.prototype,{clear:function(){for(var e=d(this,t),r=e._i,n=e._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete r[n.i];e._f=e._l=void 0,e[p]=0},delete:function(e){var r=d(this,t),n=y(r,e);if(n){var a=n.n,i=n.p;delete r._i[n.i],n.r=!0,i&&(i.n=a),a&&(a.p=i),r._f==n&&(r._f=a),r._l==n&&(r._l=i),r[p]--}return!!n},forEach:function(e){d(this,t);for(var r,n=l(e,arguments.length>1?arguments[1]:void 0,3);r=r?r.n:this._f;)for(n(r.v,r.k,this);r&&r.r;)r=r.p},has:function(e){return!!y(d(this,t),e)}}),m&&n(u.prototype,"size",{get:function(){return d(this,t)[p]}}),u},def:function(e,t,r){var n,a,i=y(e,t);return i?i.v=r:(e._l=i={i:a=h(t,!0),k:t,v:r,p:n=e._l,n:void 0,r:!1},e._f||(e._f=i),n&&(n.n=i),e[p]++,"F"!==a&&(e._i[a]=i)),e},getEntry:y,setStrong:function(e,t,r){c(e,t,function(e,r){this._t=d(e,t),this._k=r,this._l=void 0},function(){for(var e=this._k,t=this._l;t&&t.r;)t=t.p;return this._t&&(this._l=t=t?t.n:this._t._f)?u(0,"keys"==e?t.k:"values"==e?t.v:[t.k,t.v]):(this._t=void 0,u(1))},r?"entries":"values",!r,!0),f(t)}}},179:function(e,t,r){"use strict";var n=r(6),a=r(12),i=r(14),l=r(81),o=r(165),s=r(77),c=r(76),u=r(11),f=r(18),m=r(74),h=r(37),d=r(180);e.exports=function(e,t,r,p,y,k){var v=n[e],E=v,g=y?"set":"add",w=E&&E.prototype,x={},N=function(e){var t=w[e];i(w,e,"delete"==e?function(e){return!(k&&!u(e))&&t.call(this,0===e?0:e)}:"has"==e?function(e){return!(k&&!u(e))&&t.call(this,0===e?0:e)}:"get"==e?function(e){return k&&!u(e)?void 0:t.call(this,0===e?0:e)}:"add"==e?function(e){return t.call(this,0===e?0:e),this}:function(e,r){return t.call(this,0===e?0:e,r),this})};if("function"==typeof E&&(k||w.forEach&&!f(function(){(new E).entries().next()}))){var b=new E,L=b[g](k?{}:-0,1)!=b,M=f(function(){b.has(1)}),_=m(function(e){new E(e)}),S=!k&&f(function(){for(var e=new E,t=5;t--;)e[g](t,t);return!e.has(-0)});_||((E=t(function(t,r){c(t,E,e);var n=d(new v,t,E);return null!=r&&s(r,y,n[g],n),n})).prototype=w,w.constructor=E),(M||S)&&(N("delete"),N("has"),y&&N("get")),(S||L)&&N(g),k&&w.clear&&delete w.clear}else E=p.getConstructor(t,e,y,g),l(E.prototype,r),o.NEED=!0;return h(E,e),x[e]=E,a(a.G+a.W+a.F*(E!=v),x),k||p.setStrong(E,e,y),E}},180:function(e,t,r){var n=r(11),a=r(181).set;e.exports=function(e,t,r){var i,l=t.constructor;return l!==r&&"function"==typeof l&&(i=l.prototype)!==r.prototype&&n(i)&&a&&a(e,i),e}},181:function(e,t,r){var n=r(11),a=r(5),i=function(e,t){if(a(e),!n(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,n){try{(n=r(20)(Function.call,r(182).f(Object.prototype,"__proto__").set,2))(e,[]),t=!(e instanceof Array)}catch(a){t=!0}return function(e,r){return i(e,r),t?e.__proto__=r:n(e,r),e}}({},!1):void 0),check:i}},182:function(e,t,r){var n=r(86),a=r(55),i=r(36),l=r(85),o=r(27),s=r(84),c=Object.getOwnPropertyDescriptor;t.f=r(19)?c:function(e,t){if(e=i(e),t=l(t,!0),s)try{return c(e,t)}catch(r){}if(o(e,t))return a(!n.f.call(e,t),e[t])}},183:function(e,t,r){var n=r(0);function a(e){return n.createElement("svg",e,[n.createElement("rect",{className:"outlines",x:"1",y:"2",width:"298",height:"20",fill:"#fff",stroke:"#000",strokeWidth:"2px",key:0}),n.createElement("rect",{className:"outlines",x:"1",y:"21",width:"298",height:"178",fill:"#f1f1f1",stroke:"#000",strokeWidth:"2px",key:1}),n.createElement("rect",{className:"outlines",x:"22",y:"35",width:"97",height:"147.5",fill:"#fff",stroke:"#000",strokeWidth:"2px",key:2}),n.createElement("rect",{className:"outlines",x:"135",y:"35",width:"145",height:"67.5",fill:"#fff",stroke:"#000",strokeWidth:"2px",key:3}),n.createElement("rect",{className:"outlines",x:"135",y:"110",width:"145",height:"72.6",fill:"#fff",stroke:"#000",strokeWidth:"2px",key:4}),n.createElement("circle",{cx:"265",cy:"11",r:"3.5",fill:"none",stroke:"#525252",strokeWidth:"1px",key:5}),n.createElement("circle",{cx:"275",cy:"11",r:"3.5",fill:"none",stroke:"#525252",strokeWidth:"1px",key:6}),n.createElement("circle",{cx:"285",cy:"11",r:"3.5",fill:"#525252",stroke:"#525252",strokeWidth:"1px",key:7}),n.createElement("rect",{className:"header-element",x:"35",y:"50",width:"50",height:"5",stroke:"none",fill:"#252525",key:8}),n.createElement("rect",{className:"sub-element",x:"35",y:"60",width:"70",height:"5",stroke:"none",fill:"#646464",key:9}),n.createElement("rect",{className:"sub-element",x:"35",y:"70",width:"70",height:"5",stroke:"none",fill:"#646464",key:10}),n.createElement("path",{className:"header-element",stroke:"#525252",strokeWidth:"1.5px",d:"M35,100 L 105,100",key:11}),n.createElement("path",{className:"accent-element",stroke:"#d9d9d9",strokeWidth:"1.5px",d:"M35,115 L 105,115",key:12}),n.createElement("path",{className:"accent-element",stroke:"#d9d9d9",strokeWidth:"1.5px",d:"M35,130 L 105,130",key:13}),n.createElement("path",{className:"accent-element",stroke:"#d9d9d9",strokeWidth:"1.5px",d:"M35,145 L 105,145",key:14}),n.createElement("rect",{className:"header-element",x:"35",y:"92.5",width:"15",height:"3",stroke:"none",fill:"#5252525",key:15}),n.createElement("rect",{className:"header-element",x:"60",y:"92.5",width:"15",height:"3",stroke:"none",fill:"#5252525",key:16}),n.createElement("rect",{className:"header-element",x:"85",y:"92.5",width:"15",height:"3",stroke:"none",fill:"#5252525",key:17}),n.createElement("rect",{className:"sub-element",x:"35",y:"107.5",width:"15",height:"3",stroke:"none",fill:"#636363",key:18}),n.createElement("rect",{className:"sub-element",x:"35",y:"122.5",width:"15",height:"3",stroke:"none",fill:"#636363",key:19}),n.createElement("rect",{className:"sub-element",x:"35",y:"137.5",width:"15",height:"3",stroke:"none",fill:"#636363",key:20}),n.createElement("rect",{className:"sub-element",x:"35",y:"152.5",width:"15",height:"3",stroke:"none",fill:"#636363",key:21}),n.createElement("rect",{className:"sub-element",x:"60",y:"107.5",width:"15",height:"3",stroke:"none",fill:"#636363",key:22}),n.createElement("rect",{className:"sub-element",x:"60",y:"122.5",width:"15",height:"3",stroke:"none",fill:"#636363",key:23}),n.createElement("rect",{className:"sub-element",x:"60",y:"137.5",width:"15",height:"3",stroke:"none",fill:"#636363",key:24}),n.createElement("rect",{className:"sub-element",x:"60",y:"152.5",width:"15",height:"3",stroke:"none",fill:"#636363",key:25}),n.createElement("rect",{className:"sub-element",x:"85",y:"107.5",width:"15",height:"3",stroke:"none",fill:"#636363",key:26}),n.createElement("rect",{className:"sub-element",x:"85",y:"122.5",width:"15",height:"3",stroke:"none",fill:"#636363",key:27}),n.createElement("rect",{className:"sub-element",x:"85",y:"137.5",width:"15",height:"3",stroke:"none",fill:"#636363",key:28}),n.createElement("rect",{className:"sub-element",x:"85",y:"152.5",width:"15",height:"3",stroke:"none",fill:"#636363",key:29}),n.createElement("path",{className:"header-element",stroke:"#252525",strokeWidth:"1.5px",d:"M150,40 L 150,90 M150,90 270.5,90",key:30}),n.createElement("path",{className:"header-element",stroke:"#252525",strokeWidth:"1.5px",d:"M148,40.5 L 150,40.5 M148,50.5 L 150,50.5 M148,60.5 L 150,60.5 M148,70.5 L 150,70.5 M148,80.5 L 150,80.5 M148,90 L 150,90 M150,92 L 150,90 M170,92 L 170,90 M190,92 L 190,90  M210,92 L 210,90 M230,92 L 230,90 M250,92 L 250,90 M270,92 L 270,90",key:31}),n.createElement("path",{className:"primary-element",fill:"none",stroke:"#525252",strokeWidth:"2px",d:"M150,60.5 L 170,80 L 230,55 L 250,55 L 270,60",key:32}),n.createElement("path",{className:"primary-element",fill:"none",stroke:"#3E7CB1",strokeWidth:"2px",d:"M150,80.5 L 190,60.5 L 230,80.5 250,80.5 270,75.5",key:33}),n.createElement("path",{className:"header-element",stroke:"#525252",strokeWidth:"1.5px",d:"M150,119.7 L 150,170 M150,170 202.5,170",key:34}),n.createElement("path",{className:"header-element",stroke:"#525252",strokeWidth:"1.5px",d:"M148,120.5 L 150,120.5 M148,130.5 L 150,130.5 M148,140.5 L 150,140.5 M148,150.5 L 150,150.5 M148,160.5 L 150,160.5 M148,170 L 150,170",key:35}),n.createElement("rect",{className:"primary-element",x:"155",y:"129.5",width:"10",height:"40",fill:"#3E7CB1",stroke:"none",key:36}),n.createElement("rect",{className:"primary-element",x:"170",y:"149.5",width:"10",height:"20",fill:"#3E7CB1",stroke:"none",key:37}),n.createElement("rect",{className:"primary-element",x:"185",y:"139.5",width:"10",height:"30",fill:"#3E7CB1",stroke:"none",key:38}),n.createElement("path",{className:"header-element",stroke:"#525252",strokeWidth:"1.5px",d:"M222,119.7 L 222,170 M222,170 272.5,170",key:39}),n.createElement("path",{className:"header-element",stroke:"#525252",strokeWidth:"1.5px",d:"M220,120.5 L 222,120.5 M220,130.5 L 222,130.5 M220,140.5 L 222,140.5 M220,150.5 L 222,150.5 M220,160.5 L 222,160.5 M220,170 L 222,170",key:40}),n.createElement("rect",{className:"primary-element",x:"227",y:"149.5",width:"10",height:"20",fill:"#525252",stroke:"none",key:41}),n.createElement("rect",{className:"primary-element",x:"242",y:"149.5",width:"10",height:"20",fill:"#525252",stroke:"none",key:42}),n.createElement("rect",{className:"primary-element",x:"257",y:"129.5",width:"10",height:"40",fill:"#525252",stroke:"none",key:43})])}a.defaultProps={width:"300",height:"200",viewBox:"0 0 300 200"},e.exports=a,a.default=a}}]);
//# sourceMappingURL=component---src-pages-index-js-329ccfffecde36b48b4c.js.map