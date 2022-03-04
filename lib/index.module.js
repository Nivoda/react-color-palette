import e,{useRef as t,useMemo as n,useCallback as r,useState as a,useEffect as o}from"react";function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e,t,n){return e>t?t:e<n?n:e}function i(e){if(!e.startsWith("#")){const t=document.createElement("canvas").getContext("2d");if(!t)throw new Error("2d context not supported or canvas already initialized");return t.fillStyle=e,t.fillStyle}return 4===e.length||5===e.length?e=e.split("").map(((e,t)=>t?e+e:"#")).join(""):7===e.length||9===e.length?e:"#000000"}function h(e){e=e.slice(1);const t=parseInt(e.slice(0,2),16),n=parseInt(e.slice(2,4),16),r=parseInt(e.slice(4,6),16);let a=parseInt(e.slice(6,8),16)||void 0;return a&&(a/=255),{r:t,g:n,b:r,a:a}}function d({r:e,g:t,b:n,a:r}){e/=255,t/=255,n/=255;const a=Math.max(e,t,n),o=a-Math.min(e,t,n);return{h:o?60*(a===e?(t-n)/o+(t<n?6:0):a===t?2+(n-e)/o:4+(e-t)/o):0,s:a?o/a*100:0,v:100*a,a:r}}function g({r:e,g:t,b:n,a:r}){return`#${[e,t,n,r].map(((e,t)=>void 0!==e?(t<3?e:Math.round(255*e)).toString(16).padStart(2,"0"):"")).join("")}`}function p(e,t){let n=i("#121212"),r=h(n),a=d(r);if("hex"===e){n=i(t),r=h(n),a=d(r)}else if("rgb"===e){r=t,n=g(r),a=d(r)}else if("hsv"===e){a=t,r=function({h:e,s:t,v:n,a:r}){const a=~~(e/60),o=e/60-a,l=(n/=100)*(1-(t/=100)),c=n*(1-t*o),s=n*(1-t*(1-o)),u=a%6;return{r:Math.round(255*[n,c,l,l,s,n][u]),g:Math.round(255*[s,n,n,c,l,l][u]),b:Math.round(255*[l,l,s,n,n,c][u]),a:r}}(a),n=g(r)}return{hex:n,rgb:r,hsv:a}}const m=({className:n,style:r,onChange:a,children:o})=>{const l=t(null),c=(e,t)=>{if(l.current){const{current:n}=l,{width:r,height:o,left:c,top:s}=n.getBoundingClientRect(),i=u(e.clientX-c,r,0),h=u(e.clientY-s,o,0);a({x:i,y:h}),t&&a({x:i,y:h,complete:!0})}};return e.createElement("div",{ref:l,className:n,style:r,onMouseDown:e=>{if(0!==e.button)return;c(e);const t=e=>{c(e)},n=e=>{document.removeEventListener("mousemove",t,!1),document.removeEventListener("mouseup",n,!1),c(e,!0)};document.addEventListener("mousemove",t,!1),document.addEventListener("mouseup",n,!1)}},o)},v=({width:t,color:r,onChange:a,onChangeComplete:o})=>{const l=n((()=>{var e;const n=function(e,t){return e*t}(null!==(e=r.hsv.a)&&void 0!==e?e:1,t);return n}),[r.hsv.a,t]),s=n((()=>`${r.rgb.r}, ${r.rgb.g}, ${r.rgb.b}`),[r.rgb]),u=n((()=>{var e;return`${s}, ${null!==(e=r.rgb.a)&&void 0!==e?e:1}`}),[s,r.rgb.a]),i=n((()=>-l-2),[l]);return e.createElement(m,{className:"rcp-alpha",onChange:({x:e,complete:n})=>{const l=p("hsv",c(c({},r.hsv),{},{a:e/t}));a(l),n&&o&&o(l)},style:{background:`linear-gradient(to right, rgba(${s}, 0), rgba(${s}, 1)) top left / auto auto,\n              conic-gradient(#666 0.25turn, #999 0.25turn 0.5turn, #666 0.5turn 0.75turn, #999 0.75turn) top left / 12px 12px\n              repeat`}},e.createElement("div",{className:"rcp-alpha-cursor",style:{left:l,background:`linear-gradient(to right, rgba(${u}), rgba(${u})) top left / auto auto,\n                conic-gradient(#666 0.25turn, #999 0.25turn 0.5turn, #666 0.5turn 0.75turn, #999 0.75turn) ${i}px 2px / 12px 12px\n                repeat`}}))},f=({width:t,height:r,color:a,onChange:o,onChangeComplete:l})=>{const s=n((()=>{const[e,n]=function(e,t,n){const{s:r,v:a}=e.hsv;return[r/100*t,(100-a)/100*n]}(a,t,r);return{x:e,y:n}}),[a,t,r]);return e.createElement(m,{className:"rcp-saturation",style:{height:r,backgroundColor:`hsl(${a.hsv.h}, 100%, 50%)`},onChange:({x:e,y:n,complete:s=!1})=>{const u=p("hsv",c(c({},a.hsv),{},{s:e/t*100,v:100-n/r*100}));o(u),s&&l&&l(u)}},e.createElement("div",{className:"rcp-saturation-cursor",style:{left:s.x,top:s.y,backgroundColor:a.hex}}))},b=({width:t,color:r,onChange:a,onChangeComplete:o})=>{const l=n((()=>{const e=function(e,t){return e/360*t}(r.hsv.h,t);return e}),[r.hsv.h,t]);return e.createElement(m,{className:"rcp-hue",onChange:({x:e,complete:n=!1})=>{const l=p("hsv",c(c({},r.hsv),{},{h:e/t*360}));a(l),n&&o&&o(l)}},e.createElement("div",{className:"rcp-hue-cursor",style:{left:l,backgroundColor:`hsl(${r.hsv.h}, 100%, 50%)`}}))};function E(e,t){return Math.round(e*Math.pow(10,t))/Math.pow(10,t)}const C=/^#?(?:[0-9a-f]{3}){1,2}$/i;const x=({color:t,hideHEX:n,onChange:l})=>{const s=r((()=>({value:t.hex,inputted:!1})),[t.hex]),[u,i]=a(s);o((()=>{u.inputted||i(s)}),[u.inputted,s]);return e.createElement(e.Fragment,null,!n&&e.createElement("div",{className:"rcp-fields-element hex-element"},e.createElement("input",{className:"rcp-fields-element-input",value:u.value,onFocus:()=>i(c(c({},u),{},{inputted:!0})),onChange:e=>{const t=e.target.value;console.log(t,"original value"),function(e){return console.log(C.test(e),"is_hex.test(value);"),C.test(e)}(t)&&(console.log(p("hex",t),'toColor("hex", value)'),l(p("hex",t)),console.log(u,"valueHEX"),i(c(c({},u),{},{value:t})))},onBlur:()=>i(c(c({},u),{},{inputted:!1}))}),e.createElement("label",{className:"rcp-fields-element-label"},"HEX")))},y=({color:t,hideRGB:n,hideHSV:l,alpha:s,onChange:i})=>{const h=r((()=>({value:`${t.rgb.r}, ${t.rgb.g}, ${t.rgb.b}${s&&void 0!==t.rgb.a?`, ${E(t.rgb.a,3)}`:""}`,inputted:!1})),[t.rgb,s]),d=r((()=>({value:`${Math.round(t.hsv.h)}°, ${Math.round(t.hsv.s)}%, ${Math.round(t.hsv.v)}%${s&&void 0!==t.hsv.a?`, ${E(t.hsv.a,3)}`:""}`,inputted:!1})),[t.hsv,s]),[g,m]=a(h),[v,f]=a(d);o((()=>{g.inputted||m(h)}),[g.inputted,h]),o((()=>{v.inputted||f(d)}),[v.inputted,d]);return e.createElement(e.Fragment,null,(!n||!l)&&e.createElement(e.Fragment,null,!n&&e.createElement("div",{className:"rcp-fields-element"},e.createElement("input",{className:"rcp-fields-element-input",value:g.value,onFocus:()=>m(c(c({},g),{},{inputted:!0})),onChange:e=>{const t=e.target.value.match(/\d+(?:\.\d+)?/g);if(t&&(3===t.length||s&&4===t.length)){const e=function(e){const[t,n,r,a]=e.map(((e,t)=>u(Number(e),t<3?255:1,0)));return{r:t,g:n,b:r,a:a}}(t);i(p("rgb",e))}m(c(c({},g),{},{value:e.target.value}))},onBlur:()=>m(c(c({},g),{},{inputted:!1}))}),e.createElement("label",{className:"rcp-fields-element-label"},"RGB")),!l&&e.createElement("div",{className:"rcp-fields-element"},e.createElement("input",{className:"rcp-fields-element-input",value:v.value,onFocus:()=>f(c(c({},v),{},{inputted:!0})),onChange:e=>{const t=e.target.value.match(/\d+(?:\.\d+)?/g);if(t&&(3===t.length||s&&4===t.length)){const e=function(e){const[t,n,r,a]=e.map(((e,t)=>u(Number(e),t?t<3?100:1:360,0)));return{h:t,s:n,v:r,a:a}}(t);i(p("hsv",e))}f(c(c({},v),{},{value:e.target.value}))},onBlur:()=>f(c(c({},v),{},{inputted:!1}))}),e.createElement("label",{className:"rcp-fields-element-label"},"HSV"))))},$=({color:t,hideHEX:n,hideRGB:r,hideHSV:a,alpha:o,onChange:l})=>e.createElement(e.Fragment,null,(!n||!r||!a)&&e.createElement("div",{className:"rcp-fields"},e.createElement(y,{color:t,hideRGB:r,hideHSV:a,alpha:o,onChange:l}),e.createElement(x,{color:t,hideHEX:n,onChange:l}))),w=({width:t,height:n=t,color:r,onChange:a,onChangeComplete:o,hideHEX:l=!1,hideRGB:c=!1,hideHSV:s=!1,alpha:u=!1,dark:i=!1})=>e.createElement("div",{className:"rcp "+(i?"rcp-dark":"rcp-light"),style:{width:t}},e.createElement(f,{width:t,height:n,color:r,onChange:a,onChangeComplete:o}),e.createElement("div",{className:"rcp-body"},e.createElement(b,{width:t-40,color:r,onChange:a,onChangeComplete:o}),u&&e.createElement(v,{width:t-40,color:r,onChange:a,onChangeComplete:o}),e.createElement($,{color:r,hideHEX:l,hideRGB:c,hideHSV:s,alpha:u,onChange:a})));function N(e,t){const[n,r]=a((()=>{switch(e){case"hex":return p("hex",t);case"rgb":return p("rgb",t);case"hsv":return p("hsv",t);default:return p("hex","#121212")}}));return[n,r]}export{w as ColorPicker,p as toColor,N as useColor};