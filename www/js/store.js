(function(){'use strict';
var K='tq2',DAY=864e5,COL=['#B7791F','#2F855A','#DD6B20','#C53030','#6B46C1','#2B6CB0','#B83280','#0F766E'];
var SCHEMA={prim:{d:'DH',ok:['DH','R']},next:{d:false,ok:[true,false]}};
var D={},S={tab:0,v:null,av:null,hv:0},U={};
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function num(s){return parseFloat(String(s).replace(/[٠-٩]/g,function(c){return c.charCodeAt(0)-1632}).replace('٫','.').replace(',','.'))||0}
function trim(n){return String(+(+n).toFixed(3))}
function n2(x){return (Math.round(x*100)/100).toFixed(2)}
function R(x){return Math.round(x*20)}
function fdate(t){var d=new Date(t);return '<bdi>'+d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear()+'</bdi>'}
function money(x){return D.s.prim==='DH'?n2(x)+' درهم':R(x)+' ريال'}
function money2(x){return D.s.prim==='DH'?R(x)+' ريال':n2(x)+' درهم'}
function lt(x,u){return u==='R'?R(x)+' ريال':trim(x)+' درهم'}
function norm(s){s=s&&typeof s==='object'?s:{};var o={};Object.keys(SCHEMA).forEach(function(k){var c=SCHEMA[k];o[k]=c.ok.indexOf(s[k])>=0?s[k]:c.d});return o}
function defV(){return ['العطار','مول الخضرة','مول الفواكه','مول البيض','مول الدجاج','الجزار'].map(function(n,i){return{id:'v'+i,n:n,c:COL[i]}})}
function ls(k){try{return localStorage.getItem(k)}catch(e){return null}}
function parse(s){try{var o=JSON.parse(s);return o&&o.V&&o.T?o:null}catch(e){return null}}
function fix(o){var d={v:2},t=o.T||{};d.s=norm(o.s);d.V=Array.isArray(o.V)&&o.V.length?o.V:defV();d.I=o.I&&typeof o.I==='object'?o.I:{};
d.T={b:+t.b||0,L:Array.isArray(t.L)?t.L:[],pay:t.pay||{},said:t.said||{},ex:Array.isArray(t.ex)?t.ex:[]};if(t.t0)d.T.t0=t.t0;if(t.real!=null)d.T.real=t.real;
d.H=(Array.isArray(o.H)?o.H:[]).map(function(h){h.id=h.id||uid();h.L=h.L||[];h.pay=h.pay||{};h.ex=h.ex||[];return h});d.P=o.P||{};d.O=o.O&&typeof o.O==='object'?o.O:{};d.X=Array.isArray(o.X)?o.X:[];return d}
function setD(o){var d=fix(o);Object.keys(D).forEach(function(k){delete D[k]});Object.assign(D,d)}
function purge(){var c=Date.now()-30*DAY;D.X=D.X.filter(function(x){return x.t>c})}
function load(){setD(parse(ls(K))||parse(ls(K+'p'))||parse(ls('tq1'))||{V:[],T:{}});purge()}
var Q={D:D,S:S,U:U,COL:COL,uid:uid,esc:esc,num:num,trim:trim,n2:n2,R:R,fdate:fdate,money:money,money2:money2,lt:lt,setD:setD,load:load,onSave:null};
Q.save=function(){try{var s=JSON.stringify(D),o=localStorage.getItem(K);if(o&&o!==s)localStorage.setItem(K+'p',o);localStorage.setItem(K,s)}catch(e){}if(Q.onSave)Q.onSave()};
Q.cost=function(l){return l.m==='a'?l.a:l.p*l.q};
Q.vl=function(v){return D.T.L.filter(function(l){return l.v===v})};
Q.vtot=function(v){return Q.vl(v).reduce(function(s,l){return s+(l.st?Q.cost(l):0)},0)};
Q.vend=function(id){return D.V.filter(function(v){return v.id===id})[0]};
Q.fl=function(id){return D.T.L.filter(function(l){return l.id===id})[0]};
Q.spent=function(){return D.V.reduce(function(s,v){var p=D.T.pay[v.id];return s+(p!=null?p:Q.vtot(v.id))},0)+(D.T.ex||[]).reduce(function(s,x){return s+x.a},0)};
Q.pu=function(l){return (D.I[l.n]||{}).u==='R'?Q.R(l.p)+' ر':trim(l.p)};
Q.qtxt=function(l){if(l.m==='a')return 'بمبلغ';if(l.m==='n')return trim(l.q)+' حبة × '+Q.pu(l);var h={0.25:'¼',0.5:'½',0.75:'¾'};return (h[l.q]||(l.q<1?Math.round(l.q*1000)+' غ':trim(l.q)))+(h[l.q]||l.q>=1?' كغ':'')+' × '+Q.pu(l)};
Q.cmp=function(n,p,m,lid){var a=(D.P[n]||[]).filter(function(x){return x.m===m&&x.lid!==lid});if(!a.length||!p)return null;var r=a.slice(-5),u=r.reduce(function(s,x){return s+x.p},0)/r.length,d=(p-u)/u;return{last:a[a.length-1].p,c:d<-0.04?'lo':d>0.04?'hi':'ok'}};
Q.lastP=function(n,m,lid){var P=D.P[n]||[];for(var i=P.length-1;i>=0;i--)if(P[i].m===m&&P[i].lid!==lid)return P[i].p;return 0};
Q.addLine=function(n,v){var l={id:uid(),n:n,v:v,st:0,m:(D.I[n]||{}).m||'w',p:0,q:1,a:0};D.T.L.push(l);D.I[n]=D.I[n]||{};D.I[n].v=v;Q.save();return l};
Q.freq=function(){var cur=D.T.L.map(function(l){return l.n});return Object.keys(D.I).filter(function(n){return cur.indexOf(n)<0&&(D.P[n]||[]).length&&Q.vend(D.I[n].v)}).sort(function(a,b){return D.P[b].length-D.P[a].length}).slice(0,10)};
Q.commit=function(l,m,p,q,a,pu){var snap=JSON.stringify(l),P0=(D.P[l.n]||[]).slice(),I0=D.I[l.n]?JSON.stringify(D.I[l.n]):null,t0=D.T.t0;
D.P[l.n]=P0.filter(function(x){return x.lid!==l.id});l.m=m;l.p=p||0;l.q=q||0;l.a=a||0;l.st=1;l.t=Date.now();
D.P[l.n].push({p:m==='a'?l.a:l.p,t:l.t,m:m,lid:l.id});if(!D.T.t0)D.T.t0=l.t;
var it=D.I[l.n]=D.I[l.n]||{};it.v=l.v;it.m=m;it.u=pu;Q.save();
return function(){Object.keys(l).forEach(function(k){delete l[k]});Object.assign(l,JSON.parse(snap));D.P[l.n]=P0;if(I0)D.I[l.n]=JSON.parse(I0);else delete D.I[l.n];if(t0)D.T.t0=t0;else delete D.T.t0;Q.save()}};
Q.unbuy=function(l){l.st=0;D.P[l.n]=(D.P[l.n]||[]).filter(function(x){return x.lid!==l.id});Q.save()};
Q.trashAdd=function(k,n,d){D.X.unshift({id:uid(),k:k,n:n,t:Date.now(),d:d})};
Q.finish=function(){var b=D.T.L.filter(function(l){return l.st}),keep=D.T.L.filter(function(l){return !l.st});
if(b.length||D.T.ex.length){D.H.unshift({id:uid(),t0:D.T.t0||Date.now(),t:Date.now(),b:D.T.b,sp:Q.spent(),L:b,pay:D.T.pay,said:D.T.said,real:D.T.real,ex:D.T.ex});D.H=D.H.slice(0,300)}
D.T={b:0,L:keep,pay:{},said:{},ex:[]};Q.save()};
Q.restoreTrash=function(id){var x=D.X.filter(function(y){return y.id===id})[0];if(!x)return;
if(x.k==='line'){if(!Q.vend(x.d.v))x.d.v=D.V[0].id;D.T.L.push(x.d)}else if(x.k==='vendor'){if(!Q.vend(x.d.id))D.V.push(x.d)}else if(x.k==='trip')D.H.unshift(x.d);else if(x.k==='item'&&!D.I[x.d.n]){D.I[x.d.n]=x.d.I;D.P[x.d.n]=x.d.P}
D.X=D.X.filter(function(y){return y!==x});Q.save()};
Q.renameItem=function(a,b){b=b.trim();if(!b||a===b||!D.I[a])return false;var P=(D.P[a]||[]).concat(D.P[b]||[]).sort(function(x,y){return x.t-y.t});
if(!D.I[b])D.I[b]=D.I[a];delete D.I[a];if(P.length)D.P[b]=P;delete D.P[a];
D.T.L.forEach(function(l){if(l.n===a)l.n=b});D.H.forEach(function(h){h.L.forEach(function(l){if(l.n===a)l.n=b})});Q.save();return true};
Q.shareText=function(){var o=['قائمة المشتريات'];D.V.forEach(function(v){var L=Q.vl(v.id).filter(function(l){return !l.st});if(L.length){o.push('','*'+v.n+'*');L.forEach(function(l){o.push('- '+l.n)})}});return o.join('\n')};
window.TQ=Q})();
