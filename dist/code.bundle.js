(()=>{var t={659:(t,r,e)=>{const n=e(156),o={};for(const t of Object.keys(n))o[n[t]]=t;const a={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};t.exports=a;for(const t of Object.keys(a)){if(!("channels"in a[t]))throw new Error("missing channels property: "+t);if(!("labels"in a[t]))throw new Error("missing channel labels property: "+t);if(a[t].labels.length!==a[t].channels)throw new Error("channel and label counts mismatch: "+t);const{channels:r,labels:e}=a[t];delete a[t].channels,delete a[t].labels,Object.defineProperty(a[t],"channels",{value:r}),Object.defineProperty(a[t],"labels",{value:e})}a.rgb.hsl=function(t){const r=t[0]/255,e=t[1]/255,n=t[2]/255,o=Math.min(r,e,n),a=Math.max(r,e,n),s=a-o;let l,i;a===o?l=0:r===a?l=(e-n)/s:e===a?l=2+(n-r)/s:n===a&&(l=4+(r-e)/s),l=Math.min(60*l,360),l<0&&(l+=360);const c=(o+a)/2;return i=a===o?0:c<=.5?s/(a+o):s/(2-a-o),[l,100*i,100*c]},a.rgb.hsv=function(t){let r,e,n,o,a;const s=t[0]/255,l=t[1]/255,i=t[2]/255,c=Math.max(s,l,i),h=c-Math.min(s,l,i),u=function(t){return(c-t)/6/h+.5};return 0===h?(o=0,a=0):(a=h/c,r=u(s),e=u(l),n=u(i),s===c?o=n-e:l===c?o=1/3+r-n:i===c&&(o=2/3+e-r),o<0?o+=1:o>1&&(o-=1)),[360*o,100*a,100*c]},a.rgb.hwb=function(t){const r=t[0],e=t[1];let n=t[2];const o=a.rgb.hsl(t)[0],s=1/255*Math.min(r,Math.min(e,n));return n=1-1/255*Math.max(r,Math.max(e,n)),[o,100*s,100*n]},a.rgb.cmyk=function(t){const r=t[0]/255,e=t[1]/255,n=t[2]/255,o=Math.min(1-r,1-e,1-n);return[100*((1-r-o)/(1-o)||0),100*((1-e-o)/(1-o)||0),100*((1-n-o)/(1-o)||0),100*o]},a.rgb.keyword=function(t){const r=o[t];if(r)return r;let e,a=1/0;for(const r of Object.keys(n)){const o=(l=n[r],((s=t)[0]-l[0])**2+(s[1]-l[1])**2+(s[2]-l[2])**2);o<a&&(a=o,e=r)}var s,l;return e},a.keyword.rgb=function(t){return n[t]},a.rgb.xyz=function(t){let r=t[0]/255,e=t[1]/255,n=t[2]/255;return r=r>.04045?((r+.055)/1.055)**2.4:r/12.92,e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,n=n>.04045?((n+.055)/1.055)**2.4:n/12.92,[100*(.4124*r+.3576*e+.1805*n),100*(.2126*r+.7152*e+.0722*n),100*(.0193*r+.1192*e+.9505*n)]},a.rgb.lab=function(t){const r=a.rgb.xyz(t);let e=r[0],n=r[1],o=r[2];return e/=95.047,n/=100,o/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,o=o>.008856?o**(1/3):7.787*o+16/116,[116*n-16,500*(e-n),200*(n-o)]},a.hsl.rgb=function(t){const r=t[0]/360,e=t[1]/100,n=t[2]/100;let o,a,s;if(0===e)return s=255*n,[s,s,s];o=n<.5?n*(1+e):n+e-n*e;const l=2*n-o,i=[0,0,0];for(let t=0;t<3;t++)a=r+1/3*-(t-1),a<0&&a++,a>1&&a--,s=6*a<1?l+6*(o-l)*a:2*a<1?o:3*a<2?l+(o-l)*(2/3-a)*6:l,i[t]=255*s;return i},a.hsl.hsv=function(t){const r=t[0];let e=t[1]/100,n=t[2]/100,o=e;const a=Math.max(n,.01);return n*=2,e*=n<=1?n:2-n,o*=a<=1?a:2-a,[r,100*(0===n?2*o/(a+o):2*e/(n+e)),(n+e)/2*100]},a.hsv.rgb=function(t){const r=t[0]/60,e=t[1]/100;let n=t[2]/100;const o=Math.floor(r)%6,a=r-Math.floor(r),s=255*n*(1-e),l=255*n*(1-e*a),i=255*n*(1-e*(1-a));switch(n*=255,o){case 0:return[n,i,s];case 1:return[l,n,s];case 2:return[s,n,i];case 3:return[s,l,n];case 4:return[i,s,n];case 5:return[n,s,l]}},a.hsv.hsl=function(t){const r=t[0],e=t[1]/100,n=t[2]/100,o=Math.max(n,.01);let a,s;s=(2-e)*n;const l=(2-e)*o;return a=e*o,a/=l<=1?l:2-l,a=a||0,s/=2,[r,100*a,100*s]},a.hwb.rgb=function(t){const r=t[0]/360;let e=t[1]/100,n=t[2]/100;const o=e+n;let a;o>1&&(e/=o,n/=o);const s=Math.floor(6*r),l=1-n;a=6*r-s,1&s&&(a=1-a);const i=e+a*(l-e);let c,h,u;switch(s){default:case 6:case 0:c=l,h=i,u=e;break;case 1:c=i,h=l,u=e;break;case 2:c=e,h=l,u=i;break;case 3:c=e,h=i,u=l;break;case 4:c=i,h=e,u=l;break;case 5:c=l,h=e,u=i}return[255*c,255*h,255*u]},a.cmyk.rgb=function(t){const r=t[0]/100,e=t[1]/100,n=t[2]/100,o=t[3]/100;return[255*(1-Math.min(1,r*(1-o)+o)),255*(1-Math.min(1,e*(1-o)+o)),255*(1-Math.min(1,n*(1-o)+o))]},a.xyz.rgb=function(t){const r=t[0]/100,e=t[1]/100,n=t[2]/100;let o,a,s;return o=3.2406*r+-1.5372*e+-.4986*n,a=-.9689*r+1.8758*e+.0415*n,s=.0557*r+-.204*e+1.057*n,o=o>.0031308?1.055*o**(1/2.4)-.055:12.92*o,a=a>.0031308?1.055*a**(1/2.4)-.055:12.92*a,s=s>.0031308?1.055*s**(1/2.4)-.055:12.92*s,o=Math.min(Math.max(0,o),1),a=Math.min(Math.max(0,a),1),s=Math.min(Math.max(0,s),1),[255*o,255*a,255*s]},a.xyz.lab=function(t){let r=t[0],e=t[1],n=t[2];return r/=95.047,e/=100,n/=108.883,r=r>.008856?r**(1/3):7.787*r+16/116,e=e>.008856?e**(1/3):7.787*e+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,[116*e-16,500*(r-e),200*(e-n)]},a.lab.xyz=function(t){let r,e,n;e=(t[0]+16)/116,r=t[1]/500+e,n=e-t[2]/200;const o=e**3,a=r**3,s=n**3;return e=o>.008856?o:(e-16/116)/7.787,r=a>.008856?a:(r-16/116)/7.787,n=s>.008856?s:(n-16/116)/7.787,r*=95.047,e*=100,n*=108.883,[r,e,n]},a.lab.lch=function(t){const r=t[0],e=t[1],n=t[2];let o;return o=360*Math.atan2(n,e)/2/Math.PI,o<0&&(o+=360),[r,Math.sqrt(e*e+n*n),o]},a.lch.lab=function(t){const r=t[0],e=t[1],n=t[2]/360*2*Math.PI;return[r,e*Math.cos(n),e*Math.sin(n)]},a.rgb.ansi16=function(t,r=null){const[e,n,o]=t;let s=null===r?a.rgb.hsv(t)[2]:r;if(s=Math.round(s/50),0===s)return 30;let l=30+(Math.round(o/255)<<2|Math.round(n/255)<<1|Math.round(e/255));return 2===s&&(l+=60),l},a.hsv.ansi16=function(t){return a.rgb.ansi16(a.hsv.rgb(t),t[2])},a.rgb.ansi256=function(t){const r=t[0],e=t[1],n=t[2];return r===e&&e===n?r<8?16:r>248?231:Math.round((r-8)/247*24)+232:16+36*Math.round(r/255*5)+6*Math.round(e/255*5)+Math.round(n/255*5)},a.ansi16.rgb=function(t){let r=t%10;if(0===r||7===r)return t>50&&(r+=3.5),r=r/10.5*255,[r,r,r];const e=.5*(1+~~(t>50));return[(1&r)*e*255,(r>>1&1)*e*255,(r>>2&1)*e*255]},a.ansi256.rgb=function(t){if(t>=232){const r=10*(t-232)+8;return[r,r,r]}let r;return t-=16,[Math.floor(t/36)/5*255,Math.floor((r=t%36)/6)/5*255,r%6/5*255]},a.rgb.hex=function(t){const r=(((255&Math.round(t[0]))<<16)+((255&Math.round(t[1]))<<8)+(255&Math.round(t[2]))).toString(16).toUpperCase();return"000000".substring(r.length)+r},a.hex.rgb=function(t){const r=t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!r)return[0,0,0];let e=r[0];3===r[0].length&&(e=e.split("").map((t=>t+t)).join(""));const n=parseInt(e,16);return[n>>16&255,n>>8&255,255&n]},a.rgb.hcg=function(t){const r=t[0]/255,e=t[1]/255,n=t[2]/255,o=Math.max(Math.max(r,e),n),a=Math.min(Math.min(r,e),n),s=o-a;let l,i;return l=s<1?a/(1-s):0,i=s<=0?0:o===r?(e-n)/s%6:o===e?2+(n-r)/s:4+(r-e)/s,i/=6,i%=1,[360*i,100*s,100*l]},a.hsl.hcg=function(t){const r=t[1]/100,e=t[2]/100,n=e<.5?2*r*e:2*r*(1-e);let o=0;return n<1&&(o=(e-.5*n)/(1-n)),[t[0],100*n,100*o]},a.hsv.hcg=function(t){const r=t[1]/100,e=t[2]/100,n=r*e;let o=0;return n<1&&(o=(e-n)/(1-n)),[t[0],100*n,100*o]},a.hcg.rgb=function(t){const r=t[0]/360,e=t[1]/100,n=t[2]/100;if(0===e)return[255*n,255*n,255*n];const o=[0,0,0],a=r%1*6,s=a%1,l=1-s;let i=0;switch(Math.floor(a)){case 0:o[0]=1,o[1]=s,o[2]=0;break;case 1:o[0]=l,o[1]=1,o[2]=0;break;case 2:o[0]=0,o[1]=1,o[2]=s;break;case 3:o[0]=0,o[1]=l,o[2]=1;break;case 4:o[0]=s,o[1]=0,o[2]=1;break;default:o[0]=1,o[1]=0,o[2]=l}return i=(1-e)*n,[255*(e*o[0]+i),255*(e*o[1]+i),255*(e*o[2]+i)]},a.hcg.hsv=function(t){const r=t[1]/100,e=r+t[2]/100*(1-r);let n=0;return e>0&&(n=r/e),[t[0],100*n,100*e]},a.hcg.hsl=function(t){const r=t[1]/100,e=t[2]/100*(1-r)+.5*r;let n=0;return e>0&&e<.5?n=r/(2*e):e>=.5&&e<1&&(n=r/(2*(1-e))),[t[0],100*n,100*e]},a.hcg.hwb=function(t){const r=t[1]/100,e=r+t[2]/100*(1-r);return[t[0],100*(e-r),100*(1-e)]},a.hwb.hcg=function(t){const r=t[1]/100,e=1-t[2]/100,n=e-r;let o=0;return n<1&&(o=(e-n)/(1-n)),[t[0],100*n,100*o]},a.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255]},a.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535]},a.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255]},a.gray.hsl=function(t){return[0,0,t[0]]},a.gray.hsv=a.gray.hsl,a.gray.hwb=function(t){return[0,100,t[0]]},a.gray.cmyk=function(t){return[0,0,0,t[0]]},a.gray.lab=function(t){return[t[0],0,0]},a.gray.hex=function(t){const r=255&Math.round(t[0]/100*255),e=((r<<16)+(r<<8)+r).toString(16).toUpperCase();return"000000".substring(e.length)+e},a.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100]}},734:(t,r,e)=>{const n=e(659),o=e(507),a={};Object.keys(n).forEach((t=>{a[t]={},Object.defineProperty(a[t],"channels",{value:n[t].channels}),Object.defineProperty(a[t],"labels",{value:n[t].labels});const r=o(t);Object.keys(r).forEach((e=>{const n=r[e];a[t][e]=function(t){const r=function(...r){const e=r[0];if(null==e)return e;e.length>1&&(r=e);const n=t(r);if("object"==typeof n)for(let t=n.length,r=0;r<t;r++)n[r]=Math.round(n[r]);return n};return"conversion"in t&&(r.conversion=t.conversion),r}(n),a[t][e].raw=function(t){const r=function(...r){const e=r[0];return null==e?e:(e.length>1&&(r=e),t(r))};return"conversion"in t&&(r.conversion=t.conversion),r}(n)}))})),t.exports=a},507:(t,r,e)=>{const n=e(659);function o(t,r){return function(e){return r(t(e))}}function a(t,r){const e=[r[t].parent,t];let a=n[r[t].parent][t],s=r[t].parent;for(;r[s].parent;)e.unshift(r[s].parent),a=o(n[r[s].parent][s],a),s=r[s].parent;return a.conversion=e,a}t.exports=function(t){const r=function(t){const r=function(){const t={},r=Object.keys(n);for(let e=r.length,n=0;n<e;n++)t[r[n]]={distance:-1,parent:null};return t}(),e=[t];for(r[t].distance=0;e.length;){const t=e.pop(),o=Object.keys(n[t]);for(let n=o.length,a=0;a<n;a++){const n=o[a],s=r[n];-1===s.distance&&(s.distance=r[t].distance+1,s.parent=t,e.unshift(n))}}return r}(t),e={},o=Object.keys(r);for(let t=o.length,n=0;n<t;n++){const t=o[n];null!==r[t].parent&&(e[t]=a(t,r))}return e}},156:t=>{"use strict";t.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},854:(t,r,e)=>{var n=e(156),o=e(872),a=Object.hasOwnProperty,s=Object.create(null);for(var l in n)a.call(n,l)&&(s[n[l]]=l);var i=t.exports={to:{},get:{}};function c(t,r,e){return Math.min(Math.max(r,t),e)}function h(t){var r=Math.round(t).toString(16).toUpperCase();return r.length<2?"0"+r:r}i.get=function(t){var r,e;switch(t.substring(0,3).toLowerCase()){case"hsl":r=i.get.hsl(t),e="hsl";break;case"hwb":r=i.get.hwb(t),e="hwb";break;default:r=i.get.rgb(t),e="rgb"}return r?{model:e,value:r}:null},i.get.rgb=function(t){if(!t)return null;var r,e,o,s=[0,0,0,1];if(r=t.match(/^#([a-f0-9]{6})([a-f0-9]{2})?$/i)){for(o=r[2],r=r[1],e=0;e<3;e++){var l=2*e;s[e]=parseInt(r.slice(l,l+2),16)}o&&(s[3]=parseInt(o,16)/255)}else if(r=t.match(/^#([a-f0-9]{3,4})$/i)){for(o=(r=r[1])[3],e=0;e<3;e++)s[e]=parseInt(r[e]+r[e],16);o&&(s[3]=parseInt(o+o,16)/255)}else if(r=t.match(/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)){for(e=0;e<3;e++)s[e]=parseInt(r[e+1],0);r[4]&&(r[5]?s[3]=.01*parseFloat(r[4]):s[3]=parseFloat(r[4]))}else{if(!(r=t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)))return(r=t.match(/^(\w+)$/))?"transparent"===r[1]?[0,0,0,0]:a.call(n,r[1])?((s=n[r[1]])[3]=1,s):null:null;for(e=0;e<3;e++)s[e]=Math.round(2.55*parseFloat(r[e+1]));r[4]&&(r[5]?s[3]=.01*parseFloat(r[4]):s[3]=parseFloat(r[4]))}for(e=0;e<3;e++)s[e]=c(s[e],0,255);return s[3]=c(s[3],0,1),s},i.get.hsl=function(t){if(!t)return null;var r=t.match(/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);if(r){var e=parseFloat(r[4]);return[(parseFloat(r[1])%360+360)%360,c(parseFloat(r[2]),0,100),c(parseFloat(r[3]),0,100),c(isNaN(e)?1:e,0,1)]}return null},i.get.hwb=function(t){if(!t)return null;var r=t.match(/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);if(r){var e=parseFloat(r[4]);return[(parseFloat(r[1])%360+360)%360,c(parseFloat(r[2]),0,100),c(parseFloat(r[3]),0,100),c(isNaN(e)?1:e,0,1)]}return null},i.to.hex=function(){var t=o(arguments);return"#"+h(t[0])+h(t[1])+h(t[2])+(t[3]<1?h(Math.round(255*t[3])):"")},i.to.rgb=function(){var t=o(arguments);return t.length<4||1===t[3]?"rgb("+Math.round(t[0])+", "+Math.round(t[1])+", "+Math.round(t[2])+")":"rgba("+Math.round(t[0])+", "+Math.round(t[1])+", "+Math.round(t[2])+", "+t[3]+")"},i.to.rgb.percent=function(){var t=o(arguments),r=Math.round(t[0]/255*100),e=Math.round(t[1]/255*100),n=Math.round(t[2]/255*100);return t.length<4||1===t[3]?"rgb("+r+"%, "+e+"%, "+n+"%)":"rgba("+r+"%, "+e+"%, "+n+"%, "+t[3]+")"},i.to.hsl=function(){var t=o(arguments);return t.length<4||1===t[3]?"hsl("+t[0]+", "+t[1]+"%, "+t[2]+"%)":"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+t[3]+")"},i.to.hwb=function(){var t=o(arguments),r="";return t.length>=4&&1!==t[3]&&(r=", "+t[3]),"hwb("+t[0]+", "+t[1]+"%, "+t[2]+"%"+r+")"},i.to.keyword=function(t){return s[t.slice(0,3)]}},520:(t,r,e)=>{const n=e(854),o=e(734),a=["keyword","gray","hex"],s={};for(const t of Object.keys(o))s[[...o[t].labels].sort().join("")]=t;const l={};function i(t,r){if(!(this instanceof i))return new i(t,r);if(r&&r in a&&(r=null),r&&!(r in o))throw new Error("Unknown model: "+r);let e,c;if(null==t)this.model="rgb",this.color=[0,0,0],this.valpha=1;else if(t instanceof i)this.model=t.model,this.color=[...t.color],this.valpha=t.valpha;else if("string"==typeof t){const r=n.get(t);if(null===r)throw new Error("Unable to parse color from string: "+t);this.model=r.model,c=o[this.model].channels,this.color=r.value.slice(0,c),this.valpha="number"==typeof r.value[c]?r.value[c]:1}else if(t.length>0){this.model=r||"rgb",c=o[this.model].channels;const e=Array.prototype.slice.call(t,0,c);this.color=g(e,c),this.valpha="number"==typeof t[c]?t[c]:1}else if("number"==typeof t)this.model="rgb",this.color=[t>>16&255,t>>8&255,255&t],this.valpha=1;else{this.valpha=1;const r=Object.keys(t);"alpha"in t&&(r.splice(r.indexOf("alpha"),1),this.valpha="number"==typeof t.alpha?t.alpha:0);const n=r.sort().join("");if(!(n in s))throw new Error("Unable to parse color from object: "+JSON.stringify(t));this.model=s[n];const{labels:a}=o[this.model],l=[];for(e=0;e<a.length;e++)l.push(t[a[e]]);this.color=g(l)}if(l[this.model])for(c=o[this.model].channels,e=0;e<c;e++){const t=l[this.model][e];t&&(this.color[e]=t(this.color[e]))}this.valpha=Math.max(0,Math.min(1,this.valpha)),Object.freeze&&Object.freeze(this)}i.prototype={toString(){return this.string()},toJSON(){return this[this.model]()},string(t){let r=this.model in n.to?this:this.rgb();r=r.round("number"==typeof t?t:1);const e=1===r.valpha?r.color:[...r.color,this.valpha];return n.to[r.model](e)},percentString(t){const r=this.rgb().round("number"==typeof t?t:1),e=1===r.valpha?r.color:[...r.color,this.valpha];return n.to.rgb.percent(e)},array(){return 1===this.valpha?[...this.color]:[...this.color,this.valpha]},object(){const t={},{channels:r}=o[this.model],{labels:e}=o[this.model];for(let n=0;n<r;n++)t[e[n]]=this.color[n];return 1!==this.valpha&&(t.alpha=this.valpha),t},unitArray(){const t=this.rgb().color;return t[0]/=255,t[1]/=255,t[2]/=255,1!==this.valpha&&t.push(this.valpha),t},unitObject(){const t=this.rgb().object();return t.r/=255,t.g/=255,t.b/=255,1!==this.valpha&&(t.alpha=this.valpha),t},round(t){return t=Math.max(t||0,0),new i([...this.color.map(c(t)),this.valpha],this.model)},alpha(t){return void 0!==t?new i([...this.color,Math.max(0,Math.min(1,t))],this.model):this.valpha},red:h("rgb",0,u(255)),green:h("rgb",1,u(255)),blue:h("rgb",2,u(255)),hue:h(["hsl","hsv","hsl","hwb","hcg"],0,(t=>(t%360+360)%360)),saturationl:h("hsl",1,u(100)),lightness:h("hsl",2,u(100)),saturationv:h("hsv",1,u(100)),value:h("hsv",2,u(100)),chroma:h("hcg",1,u(100)),gray:h("hcg",2,u(100)),white:h("hwb",1,u(100)),wblack:h("hwb",2,u(100)),cyan:h("cmyk",0,u(100)),magenta:h("cmyk",1,u(100)),yellow:h("cmyk",2,u(100)),black:h("cmyk",3,u(100)),x:h("xyz",0,u(95.047)),y:h("xyz",1,u(100)),z:h("xyz",2,u(108.833)),l:h("lab",0,u(100)),a:h("lab",1),b:h("lab",2),keyword(t){return void 0!==t?new i(t):o[this.model].keyword(this.color)},hex(t){return void 0!==t?new i(t):n.to.hex(this.rgb().round().color)},hexa(t){if(void 0!==t)return new i(t);const r=this.rgb().round().color;let e=Math.round(255*this.valpha).toString(16).toUpperCase();return 1===e.length&&(e="0"+e),n.to.hex(r)+e},rgbNumber(){const t=this.rgb().color;return(255&t[0])<<16|(255&t[1])<<8|255&t[2]},luminosity(){const t=this.rgb().color,r=[];for(const[e,n]of t.entries()){const t=n/255;r[e]=t<=.04045?t/12.92:((t+.055)/1.055)**2.4}return.2126*r[0]+.7152*r[1]+.0722*r[2]},contrast(t){const r=this.luminosity(),e=t.luminosity();return r>e?(r+.05)/(e+.05):(e+.05)/(r+.05)},level(t){const r=this.contrast(t);return r>=7?"AAA":r>=4.5?"AA":""},isDark(){const t=this.rgb().color;return(2126*t[0]+7152*t[1]+722*t[2])/1e4<128},isLight(){return!this.isDark()},negate(){const t=this.rgb();for(let r=0;r<3;r++)t.color[r]=255-t.color[r];return t},lighten(t){const r=this.hsl();return r.color[2]+=r.color[2]*t,r},darken(t){const r=this.hsl();return r.color[2]-=r.color[2]*t,r},saturate(t){const r=this.hsl();return r.color[1]+=r.color[1]*t,r},desaturate(t){const r=this.hsl();return r.color[1]-=r.color[1]*t,r},whiten(t){const r=this.hwb();return r.color[1]+=r.color[1]*t,r},blacken(t){const r=this.hwb();return r.color[2]+=r.color[2]*t,r},grayscale(){const t=this.rgb().color,r=.3*t[0]+.59*t[1]+.11*t[2];return i.rgb(r,r,r)},fade(t){return this.alpha(this.valpha-this.valpha*t)},opaquer(t){return this.alpha(this.valpha+this.valpha*t)},rotate(t){const r=this.hsl();let e=r.color[0];return e=(e+t)%360,e=e<0?360+e:e,r.color[0]=e,r},mix(t,r){if(!t||!t.rgb)throw new Error('Argument to "mix" was not a Color instance, but rather an instance of '+typeof t);const e=t.rgb(),n=this.rgb(),o=void 0===r?.5:r,a=2*o-1,s=e.alpha()-n.alpha(),l=((a*s==-1?a:(a+s)/(1+a*s))+1)/2,c=1-l;return i.rgb(l*e.red()+c*n.red(),l*e.green()+c*n.green(),l*e.blue()+c*n.blue(),e.alpha()*o+n.alpha()*(1-o))}};for(const t of Object.keys(o)){if(a.includes(t))continue;const{channels:r}=o[t];i.prototype[t]=function(...r){return this.model===t?new i(this):r.length>0?new i(r,t):new i([...(e=o[this.model][t].raw(this.color),Array.isArray(e)?e:[e]),this.valpha],t);var e},i[t]=function(...e){let n=e[0];return"number"==typeof n&&(n=g(e,r)),new i(n,t)}}function c(t){return function(r){return function(t,r){return Number(t.toFixed(r))}(r,t)}}function h(t,r,e){t=Array.isArray(t)?t:[t];for(const n of t)(l[n]||(l[n]=[]))[r]=e;return t=t[0],function(n){let o;return void 0!==n?(e&&(n=e(n)),o=this[t](),o.color[r]=n,o):(o=this[t]().color[r],e&&(o=e(o)),o)}}function u(t){return function(r){return Math.max(0,Math.min(t,r))}}function g(t,r){for(let e=0;e<r;e++)"number"!=typeof t[e]&&(t[e]=0);return t}t.exports=i},195:t=>{t.exports=function(t){return!(!t||"string"==typeof t)&&(t instanceof Array||Array.isArray(t)||t.length>=0&&(t.splice instanceof Function||Object.getOwnPropertyDescriptor(t,t.length-1)&&"String"!==t.constructor.name))}},872:(t,r,e)=>{"use strict";var n=e(195),o=Array.prototype.concat,a=Array.prototype.slice,s=t.exports=function(t){for(var r=[],e=0,s=t.length;e<s;e++){var l=t[e];n(l)?r=o.call(r,a.call(l)):r.push(l)}return r};s.wrap=function(t){return function(){return t(s(arguments))}}}},r={};function e(n){var o=r[n];if(void 0!==o)return o.exports;var a=r[n]={exports:{}};return t[n](a,a.exports,e),a.exports}e.n=t=>{var r=t&&t.__esModule?()=>t.default:()=>t;return e.d(r,{a:r}),r},e.d=(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},e.o=(t,r)=>Object.prototype.hasOwnProperty.call(t,r),(()=>{"use strict";var t=e(520),r=e.n(t);function n(t,e,n){return r()(t).mix(r()(e),n).hex()}figma.showUI(__html__,{width:480,height:360}),figma.ui.onmessage=function(t){if("generate-palettes"===t.type&&Array.isArray(t.colors)){var e={};t.colors.forEach((function(t){var o=function(t){try{var e=new Array(14).fill(null),o=r()(t),a=o.lightness(),s=Math.round(13*a/100);e[s]=o.hex();for(var l=0;l<s;l++){var i=l/s;e[l]=n("#000000",o.hex(),i)}for(var c=s+1;c<14;c++){var h=(c-s)/(14-s);e[c]=n(o.hex(),"#FFFFFF",h)}var u={};return e.forEach((function(t,r){u[(100*(r+1)).toString()]={value:t,type:"color"}})),u}catch(r){console.error("Error generating palette for",t,":",r);for(var g={},f=1;f<=14;f++)g[(100*f).toString()]={value:"Invalid color",type:"color"};return g}}(t.hex);e[t.name]=o})),figma.ui.postMessage({type:"generated-palettes",palettes:e}),figma.notify("Palettes generated successfully!")}}})()})();