(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{158:function(t,e,n){"use strict";n.r(e),n.d(e,"listQuery",function(){return f});n(169),n(86),n(57),n(39),n(179),n(81),n(171);var r=n(0),a=n.n(r),o=n(162),i=n(164),s=n(168),l=n(189),c=n(175),u=n(185);e.default=function(t){var e=t.data.allMarkdownRemark,n=Array.from([].concat(new Set(e.edges.map(function(t){return t.node.frontmatter.date}).flat().sort()))[0]),r=e.edges.filter(function(t){return t.node.frontmatter.date===n[n.length-1]})[0],f=e.edges.filter(function(t){return t.node.frontmatter.date===n[n.length-2]})[0];return a.a.createElement(i.a,{title:"home",description:"A collection of methods and techniques for building shiny apps",author:"dcruvolo",keywords:["shiny","shiny tutorials","r","shiny examples"]},a.a.createElement(l.a,{title:"shinyTutorials",subtitle:"A collection of methods and techniques for building shiny apps",image:"dashboard",className:"hero-style-1"}),a.a.createElement(s.a,null,a.a.createElement(c.a,{"aria-label":"introduction"},a.a.createElement("h2",null,"Hello!"),a.a.createElement("p",null,"This site was developed to provide a series of practical examples for developing shiny applications. All of the tutorials can be found in the ",a.a.createElement(o.a,{to:"/tutorials"},"Tutorials")," index and you can read more about this project on the ",a.a.createElement(o.a,{to:"/about"},"About")," page. If you have any questions, checkout the github repository ",a.a.createElement("a",{href:"https://github.com/davidruvolo51/shinyAppTutorials"},"Shiny Tutorials")," or tweet me ",a.a.createElement("a",{href:"https://twitter.com/dcruvolo"},"@dcruvolo"),".")),a.a.createElement(c.a,{className:"tutorial-latest","aria-label":"latest post"},a.a.createElement("h2",null,"Latest Posts"),a.a.createElement("div",{className:"flex flex-50x2-layout"},a.a.createElement(u.a,{isFeature:!0,className:"flex-child",title:r.node.frontmatter.title,link:r.node.fields.slug,abstract:r.node.frontmatter.abstract,date:r.node.frontmatter.date,keywords:r.node.frontmatter.keywords}),a.a.createElement(u.a,{isFeature:!0,className:"flex-child",title:f.node.frontmatter.title,link:f.node.fields.slug,abstract:f.node.frontmatter.abstract,date:f.node.frontmatter.date,keywords:f.node.frontmatter.keywords})),a.a.createElement(o.a,{to:"tutorials",className:"btn-link btn-primary btn-centered"},"Read More"))))};var f="4241206076"},168:function(t,e,n){"use strict";var r=n(0),a=n.n(r);n(151);e.a=function(t){return a.a.createElement("main",{id:"main",className:t.className?"main "+t.className:"main","aria-label":"main content",style:t.style?t.style:null},t.children)}},169:function(t,e,n){"use strict";var r=n(12),a=n(28),o=n(26),i=n(18),s=[].sort,l=[1,2,3];r(r.P+r.F*(i(function(){l.sort(void 0)})||!i(function(){l.sort(null)})||!n(170)(s)),"Array",{sort:function(t){return void 0===t?s.call(o(this)):s.call(o(this),a(t))}})},170:function(t,e,n){"use strict";var r=n(18);t.exports=function(t,e){return!!t&&r(function(){e?t.call(null,function(){},1):t.call(null)})}},171:function(t,e,n){"use strict";var r=n(19),a=n(12),o=n(26),i=n(78),s=n(79),l=n(14),c=n(172),u=n(80);a(a.S+a.F*!n(74)(function(t){Array.from(t)}),"Array",{from:function(t){var e,n,a,f,d=o(t),p="function"==typeof this?this:Array,m=arguments.length,h=m>1?arguments[1]:void 0,v=void 0!==h,y=0,E=u(d);if(v&&(h=r(h,m>2?arguments[2]:void 0,2)),null==E||p==Array&&s(E))for(n=new p(e=l(d.length));e>y;y++)c(n,y,v?h(d[y],y):d[y]);else for(f=E.call(d),n=new p;!(a=f.next()).done;y++)c(n,y,v?i(f,h,[a.value,y],!0):a.value);return n.length=y,n}})},172:function(t,e,n){"use strict";var r=n(25),a=n(55);t.exports=function(t,e,n){e in t?r.f(t,e,a(0,n)):t[e]=n}},175:function(t,e,n){"use strict";var r=n(0),a=n.n(r);e.a=function(t){return a.a.createElement("section",{className:t.className?"main-section "+t.className:"main-section"},t.children)}},176:function(t,e,n){var r=n(36)("meta"),a=n(11),o=n(27),i=n(25).f,s=0,l=Object.isExtensible||function(){return!0},c=!n(18)(function(){return l(Object.preventExtensions({}))}),u=function(t){i(t,r,{value:{i:"O"+ ++s,w:{}}})},f=t.exports={KEY:r,NEED:!1,fastKey:function(t,e){if(!a(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,r)){if(!l(t))return"F";if(!e)return"E";u(t)}return t[r].i},getWeak:function(t,e){if(!o(t,r)){if(!l(t))return!0;if(!e)return!1;u(t)}return t[r].w},onFreeze:function(t){return c&&f.NEED&&l(t)&&!o(t,r)&&u(t),t}}},177:function(t,e,n){var r=n(11);t.exports=function(t,e){if(!r(t)||t._t!==e)throw TypeError("Incompatible receiver, "+e+" required!");return t}},179:function(t,e,n){"use strict";var r=n(180),a=n(177);t.exports=n(181)("Set",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function(t){return r.def(a(this,"Set"),t=0===t?0:t,t)}},r)},180:function(t,e,n){"use strict";var r=n(25).f,a=n(88),o=n(77),i=n(19),s=n(75),l=n(76),c=n(58),u=n(87),f=n(85),d=n(20),p=n(176).fastKey,m=n(177),h=d?"_s":"size",v=function(t,e){var n,r=p(e);if("F"!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,c){var u=t(function(t,r){s(t,u,e,"_i"),t._t=e,t._i=a(null),t._f=void 0,t._l=void 0,t[h]=0,null!=r&&l(r,n,t[c],t)});return o(u.prototype,{clear:function(){for(var t=m(this,e),n=t._i,r=t._f;r;r=r.n)r.r=!0,r.p&&(r.p=r.p.n=void 0),delete n[r.i];t._f=t._l=void 0,t[h]=0},delete:function(t){var n=m(this,e),r=v(n,t);if(r){var a=r.n,o=r.p;delete n._i[r.i],r.r=!0,o&&(o.n=a),a&&(a.p=o),n._f==r&&(n._f=a),n._l==r&&(n._l=o),n[h]--}return!!r},forEach:function(t){m(this,e);for(var n,r=i(t,arguments.length>1?arguments[1]:void 0,3);n=n?n.n:this._f;)for(r(n.v,n.k,this);n&&n.r;)n=n.p},has:function(t){return!!v(m(this,e),t)}}),d&&r(u.prototype,"size",{get:function(){return m(this,e)[h]}}),u},def:function(t,e,n){var r,a,o=v(t,e);return o?o.v=n:(t._l=o={i:a=p(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=o),r&&(r.n=o),t[h]++,"F"!==a&&(t._i[a]=o)),t},getEntry:v,setStrong:function(t,e,n){c(t,e,function(t,n){this._t=m(t,e),this._k=n,this._l=void 0},function(){for(var t=this._k,e=this._l;e&&e.r;)e=e.p;return this._t&&(this._l=e=e?e.n:this._t._f)?u(0,"keys"==t?e.k:"values"==t?e.v:[e.k,e.v]):(this._t=void 0,u(1))},n?"entries":"values",!n,!0),f(e)}}},181:function(t,e,n){"use strict";var r=n(6),a=n(12),o=n(15),i=n(77),s=n(176),l=n(76),c=n(75),u=n(11),f=n(18),d=n(74),p=n(38),m=n(182);t.exports=function(t,e,n,h,v,y){var E=r[t],_=E,g=v?"set":"add",b=_&&_.prototype,k={},w=function(t){var e=b[t];o(b,t,"delete"==t?function(t){return!(y&&!u(t))&&e.call(this,0===t?0:t)}:"has"==t?function(t){return!(y&&!u(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return y&&!u(t)?void 0:e.call(this,0===t?0:t)}:"add"==t?function(t){return e.call(this,0===t?0:t),this}:function(t,n){return e.call(this,0===t?0:t,n),this})};if("function"==typeof _&&(y||b.forEach&&!f(function(){(new _).entries().next()}))){var N=new _,x=N[g](y?{}:-0,1)!=N,A=f(function(){N.has(1)}),F=d(function(t){new _(t)}),S=!y&&f(function(){for(var t=new _,e=5;e--;)t[g](e,e);return!t.has(-0)});F||((_=e(function(e,n){c(e,_,t);var r=m(new E,e,_);return null!=n&&l(n,v,r[g],r),r})).prototype=b,b.constructor=_),(A||S)&&(w("delete"),w("has"),v&&w("get")),(S||x)&&w(g),y&&b.clear&&delete b.clear}else _=h.getConstructor(e,t,v,g),i(_.prototype,n),s.NEED=!0;return p(_,t),k[t]=_,a(a.G+a.W+a.F*(_!=E),k),y||h.setStrong(_,t,v),_}},182:function(t,e,n){var r=n(11),a=n(183).set;t.exports=function(t,e,n){var o,i=e.constructor;return i!==n&&"function"==typeof i&&(o=i.prototype)!==n.prototype&&r(o)&&a&&a(t,o),t}},183:function(t,e,n){var r=n(11),a=n(5),o=function(t,e){if(a(t),!r(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,r){try{(r=n(19)(Function.call,n(184).f(Object.prototype,"__proto__").set,2))(t,[]),e=!(t instanceof Array)}catch(a){e=!0}return function(t,n){return o(t,n),e?t.__proto__=n:r(t,n),t}}({},!1):void 0),check:o}},184:function(t,e,n){var r=n(84),a=n(55),o=n(37),i=n(83),s=n(27),l=n(82),c=Object.getOwnPropertyDescriptor;e.f=n(20)?c:function(t,e){if(t=o(t),e=i(e,!0),l)try{return c(t,e)}catch(n){}if(s(t,e))return a(!r.f.call(t,e),t[e])}},185:function(t,e,n){"use strict";n(186);var r=n(0),a=n.n(r),o=n(162);n(152);e.a=function(t){var e=t.className?"post "+t.className:"post",n=t.isFeature?e+" post-feature":e+" post-plain";return a.a.createElement("div",{className:n,"aria-labelledBy":t.title,key:t.id?t.id:null},t.titleIsLink?a.a.createElement("h1",{id:t.title,className:"post-title-link"},a.a.createElement(o.a,{to:t.link},t.title)):a.a.createElement("h1",{id:t.title,className:"post-title"},t.title),a.a.createElement("p",{className:"post-desc"},t.abstract),a.a.createElement("ul",{className:"post-meta","aria-label":"post details"},a.a.createElement("li",{className:"post-meta-item"},a.a.createElement("span",{className:"post-date"},t.date)),a.a.createElement("li",{className:"post-meta-item"},a.a.createElement("ul",{className:"post-meta-tags","aria-label":"post tags"},t.keywords.map(function(t){return a.a.createElement("li",{key:t},a.a.createElement("code",{className:"tag tag-"+t},t))})))),a.a.createElement(o.a,{to:t.link,className:"post-link"},"Read"))}},186:function(t,e,n){"use strict";n(187)("link",function(t){return function(e){return t(this,"a","href",e)}})},187:function(t,e,n){var r=n(12),a=n(18),o=n(21),i=/"/g,s=function(t,e,n,r){var a=String(o(t)),s="<"+e;return""!==n&&(s+=" "+n+'="'+String(r).replace(i,"&quot;")+'"'),s+">"+a+"</"+e+">"};t.exports=function(t,e){var n={};n[t]=e(s),r(r.P+r.F*a(function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}),"String",n)}}}]);
//# sourceMappingURL=component---src-pages-index-js-83d32bdb1350ea7fc384.js.map