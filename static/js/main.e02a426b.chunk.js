(this["webpackJsonpbookclub-stats"]=this["webpackJsonpbookclub-stats"]||[]).push([[0],{84:function(e,t,s){},85:function(e,t,s){},90:function(e,t,s){"use strict";s.r(t);var n=s(0),i=s.n(n),c=s(24),a=s.n(c),o=(s(84),s(74)),r=s(75),l=(s(85),s(95)),j=s(97),b=s(98),h=s(6),d=function(e){var t=e.book;return t?Object(h.jsx)("div",{className:"Book",children:Object(h.jsx)("a",{href:t.goodreads_link,target:"_blank",children:Object(h.jsx)(l.a,{size:"small",hoverable:!0,cover:Object(h.jsx)("img",{src:t.image,alt:"Book cover"}),children:Object(h.jsx)(l.a.Meta,{title:Object(h.jsxs)("div",{children:[Object(h.jsxs)("span",{className:"Book-icon",children:["TRUE"===t.best_of&&Object(h.jsx)(j.a,{style:{color:"#c60000",marginRight:5}}),"TRUE"===t.worst_of&&Object(h.jsx)(b.a,{style:{color:"gray",marginRight:5}})]}),t.title]}),description:Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("div",{children:["by ",t.author]}),Object(h.jsx)("div",{className:"Book-year",children:t.year_published})]})})})})}):null},m=s(41),u=s(28),O=function(e){var t=e.books;return Object(h.jsx)(m.a,{className:"BookList",children:t.map((function(e,t){return Object(h.jsx)(u.a,{xs:12,sm:8,md:6,lg:4,className:"BookList-item",children:Object(h.jsx)("div",{className:"BookList-item-margin",children:Object(h.jsx)(d,{book:e},t)})},t)}))})},x=s(71),f=s(72),g=s(78),v=s(73),k=s(59),p=s(96),y=s(99),B=function(e){Object(g.a)(s,e);var t=Object(v.a)(s);function s(){var e;Object(x.a)(this,s);for(var n=arguments.length,i=new Array(n),c=0;c<n;c++)i[c]=arguments[c];return(e=t.call.apply(t,[this].concat(i))).state={visible:!1},e.showDrawer=function(){e.setState({visible:!0})},e.onClose=function(){e.setState({visible:!1})},e}return Object(f.a)(s,[{key:"render",value:function(){var e=this.props.books;return Object(h.jsxs)("div",{children:[Object(h.jsxs)(k.a,{type:"default",onClick:this.showDrawer,children:[e.length," Upcoming ",Object(h.jsx)(y.a,{})]}),Object(h.jsx)(p.a,{title:"Upcoming Books (".concat(e.length,")"),placement:"bottom",closable:!0,onClose:this.onClose,visible:this.state.visible,height:515,children:Object(h.jsx)(O,{books:e})})]})}}]),s}(i.a.Component),w=s(94),N=s(93),L=s(100),C=s(101),R=function(){var e=Object(n.useState)([]),t=Object(r.a)(e,2),s=t[0],i=t[1];Object(n.useEffect)((function(){fetch("https://sheet.best/api/sheets/aa1f111c-28d5-4803-bf7f-64a3f2295352").then((function(e){return e.json()})).then(i)}),[]);var c=s.reverse(),a=Object(o.a)(new Set(s.map((function(e){return e.year})))).filter((function(e){return!isNaN(e)})),l=s.find((function(e){return"Currently Reading"===e.year})),j=s.filter((function(e){return"Upcoming"===e.year})).reverse();return Object(h.jsxs)("div",{className:"App",children:[Object(h.jsx)(w.a,{title:Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(L.a,{}),"  Book Club"]}),subTitle:"Alive and kicking since 2015"}),Object(h.jsx)(N.a,{orientation:"left",children:Object(h.jsxs)("span",{style:{display:"inline-flex",alignItems:"center"},children:[Object(h.jsx)(C.a,{style:{marginRight:5}}),Object(h.jsx)("span",{style:{fontSize:24},children:"Currently Reading"})]})}),Object(h.jsxs)(m.a,{className:"BookList",children:[Object(h.jsx)(u.a,{xs:12,sm:8,md:6,lg:4,className:"BookList-item",children:Object(h.jsx)("div",{className:"BookList-item-margin",children:Object(h.jsx)(d,{book:l})})}),Object(h.jsx)(u.a,{xs:12,sm:8,md:6,lg:4,className:"BookList-item",children:Object(h.jsx)("div",{className:"BookList-item-margin",children:Object(h.jsx)(B,{books:j})})})]}),a.map((function(e,t){var s=c.filter((function(t){return t.year===e}));return Object(h.jsxs)("div",{children:[Object(h.jsxs)(N.a,{orientation:"left",children:[Object(h.jsxs)("span",{style:{display:"inline-flex",alignItems:"center"},children:[Object(h.jsx)(y.a,{style:{marginRight:5}}),Object(h.jsx)("span",{style:{fontSize:24},children:e})]}),Object(h.jsxs)("span",{style:{fontSize:14,color:"gray",fontWeight:"normal",marginLeft:10},children:[s.length," Books"]})]}),Object(h.jsx)(O,{books:s})]},t)}))]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(Object(h.jsx)(R,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[90,1,2]]]);
//# sourceMappingURL=main.e02a426b.chunk.js.map