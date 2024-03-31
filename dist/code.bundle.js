(()=>{var t={659:(t,e,r)=>{const n=r(156),o={};for(const t of Object.keys(n))o[n[t]]=t;const a={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};t.exports=a;for(const t of Object.keys(a)){if(!("channels"in a[t]))throw new Error("missing channels property: "+t);if(!("labels"in a[t]))throw new Error("missing channel labels property: "+t);if(a[t].labels.length!==a[t].channels)throw new Error("channel and label counts mismatch: "+t);const{channels:e,labels:r}=a[t];delete a[t].channels,delete a[t].labels,Object.defineProperty(a[t],"channels",{value:e}),Object.defineProperty(a[t],"labels",{value:r})}a.rgb.hsl=function(t){const e=t[0]/255,r=t[1]/255,n=t[2]/255,o=Math.min(e,r,n),a=Math.max(e,r,n),s=a-o;let l,i;a===o?l=0:e===a?l=(r-n)/s:r===a?l=2+(n-e)/s:n===a&&(l=4+(e-r)/s),l=Math.min(60*l,360),l<0&&(l+=360);const c=(o+a)/2;return i=a===o?0:c<=.5?s/(a+o):s/(2-a-o),[l,100*i,100*c]},a.rgb.hsv=function(t){let e,r,n,o,a;const s=t[0]/255,l=t[1]/255,i=t[2]/255,c=Math.max(s,l,i),u=c-Math.min(s,l,i),h=function(t){return(c-t)/6/u+.5};return 0===u?(o=0,a=0):(a=u/c,e=h(s),r=h(l),n=h(i),s===c?o=n-r:l===c?o=1/3+e-n:i===c&&(o=2/3+r-e),o<0?o+=1:o>1&&(o-=1)),[360*o,100*a,100*c]},a.rgb.hwb=function(t){const e=t[0],r=t[1];let n=t[2];const o=a.rgb.hsl(t)[0],s=1/255*Math.min(e,Math.min(r,n));return n=1-1/255*Math.max(e,Math.max(r,n)),[o,100*s,100*n]},a.rgb.cmyk=function(t){const e=t[0]/255,r=t[1]/255,n=t[2]/255,o=Math.min(1-e,1-r,1-n);return[100*((1-e-o)/(1-o)||0),100*((1-r-o)/(1-o)||0),100*((1-n-o)/(1-o)||0),100*o]},a.rgb.keyword=function(t){const e=o[t];if(e)return e;let r,a=1/0;for(const e of Object.keys(n)){const o=(l=n[e],((s=t)[0]-l[0])**2+(s[1]-l[1])**2+(s[2]-l[2])**2);o<a&&(a=o,r=e)}var s,l;return r},a.keyword.rgb=function(t){return n[t]},a.rgb.xyz=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255;return e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,r=r>.04045?((r+.055)/1.055)**2.4:r/12.92,n=n>.04045?((n+.055)/1.055)**2.4:n/12.92,[100*(.4124*e+.3576*r+.1805*n),100*(.2126*e+.7152*r+.0722*n),100*(.0193*e+.1192*r+.9505*n)]},a.rgb.lab=function(t){const e=a.rgb.xyz(t);let r=e[0],n=e[1],o=e[2];return r/=95.047,n/=100,o/=108.883,r=r>.008856?r**(1/3):7.787*r+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,o=o>.008856?o**(1/3):7.787*o+16/116,[116*n-16,500*(r-n),200*(n-o)]},a.hsl.rgb=function(t){const e=t[0]/360,r=t[1]/100,n=t[2]/100;let o,a,s;if(0===r)return s=255*n,[s,s,s];o=n<.5?n*(1+r):n+r-n*r;const l=2*n-o,i=[0,0,0];for(let t=0;t<3;t++)a=e+1/3*-(t-1),a<0&&a++,a>1&&a--,s=6*a<1?l+6*(o-l)*a:2*a<1?o:3*a<2?l+(o-l)*(2/3-a)*6:l,i[t]=255*s;return i},a.hsl.hsv=function(t){const e=t[0];let r=t[1]/100,n=t[2]/100,o=r;const a=Math.max(n,.01);return n*=2,r*=n<=1?n:2-n,o*=a<=1?a:2-a,[e,100*(0===n?2*o/(a+o):2*r/(n+r)),(n+r)/2*100]},a.hsv.rgb=function(t){const e=t[0]/60,r=t[1]/100;let n=t[2]/100;const o=Math.floor(e)%6,a=e-Math.floor(e),s=255*n*(1-r),l=255*n*(1-r*a),i=255*n*(1-r*(1-a));switch(n*=255,o){case 0:return[n,i,s];case 1:return[l,n,s];case 2:return[s,n,i];case 3:return[s,l,n];case 4:return[i,s,n];case 5:return[n,s,l]}},a.hsv.hsl=function(t){const e=t[0],r=t[1]/100,n=t[2]/100,o=Math.max(n,.01);let a,s;s=(2-r)*n;const l=(2-r)*o;return a=r*o,a/=l<=1?l:2-l,a=a||0,s/=2,[e,100*a,100*s]},a.hwb.rgb=function(t){const e=t[0]/360;let r=t[1]/100,n=t[2]/100;const o=r+n;let a;o>1&&(r/=o,n/=o);const s=Math.floor(6*e),l=1-n;a=6*e-s,1&s&&(a=1-a);const i=r+a*(l-r);let c,u,h;switch(s){default:case 6:case 0:c=l,u=i,h=r;break;case 1:c=i,u=l,h=r;break;case 2:c=r,u=l,h=i;break;case 3:c=r,u=i,h=l;break;case 4:c=i,u=r,h=l;break;case 5:c=l,u=r,h=i}return[255*c,255*u,255*h]},a.cmyk.rgb=function(t){const e=t[0]/100,r=t[1]/100,n=t[2]/100,o=t[3]/100;return[255*(1-Math.min(1,e*(1-o)+o)),255*(1-Math.min(1,r*(1-o)+o)),255*(1-Math.min(1,n*(1-o)+o))]},a.xyz.rgb=function(t){const e=t[0]/100,r=t[1]/100,n=t[2]/100;let o,a,s;return o=3.2406*e+-1.5372*r+-.4986*n,a=-.9689*e+1.8758*r+.0415*n,s=.0557*e+-.204*r+1.057*n,o=o>.0031308?1.055*o**(1/2.4)-.055:12.92*o,a=a>.0031308?1.055*a**(1/2.4)-.055:12.92*a,s=s>.0031308?1.055*s**(1/2.4)-.055:12.92*s,o=Math.min(Math.max(0,o),1),a=Math.min(Math.max(0,a),1),s=Math.min(Math.max(0,s),1),[255*o,255*a,255*s]},a.xyz.lab=function(t){let e=t[0],r=t[1],n=t[2];return e/=95.047,r/=100,n/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,[116*r-16,500*(e-r),200*(r-n)]},a.lab.xyz=function(t){let e,r,n;r=(t[0]+16)/116,e=t[1]/500+r,n=r-t[2]/200;const o=r**3,a=e**3,s=n**3;return r=o>.008856?o:(r-16/116)/7.787,e=a>.008856?a:(e-16/116)/7.787,n=s>.008856?s:(n-16/116)/7.787,e*=95.047,r*=100,n*=108.883,[e,r,n]},a.lab.lch=function(t){const e=t[0],r=t[1],n=t[2];let o;return o=360*Math.atan2(n,r)/2/Math.PI,o<0&&(o+=360),[e,Math.sqrt(r*r+n*n),o]},a.lch.lab=function(t){const e=t[0],r=t[1],n=t[2]/360*2*Math.PI;return[e,r*Math.cos(n),r*Math.sin(n)]},a.rgb.ansi16=function(t,e=null){const[r,n,o]=t;let s=null===e?a.rgb.hsv(t)[2]:e;if(s=Math.round(s/50),0===s)return 30;let l=30+(Math.round(o/255)<<2|Math.round(n/255)<<1|Math.round(r/255));return 2===s&&(l+=60),l},a.hsv.ansi16=function(t){return a.rgb.ansi16(a.hsv.rgb(t),t[2])},a.rgb.ansi256=function(t){const e=t[0],r=t[1],n=t[2];return e===r&&r===n?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(r/255*5)+Math.round(n/255*5)},a.ansi16.rgb=function(t){let e=t%10;if(0===e||7===e)return t>50&&(e+=3.5),e=e/10.5*255,[e,e,e];const r=.5*(1+~~(t>50));return[(1&e)*r*255,(e>>1&1)*r*255,(e>>2&1)*r*255]},a.ansi256.rgb=function(t){if(t>=232){const e=10*(t-232)+8;return[e,e,e]}let e;return t-=16,[Math.floor(t/36)/5*255,Math.floor((e=t%36)/6)/5*255,e%6/5*255]},a.rgb.hex=function(t){const e=(((255&Math.round(t[0]))<<16)+((255&Math.round(t[1]))<<8)+(255&Math.round(t[2]))).toString(16).toUpperCase();return"000000".substring(e.length)+e},a.hex.rgb=function(t){const e=t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];let r=e[0];3===e[0].length&&(r=r.split("").map((t=>t+t)).join(""));const n=parseInt(r,16);return[n>>16&255,n>>8&255,255&n]},a.rgb.hcg=function(t){const e=t[0]/255,r=t[1]/255,n=t[2]/255,o=Math.max(Math.max(e,r),n),a=Math.min(Math.min(e,r),n),s=o-a;let l,i;return l=s<1?a/(1-s):0,i=s<=0?0:o===e?(r-n)/s%6:o===r?2+(n-e)/s:4+(e-r)/s,i/=6,i%=1,[360*i,100*s,100*l]},a.hsl.hcg=function(t){const e=t[1]/100,r=t[2]/100,n=r<.5?2*e*r:2*e*(1-r);let o=0;return n<1&&(o=(r-.5*n)/(1-n)),[t[0],100*n,100*o]},a.hsv.hcg=function(t){const e=t[1]/100,r=t[2]/100,n=e*r;let o=0;return n<1&&(o=(r-n)/(1-n)),[t[0],100*n,100*o]},a.hcg.rgb=function(t){const e=t[0]/360,r=t[1]/100,n=t[2]/100;if(0===r)return[255*n,255*n,255*n];const o=[0,0,0],a=e%1*6,s=a%1,l=1-s;let i=0;switch(Math.floor(a)){case 0:o[0]=1,o[1]=s,o[2]=0;break;case 1:o[0]=l,o[1]=1,o[2]=0;break;case 2:o[0]=0,o[1]=1,o[2]=s;break;case 3:o[0]=0,o[1]=l,o[2]=1;break;case 4:o[0]=s,o[1]=0,o[2]=1;break;default:o[0]=1,o[1]=0,o[2]=l}return i=(1-r)*n,[255*(r*o[0]+i),255*(r*o[1]+i),255*(r*o[2]+i)]},a.hcg.hsv=function(t){const e=t[1]/100,r=e+t[2]/100*(1-e);let n=0;return r>0&&(n=e/r),[t[0],100*n,100*r]},a.hcg.hsl=function(t){const e=t[1]/100,r=t[2]/100*(1-e)+.5*e;let n=0;return r>0&&r<.5?n=e/(2*r):r>=.5&&r<1&&(n=e/(2*(1-r))),[t[0],100*n,100*r]},a.hcg.hwb=function(t){const e=t[1]/100,r=e+t[2]/100*(1-e);return[t[0],100*(r-e),100*(1-r)]},a.hwb.hcg=function(t){const e=t[1]/100,r=1-t[2]/100,n=r-e;let o=0;return n<1&&(o=(r-n)/(1-n)),[t[0],100*n,100*o]},a.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255]},a.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535]},a.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255]},a.gray.hsl=function(t){return[0,0,t[0]]},a.gray.hsv=a.gray.hsl,a.gray.hwb=function(t){return[0,100,t[0]]},a.gray.cmyk=function(t){return[0,0,0,t[0]]},a.gray.lab=function(t){return[t[0],0,0]},a.gray.hex=function(t){const e=255&Math.round(t[0]/100*255),r=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(r.length)+r},a.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100]}},734:(t,e,r)=>{const n=r(659),o=r(507),a={};Object.keys(n).forEach((t=>{a[t]={},Object.defineProperty(a[t],"channels",{value:n[t].channels}),Object.defineProperty(a[t],"labels",{value:n[t].labels});const e=o(t);Object.keys(e).forEach((r=>{const n=e[r];a[t][r]=function(t){const e=function(...e){const r=e[0];if(null==r)return r;r.length>1&&(e=r);const n=t(e);if("object"==typeof n)for(let t=n.length,e=0;e<t;e++)n[e]=Math.round(n[e]);return n};return"conversion"in t&&(e.conversion=t.conversion),e}(n),a[t][r].raw=function(t){const e=function(...e){const r=e[0];return null==r?r:(r.length>1&&(e=r),t(e))};return"conversion"in t&&(e.conversion=t.conversion),e}(n)}))})),t.exports=a},507:(t,e,r)=>{const n=r(659);function o(t,e){return function(r){return e(t(r))}}function a(t,e){const r=[e[t].parent,t];let a=n[e[t].parent][t],s=e[t].parent;for(;e[s].parent;)r.unshift(e[s].parent),a=o(n[e[s].parent][s],a),s=e[s].parent;return a.conversion=r,a}t.exports=function(t){const e=function(t){const e=function(){const t={},e=Object.keys(n);for(let r=e.length,n=0;n<r;n++)t[e[n]]={distance:-1,parent:null};return t}(),r=[t];for(e[t].distance=0;r.length;){const t=r.pop(),o=Object.keys(n[t]);for(let n=o.length,a=0;a<n;a++){const n=o[a],s=e[n];-1===s.distance&&(s.distance=e[t].distance+1,s.parent=t,r.unshift(n))}}return e}(t),r={},o=Object.keys(e);for(let t=o.length,n=0;n<t;n++){const t=o[n];null!==e[t].parent&&(r[t]=a(t,e))}return r}},156:t=>{"use strict";t.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},854:(t,e,r)=>{var n=r(156),o=r(872),a=Object.hasOwnProperty,s=Object.create(null);for(var l in n)a.call(n,l)&&(s[n[l]]=l);var i=t.exports={to:{},get:{}};function c(t,e,r){return Math.min(Math.max(e,t),r)}function u(t){var e=Math.round(t).toString(16).toUpperCase();return e.length<2?"0"+e:e}i.get=function(t){var e,r;switch(t.substring(0,3).toLowerCase()){case"hsl":e=i.get.hsl(t),r="hsl";break;case"hwb":e=i.get.hwb(t),r="hwb";break;default:e=i.get.rgb(t),r="rgb"}return e?{model:r,value:e}:null},i.get.rgb=function(t){if(!t)return null;var e,r,o,s=[0,0,0,1];if(e=t.match(/^#([a-f0-9]{6})([a-f0-9]{2})?$/i)){for(o=e[2],e=e[1],r=0;r<3;r++){var l=2*r;s[r]=parseInt(e.slice(l,l+2),16)}o&&(s[3]=parseInt(o,16)/255)}else if(e=t.match(/^#([a-f0-9]{3,4})$/i)){for(o=(e=e[1])[3],r=0;r<3;r++)s[r]=parseInt(e[r]+e[r],16);o&&(s[3]=parseInt(o+o,16)/255)}else if(e=t.match(/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)){for(r=0;r<3;r++)s[r]=parseInt(e[r+1],0);e[4]&&(e[5]?s[3]=.01*parseFloat(e[4]):s[3]=parseFloat(e[4]))}else{if(!(e=t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)))return(e=t.match(/^(\w+)$/))?"transparent"===e[1]?[0,0,0,0]:a.call(n,e[1])?((s=n[e[1]])[3]=1,s):null:null;for(r=0;r<3;r++)s[r]=Math.round(2.55*parseFloat(e[r+1]));e[4]&&(e[5]?s[3]=.01*parseFloat(e[4]):s[3]=parseFloat(e[4]))}for(r=0;r<3;r++)s[r]=c(s[r],0,255);return s[3]=c(s[3],0,1),s},i.get.hsl=function(t){if(!t)return null;var e=t.match(/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);if(e){var r=parseFloat(e[4]);return[(parseFloat(e[1])%360+360)%360,c(parseFloat(e[2]),0,100),c(parseFloat(e[3]),0,100),c(isNaN(r)?1:r,0,1)]}return null},i.get.hwb=function(t){if(!t)return null;var e=t.match(/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);if(e){var r=parseFloat(e[4]);return[(parseFloat(e[1])%360+360)%360,c(parseFloat(e[2]),0,100),c(parseFloat(e[3]),0,100),c(isNaN(r)?1:r,0,1)]}return null},i.to.hex=function(){var t=o(arguments);return"#"+u(t[0])+u(t[1])+u(t[2])+(t[3]<1?u(Math.round(255*t[3])):"")},i.to.rgb=function(){var t=o(arguments);return t.length<4||1===t[3]?"rgb("+Math.round(t[0])+", "+Math.round(t[1])+", "+Math.round(t[2])+")":"rgba("+Math.round(t[0])+", "+Math.round(t[1])+", "+Math.round(t[2])+", "+t[3]+")"},i.to.rgb.percent=function(){var t=o(arguments),e=Math.round(t[0]/255*100),r=Math.round(t[1]/255*100),n=Math.round(t[2]/255*100);return t.length<4||1===t[3]?"rgb("+e+"%, "+r+"%, "+n+"%)":"rgba("+e+"%, "+r+"%, "+n+"%, "+t[3]+")"},i.to.hsl=function(){var t=o(arguments);return t.length<4||1===t[3]?"hsl("+t[0]+", "+t[1]+"%, "+t[2]+"%)":"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+t[3]+")"},i.to.hwb=function(){var t=o(arguments),e="";return t.length>=4&&1!==t[3]&&(e=", "+t[3]),"hwb("+t[0]+", "+t[1]+"%, "+t[2]+"%"+e+")"},i.to.keyword=function(t){return s[t.slice(0,3)]}},520:(t,e,r)=>{const n=r(854),o=r(734),a=["keyword","gray","hex"],s={};for(const t of Object.keys(o))s[[...o[t].labels].sort().join("")]=t;const l={};function i(t,e){if(!(this instanceof i))return new i(t,e);if(e&&e in a&&(e=null),e&&!(e in o))throw new Error("Unknown model: "+e);let r,c;if(null==t)this.model="rgb",this.color=[0,0,0],this.valpha=1;else if(t instanceof i)this.model=t.model,this.color=[...t.color],this.valpha=t.valpha;else if("string"==typeof t){const e=n.get(t);if(null===e)throw new Error("Unable to parse color from string: "+t);this.model=e.model,c=o[this.model].channels,this.color=e.value.slice(0,c),this.valpha="number"==typeof e.value[c]?e.value[c]:1}else if(t.length>0){this.model=e||"rgb",c=o[this.model].channels;const r=Array.prototype.slice.call(t,0,c);this.color=f(r,c),this.valpha="number"==typeof t[c]?t[c]:1}else if("number"==typeof t)this.model="rgb",this.color=[t>>16&255,t>>8&255,255&t],this.valpha=1;else{this.valpha=1;const e=Object.keys(t);"alpha"in t&&(e.splice(e.indexOf("alpha"),1),this.valpha="number"==typeof t.alpha?t.alpha:0);const n=e.sort().join("");if(!(n in s))throw new Error("Unable to parse color from object: "+JSON.stringify(t));this.model=s[n];const{labels:a}=o[this.model],l=[];for(r=0;r<a.length;r++)l.push(t[a[r]]);this.color=f(l)}if(l[this.model])for(c=o[this.model].channels,r=0;r<c;r++){const t=l[this.model][r];t&&(this.color[r]=t(this.color[r]))}this.valpha=Math.max(0,Math.min(1,this.valpha)),Object.freeze&&Object.freeze(this)}i.prototype={toString(){return this.string()},toJSON(){return this[this.model]()},string(t){let e=this.model in n.to?this:this.rgb();e=e.round("number"==typeof t?t:1);const r=1===e.valpha?e.color:[...e.color,this.valpha];return n.to[e.model](r)},percentString(t){const e=this.rgb().round("number"==typeof t?t:1),r=1===e.valpha?e.color:[...e.color,this.valpha];return n.to.rgb.percent(r)},array(){return 1===this.valpha?[...this.color]:[...this.color,this.valpha]},object(){const t={},{channels:e}=o[this.model],{labels:r}=o[this.model];for(let n=0;n<e;n++)t[r[n]]=this.color[n];return 1!==this.valpha&&(t.alpha=this.valpha),t},unitArray(){const t=this.rgb().color;return t[0]/=255,t[1]/=255,t[2]/=255,1!==this.valpha&&t.push(this.valpha),t},unitObject(){const t=this.rgb().object();return t.r/=255,t.g/=255,t.b/=255,1!==this.valpha&&(t.alpha=this.valpha),t},round(t){return t=Math.max(t||0,0),new i([...this.color.map(c(t)),this.valpha],this.model)},alpha(t){return void 0!==t?new i([...this.color,Math.max(0,Math.min(1,t))],this.model):this.valpha},red:u("rgb",0,h(255)),green:u("rgb",1,h(255)),blue:u("rgb",2,h(255)),hue:u(["hsl","hsv","hsl","hwb","hcg"],0,(t=>(t%360+360)%360)),saturationl:u("hsl",1,h(100)),lightness:u("hsl",2,h(100)),saturationv:u("hsv",1,h(100)),value:u("hsv",2,h(100)),chroma:u("hcg",1,h(100)),gray:u("hcg",2,h(100)),white:u("hwb",1,h(100)),wblack:u("hwb",2,h(100)),cyan:u("cmyk",0,h(100)),magenta:u("cmyk",1,h(100)),yellow:u("cmyk",2,h(100)),black:u("cmyk",3,h(100)),x:u("xyz",0,h(95.047)),y:u("xyz",1,h(100)),z:u("xyz",2,h(108.833)),l:u("lab",0,h(100)),a:u("lab",1),b:u("lab",2),keyword(t){return void 0!==t?new i(t):o[this.model].keyword(this.color)},hex(t){return void 0!==t?new i(t):n.to.hex(this.rgb().round().color)},hexa(t){if(void 0!==t)return new i(t);const e=this.rgb().round().color;let r=Math.round(255*this.valpha).toString(16).toUpperCase();return 1===r.length&&(r="0"+r),n.to.hex(e)+r},rgbNumber(){const t=this.rgb().color;return(255&t[0])<<16|(255&t[1])<<8|255&t[2]},luminosity(){const t=this.rgb().color,e=[];for(const[r,n]of t.entries()){const t=n/255;e[r]=t<=.04045?t/12.92:((t+.055)/1.055)**2.4}return.2126*e[0]+.7152*e[1]+.0722*e[2]},contrast(t){const e=this.luminosity(),r=t.luminosity();return e>r?(e+.05)/(r+.05):(r+.05)/(e+.05)},level(t){const e=this.contrast(t);return e>=7?"AAA":e>=4.5?"AA":""},isDark(){const t=this.rgb().color;return(2126*t[0]+7152*t[1]+722*t[2])/1e4<128},isLight(){return!this.isDark()},negate(){const t=this.rgb();for(let e=0;e<3;e++)t.color[e]=255-t.color[e];return t},lighten(t){const e=this.hsl();return e.color[2]+=e.color[2]*t,e},darken(t){const e=this.hsl();return e.color[2]-=e.color[2]*t,e},saturate(t){const e=this.hsl();return e.color[1]+=e.color[1]*t,e},desaturate(t){const e=this.hsl();return e.color[1]-=e.color[1]*t,e},whiten(t){const e=this.hwb();return e.color[1]+=e.color[1]*t,e},blacken(t){const e=this.hwb();return e.color[2]+=e.color[2]*t,e},grayscale(){const t=this.rgb().color,e=.3*t[0]+.59*t[1]+.11*t[2];return i.rgb(e,e,e)},fade(t){return this.alpha(this.valpha-this.valpha*t)},opaquer(t){return this.alpha(this.valpha+this.valpha*t)},rotate(t){const e=this.hsl();let r=e.color[0];return r=(r+t)%360,r=r<0?360+r:r,e.color[0]=r,e},mix(t,e){if(!t||!t.rgb)throw new Error('Argument to "mix" was not a Color instance, but rather an instance of '+typeof t);const r=t.rgb(),n=this.rgb(),o=void 0===e?.5:e,a=2*o-1,s=r.alpha()-n.alpha(),l=((a*s==-1?a:(a+s)/(1+a*s))+1)/2,c=1-l;return i.rgb(l*r.red()+c*n.red(),l*r.green()+c*n.green(),l*r.blue()+c*n.blue(),r.alpha()*o+n.alpha()*(1-o))}};for(const t of Object.keys(o)){if(a.includes(t))continue;const{channels:e}=o[t];i.prototype[t]=function(...e){return this.model===t?new i(this):e.length>0?new i(e,t):new i([...(r=o[this.model][t].raw(this.color),Array.isArray(r)?r:[r]),this.valpha],t);var r},i[t]=function(...r){let n=r[0];return"number"==typeof n&&(n=f(r,e)),new i(n,t)}}function c(t){return function(e){return function(t,e){return Number(t.toFixed(e))}(e,t)}}function u(t,e,r){t=Array.isArray(t)?t:[t];for(const n of t)(l[n]||(l[n]=[]))[e]=r;return t=t[0],function(n){let o;return void 0!==n?(r&&(n=r(n)),o=this[t](),o.color[e]=n,o):(o=this[t]().color[e],r&&(o=r(o)),o)}}function h(t){return function(e){return Math.max(0,Math.min(t,e))}}function f(t,e){for(let r=0;r<e;r++)"number"!=typeof t[r]&&(t[r]=0);return t}t.exports=i},83:(t,e,r)=>{"use strict";r.d(e,{A:()=>l});var n=r(601),o=r.n(n),a=r(314),s=r.n(a)()(o());s.push([t.id,"",""]);const l=s},314:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var r="",n=void 0!==e[5];return e[4]&&(r+="@supports (".concat(e[4],") {")),e[2]&&(r+="@media ".concat(e[2]," {")),n&&(r+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),r+=t(e),n&&(r+="}"),e[2]&&(r+="}"),e[4]&&(r+="}"),r})).join("")},e.i=function(t,r,n,o,a){"string"==typeof t&&(t=[[null,t,void 0]]);var s={};if(n)for(var l=0;l<this.length;l++){var i=this[l][0];null!=i&&(s[i]=!0)}for(var c=0;c<t.length;c++){var u=[].concat(t[c]);n&&s[u[0]]||(void 0!==a&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=a),r&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=r):u[2]=r),o&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=o):u[4]="".concat(o)),e.push(u))}},e}},601:t=>{"use strict";t.exports=function(t){return t[1]}},195:t=>{t.exports=function(t){return!(!t||"string"==typeof t)&&(t instanceof Array||Array.isArray(t)||t.length>=0&&(t.splice instanceof Function||Object.getOwnPropertyDescriptor(t,t.length-1)&&"String"!==t.constructor.name))}},872:(t,e,r)=>{"use strict";var n=r(195),o=Array.prototype.concat,a=Array.prototype.slice,s=t.exports=function(t){for(var e=[],r=0,s=t.length;r<s;r++){var l=t[r];n(l)?e=o.call(e,a.call(l)):e.push(l)}return e};s.wrap=function(t){return function(){return t(s(arguments))}}},72:t=>{"use strict";var e=[];function r(t){for(var r=-1,n=0;n<e.length;n++)if(e[n].identifier===t){r=n;break}return r}function n(t,n){for(var a={},s=[],l=0;l<t.length;l++){var i=t[l],c=n.base?i[0]+n.base:i[0],u=a[c]||0,h="".concat(c," ").concat(u);a[c]=u+1;var f=r(h),d={css:i[1],media:i[2],sourceMap:i[3],supports:i[4],layer:i[5]};if(-1!==f)e[f].references++,e[f].updater(d);else{var g=o(d,n);n.byIndex=l,e.splice(l,0,{identifier:h,updater:g,references:1})}s.push(h)}return s}function o(t,e){var r=e.domAPI(e);return r.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;r.update(t=e)}else r.remove()}}t.exports=function(t,o){var a=n(t=t||[],o=o||{});return function(t){t=t||[];for(var s=0;s<a.length;s++){var l=r(a[s]);e[l].references--}for(var i=n(t,o),c=0;c<a.length;c++){var u=r(a[c]);0===e[u].references&&(e[u].updater(),e.splice(u,1))}a=i}}},40:t=>{"use strict";var e={};t.exports=function(t,r){var n=function(t){if(void 0===e[t]){var r=document.querySelector(t);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}e[t]=r}return e[t]}(t);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(r)}},540:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},56:(t,e,r)=>{"use strict";t.exports=function(t){var e=r.nc;e&&t.setAttribute("nonce",e)}},825:t=>{"use strict";t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(r){!function(t,e,r){var n="";r.supports&&(n+="@supports (".concat(r.supports,") {")),r.media&&(n+="@media ".concat(r.media," {"));var o=void 0!==r.layer;o&&(n+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),n+=r.css,o&&(n+="}"),r.media&&(n+="}"),r.supports&&(n+="}");var a=r.sourceMap;a&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(n,t,e.options)}(e,t,r)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},113:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var a=e[n]={id:n,exports:{}};return t[n](a,a.exports,r),a.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.nc=void 0,(()=>{"use strict";var t=r(520),e=r.n(t),n=r(72),o=r.n(n),a=r(825),s=r.n(a),l=r(40),i=r.n(l),c=r(56),u=r.n(c),h=r(540),f=r.n(h),d=r(113),g=r.n(d),p=r(83),b={};function m(t,r,n){return e()(t).mix(e()(r),n).hex()}b.styleTagTransform=g(),b.setAttributes=u(),b.insert=i().bind(null,"head"),b.domAPI=s(),b.insertStyleElement=f(),o()(p.A,b),p.A&&p.A.locals&&p.A.locals,figma.showUI(__html__,{width:480,height:640}),figma.ui.onmessage=function(t){if("generate-palettes"===t.type&&Array.isArray(t.colors)){var r={};t.colors.forEach((function(t){var n=function(t){try{var r=new Array(14).fill(null),n=e()(t),o=n.lightness(),a=Math.round(13*o/100);r[a]=n.hex();for(var s=0;s<a;s++){var l=s/a;r[s]=m("#000000",n.hex(),l)}for(var i=a+1;i<14;i++){var c=(i-a)/(14-a);r[i]=m(n.hex(),"#FFFFFF",c)}var u={};return r.forEach((function(t,e){u[(100*(e+1)).toString()]={value:t,type:"color"}})),u}catch(e){console.error("Error generating palette for",t,":",e);for(var h={},f=1;f<=14;f++)h[(100*f).toString()]={value:"Invalid color",type:"color"};return h}}(t.hex);r[t.name]=n})),figma.ui.postMessage({type:"generated-palettes",palettes:r}),figma.notify("Palettes generated successfully!")}}})()})();