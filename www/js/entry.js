(function(){'use strict';var Q=TQ,D=Q.D,ACT=Q.ACT,R=Q.R,trim=Q.trim,num=Q.num,E=null;
var CH={w:[0.25,0.5,0.75,1,1.5,2,3],n:[1,2,3,5,10,15,30],a:[1,2,3,5,10,20,50]},HF={0.25:'¼',0.5:'½',0.75:'¾'};
function pstr(p,u){return p?(u==='DH'?trim(Math.round(p*100)/100):String(R(p))):''}
function dh(){var v=num(E.pr);return E.pu==='DH'?v:v/20}
function es(id){var l=Q.fl(id),it=D.I[l.n]||{},m=l.m||it.m||'w',pu=it.u||D.s.prim;
E={id:id,m:m,pu:pu,pr:'',kp:null,fr:false,cs:'',ck:'g',cu:'DH'};setPrice(l);draw()}
function setPrice(l){var p=l.st&&l.m===E.m&&E.m!=='a'?l.p:Q.lastP(l.n,E.m,l.id);E.pr=pstr(p,E.pu);E.kp=(E.m!=='a'&&!E.pr)?'price':null}
function seg(a,items,cur){return '<div class="seg">'+items.map(function(x){return '<button data-a="'+a+'" data-id="'+x[0]+'" class="'+(cur===x[0]?'on':'')+'">'+x[1]+'</button>'}).join('')+'</div>'}
function draw(){var l=Q.fl(E.id),m=E.m,p=dh(),h=Q.hd(l.n);
h+='<div class="seg3 sm3">'+[['w','بالوزن'],['a','بمبلغ'],['n','بالعدد']].map(function(a){return '<button data-a="em" data-id="'+a[0]+'" class="'+(m===a[0]?'on':'')+'">'+a[1]+'</button>'}).join('')+'</div>';
if(m!=='a'){var c=Q.cmp(l.n,p,m,l.id),ht=c?'<span class="'+c.c+'">'+(c.c==='lo'?'↓ أرخص من المعتاد':c.c==='hi'?'↑ أغلى من المعتاد':'ثمن عادي')+' · كان '+Q.lt(c.last,E.pu)+'</span>':'';
h+='<div class="mf"><div class="pb'+(E.kp==='price'?' ed':'')+'" data-a="ep"><b>'+(E.pr||'0')+'</b><span>'+(E.pu==='DH'?'درهم':'ريال')+(m==='w'?' / كغ':' / حبة')+'</span></div>'+seg('eu',[['DH','درهم'],['R','ريال']],E.pu)+'</div><div class="sm2"><span>'+(E.pu==='DH'?'= '+R(p)+' ريال':'= '+Q.n2(p)+' درهم')+'</span>'+ht+'</div>'}
if(E.kp){var cu=m==='w'?'غ / كغ':m==='n'?'حبة':'مبلغ';
if(E.kp==='cust')h+='<div class="mf"><div class="pb ed"><b>'+(E.cs||'0')+'</b><span>'+(m==='n'?'حبة':m==='w'?(E.ck==='g'?'غرام':'كغ'):(E.cu==='DH'?'درهم':'ريال'))+'</span></div>'+(m==='w'?seg('ecu',[['g','غ'],['kg','كغ']],E.ck):m==='a'?seg('ecu',[['DH','درهم'],['R','ريال']],E.cu):'')+'</div>';
h+='<div class="kp">'+['7','8','9','4','5','6','1','2','3','.','0','⌫'].map(function(k){return '<button data-a="ek" data-id="'+k+'">'+k+'</button>'}).join('')+'<button class="kd" data-a="ed">'+(E.kp==='cust'?'حفظ':'تم')+'</button></div>'}
if(E.kp!=='cust'){h+='<div class="lb">'+(m==='w'?'الكمية':m==='n'?'العدد':'المبلغ بالدرهم')+' — اضغط ليُحفظ فورًا</div><div class="chg">'+CH[m].map(function(x,i){var cost=m==='a'?x:p*x;
return '<button class="q" data-a="eq" data-id="'+i+'"><b>'+(m==='w'?HF[x]||x:x)+'</b>'+(cost>0?'<small>'+(D.s.prim==='DH'?Q.n2(cost):R(cost)+' ر')+'</small>':'')+'</button>'}).join('')+'<button class="q o" data-a="eo"><b>أخرى</b></button></div>'}
if(l.st)h+='<button class="sec" data-a="eun">إلغاء الشراء</button>';
Q.open(h)}
function commit(q,a){var l=Q.fl(E.id),m=E.m,p=dh();
if(m!=='a'&&p<=0){E.kp='price';E.fr=true;draw();Q.toast('أدخل الثمن أولًا');return}
var undo=Q.commit(l,m,m==='a'?0:p,m==='a'?0:q,m==='a'?a:0,E.pu),nx=D.s.next?Q.vl(l.v).filter(function(x){return !x.st&&x!==l})[0]:null;
Q.render();Q.toast('تم: '+l.n+' — '+Q.money(Q.cost(l)),function(){undo();Q.render()});
if(nx)es(nx.id);else Q.close()}
ACT.ent=function(b){es(b.dataset.id)};Q.es=es;
ACT.em=function(b){E.m=b.dataset.id;E.fr=false;E.cs='';setPrice(Q.fl(E.id));draw()};
ACT.eu=function(b){var p=dh();E.pu=b.dataset.id;E.pr=pstr(p,E.pu);draw()};
ACT.ep=function(){E.kp='price';E.fr=true;draw()};
ACT.ecu=function(b){var m=E.m;if(m==='w')E.ck=b.dataset.id;else E.cu=b.dataset.id;draw()};
ACT.ek=function(b){var k=b.dataset.id,f=E.kp==='price'?'pr':'cs',v=E[f];if(E.fr){if(k!=='⌫')v='';E.fr=false}
if(k==='⌫')v=v.slice(0,-1);else if(k==='.'){if(v.indexOf('.')<0)v=(v||'0')+'.'}else if(v.length<6)v+=k;E[f]=v;draw()};
ACT.ed=function(){if(E.kp==='cust'){var v=num(E.cs);if(v<=0)return;if(E.m==='w')commit(E.ck==='g'?v/1000:v,0);else if(E.m==='n')commit(v,0);else commit(0,E.cu==='DH'?v:v/20)}else{E.kp=null;draw()}};
ACT.eq=function(b){var x=CH[E.m][+b.dataset.id];if(E.m==='a')commit(0,x);else commit(x,0)};
ACT.eo=function(){E.kp='cust';E.cs='';E.fr=false;draw()};
ACT.eun=function(){Q.unbuy(Q.fl(E.id));Q.close();Q.render()}})();
