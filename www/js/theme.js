(function(){'use strict';
var DEF={theme:'auto',acc:'#0F766E',fs:100};
function rgb(h){h=h.replace('#','');return [0,2,4].map(function(i){return parseInt(h.substr(i,2),16)})}
function lum(h){var c=rgb(h).map(function(v){v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]}
function cr(a,b){var x=lum(a),y=lum(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05)}
function toHsl(h){var c=rgb(h).map(function(v){return v/255}),mx=Math.max.apply(0,c),mn=Math.min.apply(0,c),l=(mx+mn)/2,d=mx-mn,s=0,H=0;
if(d){s=d/(1-Math.abs(2*l-1));if(mx===c[0])H=((c[1]-c[2])/d)%6;else if(mx===c[1])H=(c[2]-c[0])/d+2;else H=(c[0]-c[1])/d+4;H*=60;if(H<0)H+=360}return{h:H,s:s,l:l}}
function hex(h,s,l){s/=100;l=l>1?l/100:l;var a=s*Math.min(l,1-l),f=function(n){var k=(n+h/30)%12,v=l-a*Math.max(-1,Math.min(k-3,9-k,1));return ('0'+Math.round(v*255).toString(16)).slice(-2)};return '#'+f(0)+f(8)+f(4)}
function fit(c,bg,min,dir){var o=toHsl(c),l=o.l,i=0;while(cr(hex(o.h,o.s*100,l),bg)<min&&i<100){l=Math.max(0,Math.min(1,l+dir*0.01));i++}return hex(o.h,o.s*100,l)}
function mix(a,b,t){var x=rgb(a),y=rgb(b);return '#'+[0,1,2].map(function(i){return ('0'+Math.round(x[i]*t+y[i]*(1-t)).toString(16)).slice(-2)}).join('')}
function pal(d,acc){var P=d?{bg:'#1a1a18',sf:'#262624',cb:'#363633',tx:'#f5f4f0',mu:'#d0cec7',bd:'#3d3d39',bd2:'#7c7c75',ink:'#f5f4f0',oi:'#141413'}
:{bg:'#f6f6f3',sf:'#ffffff',cb:'#efeeea',tx:'#141413',mu:'#4f4e49',bd:'#e3e1da',bd2:'#8c8a82',ink:'#141413',oi:'#ffffff'};
var ref=d?P.sf:P.bg,dir=d?1:-1;
P.ac=fit(acc,ref,4.8,dir);P.acs=mix(P.ac,P.sf,0.16);
P.lo=fit(d?'#4ade80':'#15803d',ref,5,dir);P.hi=fit(d?'#fca5a5':'#b91c1c',ref,5,dir);P.wr=fit(d?'#fbbf24':'#a15c07',ref,5,dir);
P.sh=d?'0 1px 2px rgba(0,0,0,.35),0 8px 24px rgba(0,0,0,.3)':'0 1px 2px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.06)';
P.sh2=d?'0 6px 20px rgba(0,0,0,.5)':'0 6px 20px rgba(0,0,0,.1)';return P}
function ls(){try{var o=JSON.parse(localStorage.getItem('tq2'));return o&&o.s?o.s:{}}catch(e){return {}}}
function dark(s){return s.theme==='dark'||(s.theme!=='light'&&window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)}
var cur=null;
function apply(s){s=s||ls();cur=s;var acc=/^#[0-9a-f]{6}$/i.test(s.acc||'')?s.acc:DEF.acc,fs=+s.fs>=85&&+s.fs<=140?+s.fs:DEF.fs,d=dark(s),P=pal(d,acc),r=document.documentElement.style;
Object.keys(P).forEach(function(k){r.setProperty('--'+k,P[k])});r.setProperty('color-scheme',d?'dark':'light');r.fontSize=(16*fs/100)+'px'}
try{if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',function(){if(cur&&(!cur.theme||cur.theme==='auto'))apply(cur)})}catch(e){}
window.TH={apply:apply,pal:pal,cr:cr,hex:hex,hue:function(h){try{return Math.round(toHsl(h).h)}catch(e){return 170}}};
apply()})();
