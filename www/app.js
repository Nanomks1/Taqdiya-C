(function(){'use strict';
var K='tq1',$=function(s){return document.querySelector(s)};
var D={s:{prim:'DH'},V:[],I:{},T:null,H:[],P:{}},S={tab:0,v:null,av:null},U={},LIVE=null,SO=false,EL=null;
var COL=['#B7791F','#2F855A','#DD6B20','#C53030','#6B46C1','#2B6CB0','#B83280','#0F766E'];
var IC={plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',x:'<path d="M18 6L6 18M6 6l12 12"/>',
list:'<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',basket:'<path d="M3 10h18l-2 10H5zM8 10l4-6 4 6"/>',
receipt:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6"/>',gear:'<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>'};
function ic(n){return '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+IC[n]+'</svg>'}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function num(s){return parseFloat(String(s).replace(/[٠-٩]/g,function(c){return c.charCodeAt(0)-1632}).replace('٫','.').replace(',','.'))||0}
function trim(n){return String(+(+n).toFixed(3))}
function n2(x){return (Math.round(x*100)/100).toFixed(2)}
function R(x){return Math.round(x*20)}
function money(x){return D.s.prim==='DH'?n2(x)+' درهم':R(x)+' ريال'}
function money2(x){return D.s.prim==='DH'?R(x)+' ريال':n2(x)+' درهم'}
function load(){try{var x=JSON.parse(localStorage.getItem(K));if(x&&x.V)D=x}catch(e){}
if(!D.V.length)D.V=['العطار','مول الخضرة','مول الفواكه','مول البيض','مول الدجاج','الجزار'].map(function(n,i){return{id:'v'+i,n:n,c:COL[i]}});
if(!D.T)D.T={b:0,L:[],pay:{},said:{}}}
function save(){try{localStorage.setItem(K,JSON.stringify(D))}catch(e){}}
function toast(m){var t=$('#ts');t.textContent=m;t.classList.add('o');setTimeout(function(){t.classList.remove('o')},1800)}
function cost(l){return l.m==='a'?l.a:l.p*l.q}
function vl(v){return D.T.L.filter(function(l){return l.v===v})}
function vtot(v){return vl(v).reduce(function(s,l){return s+(l.st?cost(l):0)},0)}
function vend(id){return D.V.filter(function(v){return v.id===id})[0]}
function fl(id){return D.T.L.filter(function(l){return l.id===id})[0]}
function spent(){return D.V.reduce(function(s,v){var p=D.T.pay[v.id];return s+(p!=null?p:vtot(v.id))},0)}
function pu(l){return (D.I[l.n]||{}).u==='R'?R(l.p)+' ر':trim(l.p)}
function qtxt(l){if(l.m==='a')return 'بمبلغ';if(l.m==='n')return trim(l.q)+' حبة × '+pu(l);var h={0.25:'¼',0.5:'½',0.75:'¾'};return (h[l.q]||(l.q<1?Math.round(l.q*1000)+' غ':trim(l.q)))+(h[l.q]||l.q>=1?' كغ':'')+' × '+pu(l)}
function cmp(n,p,m,lid){var a=(D.P[n]||[]).filter(function(x){return x.m===m&&x.lid!==lid});if(!a.length||!p)return null;var r=a.slice(-5),u=r.reduce(function(s,x){return s+x.p},0)/r.length,d=(p-u)/u;return{last:a[a.length-1].p,c:d<-0.04?'lo':d>0.04?'hi':'ok'}}
function lt(x,u){return u==='R'?R(x)+' ريال':trim(x)+' درهم'}
function addLine(n,v){var l={id:uid(),n:n,v:v,st:0,m:(D.I[n]||{}).m||'w',p:0,q:1,a:0};D.T.L.push(l);D.I[n]=D.I[n]||{};D.I[n].v=v;save();return l}
function freq(){var cur=D.T.L.map(function(l){return l.n});return Object.keys(D.I).filter(function(n){return cur.indexOf(n)<0&&(D.P[n]||[]).length&&vend(D.I[n].v)}).sort(function(a,b){return D.P[b].length-D.P[a].length}).slice(0,10)}
function mf(id,dh,u){u=u||U[id]||D.s.prim;U[id]=u;var v=dh?(u==='DH'?trim(dh):String(R(dh))):'';return '<div class="mf"><input id="'+id+'" data-c="'+id+'" inputmode="decimal" value="'+v+'"><div class="seg">'+['DH','R'].map(function(k){return '<button data-f="'+id+'" data-u="'+k+'" class="'+(u===k?'on':'')+'">'+(k==='DH'?'درهم':'ريال')+'</button>'}).join('')+'</div></div>'}
function mv(id){var e=$('#'+id);if(!e)return 0;var v=num(e.value);return U[id]==='DH'?v:v/20}
function open(h){$('#sh').innerHTML='<div class="bk" data-a="close"></div><div class="pn">'+h+'</div>';$('#sh').classList.add('o');if(!SO){history.pushState({s:1},'');SO=true}}
function close(b){$('#sh').classList.remove('o');$('#sh').innerHTML='';LIVE=null;if(SO){SO=false;if(b!==false)history.back()}}
window.addEventListener('popstate',function(){if(SO){SO=false;close(false)}});
function hd(t){return '<div class="hd"><b>'+esc(t)+'</b><button class="ib" data-a="close">'+ic('x')+'</button></div>'}
function vchips(){return D.V.map(function(v){return '<button class="chip'+(S.av===v.id?' on':'')+'" style="--c:'+v.c+'" data-a="av" data-id="'+v.id+'"><i style="background:'+v.c+'"></i>'+esc(v.n)+'</button>'}).join('')}
function vPrep(){S.av=S.av&&vend(S.av)?S.av:D.V[0].id;
var h='<div class="card"><label>شحال في جيبي</label>'+mf('bud',D.T.b)+'</div>';
h+='<div class="card"><label>غرض نفد</label><input id="nm" list="dl" placeholder="اسم الغرض" autocomplete="off"><datalist id="dl">'+Object.keys(D.I).map(function(n){return '<option value="'+esc(n)+'">'}).join('')+'</datalist><div class="chips" id="vc">'+vchips()+'</div><button class="pri" data-a="add">إضافة</button></div>';
var fr=freq();if(fr.length)h+='<div class="card"><label>متكرّرة</label><div class="chips" style="margin:0">'+fr.map(function(n){return '<button class="chip" data-a="quick" data-id="'+esc(n)+'">+ '+esc(n)+'</button>'}).join('')+'</div></div>';
D.V.forEach(function(v){var L=vl(v.id);if(!L.length)return;h+='<div class="vh"><i style="background:'+v.c+'"></i>'+esc(v.n)+'<span>'+L.length+'</span></div><div class="list">'+L.map(function(l){return '<div class="row" data-a="pedit" data-id="'+l.id+'"><div class="g"><b'+(l.st?' class="dn"':'')+'>'+esc(l.n)+'</b></div>'+(l.st?'<span class="sm">اشتُري</span>':'')+'</div>'}).join('')+'</div>'});
return h}
function vShop(){var T=D.T,sp=spent();
if(!S.v||!vend(S.v))S.v=(D.V.filter(function(v){return vl(v.id).length})[0]||D.V[0]).id;var sv=S.v,tot=vtot(sv);
var h='<div class="strip">'+[['خرجت بـ',T.b],['صرفت',sp],['الباقي',T.b-sp]].map(function(a,i){return '<div><span>'+a[0]+'</span><b'+(i===2&&a[1]<0?' class="hi"':'')+'>'+money(a[1])+'</b><em>'+money2(a[1])+'</em></div>'}).join('')+'</div>';
h+='<div class="tabs">'+D.V.map(function(v){var n=vl(v.id).filter(function(l){return !l.st}).length;return '<button class="chip'+(sv===v.id?' on':'')+'" style="--c:'+v.c+'" data-a="sv" data-id="'+v.id+'">'+esc(v.n)+(n?' <small>'+n+'</small>':'')+'</button>'}).join('')+'</div>';
var said=T.said[sv],todo=vl(sv).filter(function(l){return !l.st}).length,ch='';
if(said!=null){var d=said-tot;ch=Math.abs(d)<0.005?'<span class="lo">✓ مطابق</span>':'<span class="wr">الفرق '+(d>0?'+':'')+n2(d)+'</span>'}
h+='<div class="card"><label><span>مجموع '+esc(vend(sv).n)+'</span><span>'+(todo?'بقي '+todo+' غير مشترى':'')+'</span></label><div class="tot">'+money(tot)+'</div><div class="sm">'+money2(tot)+'</div><label style="margin:10px 0 6px"><span>قال البائع</span>'+ch+'</label>'+mf('said',said)+'</div>';
var L=vl(sv);
if(!L.length)h+='<p class="em">لا أغراض عند هذا البائع.</p>';
else h+='<div class="list">'+L.map(function(l){
if(!l.st){var P=D.P[l.n]||[],x=P[P.length-1];return '<div class="row td" data-a="ent" data-id="'+l.id+'"><div class="g"><b>'+esc(l.n)+'</b><span class="sm">'+(x?'آخر ثمن '+lt(x.p,(D.I[l.n]||{}).u):'لم يُشترَ بعد')+'</span></div></div>'}
var c=l.m==='a'?null:cmp(l.n,l.p,l.m,l.id),tg=c?'<span class="sm '+c.c+'">'+(c.c==='lo'?'↓ ':c.c==='hi'?'↑ ':'')+'كان '+trim(c.last)+'</span>':'';
return '<div class="row" data-a="ent" data-id="'+l.id+'"><div class="g"><b>'+esc(l.n)+'</b><span class="sm">'+qtxt(l)+'</span></div><div class="e"><b>'+n2(cost(l))+'</b>'+tg+'</div></div>'}).join('')+'</div>';
var pd=T.pay[sv];
h+='<div class="bar"><button class="sq" data-a="addhere" aria-label="إضافة غرض">'+ic('plus')+'</button><button class="pri" data-a="pay">'+(pd!=null?'دُفع '+n2(pd)+' — تعديل':'تأكيد الدفع لـ'+esc(vend(sv).n))+'</button></div>';
return h}
function vTally(){var T=D.T,sp=spent(),h='<div class="card">';var any=false;
D.V.forEach(function(v){var t=vtot(v.id),p=T.pay[v.id];if(!t&&p==null)return;any=true;h+='<div class="sum"><span>'+esc(v.n)+(p!=null&&Math.abs(p-t)>0.004?'<br><span class="sm">الحساب '+n2(t)+'</span>':'')+'</span><b>'+money(p!=null?p:t)+'</b></div>'});
if(!any)h+='<p class="em">لم تشترِ شيئًا بعد.</p>';
h+='<div class="sum"><span>مجموع ما صُرف</span><b>'+money(sp)+'</b></div><div class="sum"><span>خرجت بـ</span><b>'+money(T.b)+'</b></div></div>';
var ex=T.b-sp,ch='';if(T.real!=null){var d=T.real-ex;ch=Math.abs(d)<0.005?'<span class="lo">✓ مطابق</span>':'<span class="wr">الفرق '+(d>0?'+':'')+n2(d)+'</span>'}
h+='<div class="card"><label>المفروض في جيبي الآن</label><div class="tot">'+money(ex)+'</div><div class="sm">'+money2(ex)+'</div><label style="margin:10px 0 6px"><span>ما في جيبي فعلًا</span>'+ch+'</label>'+mf('real',T.real)+'</div><button class="pri" data-a="fin">إنهاء الجولة</button><div style="height:16px"></div>';
return h}
function render(){LIVE=null;$('#ttl').textContent=['تحضير القائمة','عند البائع','جرد الجيب'][S.tab];$('#gear').innerHTML=ic('gear');
$('#nav').innerHTML=['list','basket','receipt'].map(function(i,k){return '<button data-a="tab" data-id="'+k+'" class="'+(S.tab===k?'on':'')+'">'+ic(i)+'<span>'+['التحضير','عند البائع','الجرد'][k]+'</span></button>'}).join('');
$('#m').innerHTML=[vPrep,vShop,vTally][S.tab]()}
function es(id){var l=fl(id),it=D.I[l.n]||{},E={m:l.m||it.m||'w',q:l.q||1,k:'kg'},u0=it.u||D.s.prim,p0=l.m==='a'?0:l.p||0,a0=l.m==='a'?l.a||0:0;
function step(){return E.m==='n'?1:0.25}
function showQ(){var e=$('#qv');if(e)e.value=E.m==='w'&&E.k==='g'?Math.round(E.q*1000):trim(E.q)}
function upd(){var m=E.m,p=mv('pf'),c=m==='a'?0:p*E.q,v=m==='a'?p:c,cc=m==='a'?null:cmp(l.n,p,m,l.id);
$('#eq').textContent=U.pf==='DH'?'= '+R(p)+' ريال':'= '+n2(p)+' درهم';
$('#hint').innerHTML=cc?'<span class="'+cc.c+'">'+(cc.c==='lo'?'↓ أرخص من المعتاد':cc.c==='hi'?'↑ أغلى من المعتاد':'ثمن عادي')+' · كان '+lt(cc.last,U.pf)+'</span>':'';
$('#qt').textContent=m==='a'?'':m==='n'?trim(E.q)+' حبة':trim(E.q)+' كغ';$('#r').textContent=money(v);$('#sec').textContent=money2(v);
document.querySelectorAll('.q').forEach(function(b){b.classList.toggle('on',Math.abs(+b.dataset.q-E.q)<0.0001)})}
function draw(){var m=E.m,h=hd(l.n)+'<div class="seg3">'+[['w','بالوزن'],['a','بمبلغ'],['n','بالعدد']].map(function(a){return '<button data-a="mode" data-id="'+a[0]+'" class="'+(m===a[0]?'on':'')+'">'+a[1]+'</button>'}).join('')+'</div>';
h+='<label><span>'+(m==='a'?'المبلغ':m==='w'?'ثمن الكيلو اليوم':'ثمن الحبة')+'</span><span id="hint"></span></label>'+mf('pf',m==='a'?a0:p0,u0)+'<div class="sm" id="eq" style="margin:4px 0 10px"></div>';
if(m!=='a'){var ch=m==='w'?[0.25,0.5,0.75,1,2]:[1,2,5,10,15,30];
h+='<label>الكمية</label><div class="qr"><button data-a="qd" data-id="-1">'+ic('minus')+'</button><input id="qv" inputmode="decimal"><button data-a="qd" data-id="1">'+ic('plus')+'</button>'+(m==='w'?'<div class="seg"><button class="on" data-a="ku" data-id="kg">كغ</button><button data-a="ku" data-id="g">غ</button></div>':'')+'</div><div class="chips">'+ch.map(function(x){return '<button class="q" data-a="qc" data-id="'+x+'" data-q="'+x+'">'+({0.25:'¼',0.5:'½',0.75:'¾'}[x]||x)+'</button>'}).join('')+'</div>'}
h+='<div class="res"><div><div class="sm" id="qt"></div><div class="sm" id="sec"></div></div><div class="big" id="r"></div></div><div class="sm" id="er" style="color:var(--hi);margin-top:6px"></div><button class="pri" data-a="ok">حفظ</button>'+(l.st?'<button class="sec" data-a="undo">إلغاء الشراء</button>':'');
open(h);showQ();E.k='kg';LIVE=upd;upd()}
EL={mode:function(b){if(E.m==='a')a0=mv('pf');else p0=mv('pf');u0=U.pf;E.m=b.dataset.id;E.q=E.m==='n'?1:(E.q>=1&&E.q%1===0&&E.m==='w'?1:E.q);draw()},
qd:function(b){E.q=Math.max(step(),Math.round((E.q+(+b.dataset.id)*step())*1000)/1000);showQ();upd()},
qc:function(b){E.q=+b.dataset.id;showQ();upd()},
ku:function(b){E.k=b.dataset.id;b.parentNode.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b)});showQ()},
qin:function(){var v=num($('#qv').value);E.q=E.m==='w'&&E.k==='g'?v/1000:v;upd()},
ok:function(){var p=mv('pf');if(p<=0){$('#er').textContent='أدخل الثمن أولًا';return}if(E.m!=='a'&&E.q<=0){$('#er').textContent='أدخل الكمية';return}
D.P[l.n]=(D.P[l.n]||[]).filter(function(x){return x.lid!==l.id});
l.m=E.m;if(E.m==='a'){l.a=p;l.p=0;l.q=0}else{l.p=p;l.q=E.q;l.a=0}l.st=1;
D.P[l.n].push({p:E.m==='a'?p:p,t:Date.now(),m:E.m,lid:l.id});D.I[l.n]=D.I[l.n]||{};D.I[l.n].v=l.v;D.I[l.n].m=E.m;D.I[l.n].u=U.pf;save();close();render()},
undo:function(){l.st=0;D.P[l.n]=(D.P[l.n]||[]).filter(function(x){return x.lid!==l.id});save();close();render()}};
draw()}
var ACT={tab:function(b){S.tab=+b.dataset.id;close();render();$('#m').scrollTop=0},
av:function(b){S.av=b.dataset.id;$('#vc').innerHTML=vchips()},
add:function(){var n=$('#nm').value.trim();if(!n)return;if(D.T.L.some(function(l){return l.n===n&&!l.st})){toast('موجود في القائمة');return}addLine(n,S.av);render()},
quick:function(b){addLine(b.dataset.id,D.I[b.dataset.id].v);render()},
sv:function(b){S.v=b.dataset.id;render()},
ent:function(b){es(b.dataset.id)},
close:function(){close()},
pedit:function(b){var l=fl(b.dataset.id);EL={id:l.id};open(hd(l.n)+'<label>البائع</label><div class="chips" style="margin:0 0 10px">'+D.V.map(function(v){return '<button class="chip'+(l.v===v.id?' on':'')+'" style="--c:'+v.c+'" data-a="setv" data-id="'+v.id+'">'+esc(v.n)+'</button>'}).join('')+'</div><button class="sec" data-a="del" style="color:var(--hi)">حذف من القائمة</button>')},
setv:function(b){var l=fl(EL.id);l.v=b.dataset.id;D.I[l.n]=D.I[l.n]||{};D.I[l.n].v=l.v;save();close();render()},
del:function(){var l=fl(EL.id);D.T.L=D.T.L.filter(function(x){return x!==l});D.P[l.n]=(D.P[l.n]||[]).filter(function(x){return x.lid!==l.id});save();close();render()},
addhere:function(){open(hd('غرض جديد عند '+vend(S.v).n)+'<input id="nm2" list="dl" placeholder="اسم الغرض" autocomplete="off"><datalist id="dl">'+Object.keys(D.I).map(function(n){return '<option value="'+esc(n)+'">'}).join('')+'</datalist><button class="pri" data-a="addok">متابعة</button>')},
addok:function(){var n=$('#nm2').value.trim();if(!n)return;var l=D.T.L.filter(function(x){return x.n===n&&x.v===S.v&&!x.st})[0]||addLine(n,S.v);es(l.id)},
pay:function(){var sv=S.v,t=vtot(sv),p=D.T.pay[sv];function upd(){var o=spent()-(D.T.pay[sv]!=null?D.T.pay[sv]:t);$('#pk').textContent=money(D.T.b-o-mv('pf2'))}
open(hd('الدفع لـ'+vend(sv).n)+'<div class="sm">حساب التطبيق: '+money(t)+'</div><label style="margin-top:8px">المبلغ الذي دفعته فعلًا</label>'+mf('pf2',p!=null?p:t)+'<div class="res"><span class="sm">الباقي في جيبي</span><b id="pk"></b></div><button class="pri" data-a="payok">تأكيد</button>'+(p!=null?'<button class="sec" data-a="payno">إلغاء التأكيد</button>':''));LIVE=upd;upd()},
payok:function(){D.T.pay[S.v]=mv('pf2');save();close();render()},
payno:function(){delete D.T.pay[S.v];save();close();render()},
fin:function(){open(hd('إنهاء الجولة؟')+'<p>الأغراض التي لم تُشترَ تبقى في القائمة القادمة.</p><button class="pri" data-a="finok">إنهاء وحفظ</button><button class="sec" data-a="close">رجوع</button>')},
finok:function(){D.H.unshift({t:Date.now(),b:D.T.b,sp:spent()});D.H=D.H.slice(0,50);D.T={b:0,L:D.T.L.filter(function(l){return !l.st}),pay:{},said:{}};save();close();S.tab=0;render()},
set:function(){var h=hd('الإعدادات')+'<label>الوحدة الكبيرة في العرض</label><div class="seg3">'+[['DH','درهم'],['R','ريال']].map(function(a){return '<button data-a="prim" data-id="'+a[0]+'" class="'+(D.s.prim===a[0]?'on':'')+'">'+a[1]+'</button>'}).join('')+'</div><label>البائعون</label>';
D.V.forEach(function(v){h+='<div class="vr"><input data-c="vn" data-id="'+v.id+'" value="'+esc(v.n)+'"><button data-a="vdel" data-id="'+v.id+'">'+ic('trash')+'</button></div>'});
h+='<div class="vr"><input id="nv" placeholder="بائع جديد"><button data-a="vadd" style="color:var(--ac)">'+ic('plus')+'</button></div><label style="margin-top:12px">نسخة احتياطية</label><textarea id="bk"></textarea><div class="seg3" style="margin-top:8px"><button data-a="bcopy">نسخ البيانات</button><button data-a="brest">استرجاع من النص</button></div>';open(h)},
prim:function(b){D.s.prim=b.dataset.id;save();ACT.set();render()},
vdel:function(b){var id=b.dataset.id;if(D.V.length<2||vl(id).length){toast('لا يمكن الحذف: عنده أغراض أو هو الأخير');return}D.V=D.V.filter(function(v){return v.id!==id});save();ACT.set();render()},
vadd:function(){var n=$('#nv').value.trim();if(!n)return;D.V.push({id:'v'+uid(),n:n,c:COL[D.V.length%COL.length]});save();ACT.set();render()},
bcopy:function(){var t=JSON.stringify(D);$('#bk').value=t;try{navigator.clipboard.writeText(t).then(function(){toast('تم النسخ')},function(){toast('حدد النص وانسخه')})}catch(e){toast('حدد النص وانسخه')}},
brest:function(){try{var x=JSON.parse($('#bk').value);if(!x.V||!x.T)throw 0;D=x;save();close();render();toast('تم الاسترجاع')}catch(e){toast('النص غير صالح')}}};
var CHG={bud:function(){D.T.b=mv('bud');save();render()},said:function(){var v=mv('said');if(v>0)D.T.said[S.v]=v;else delete D.T.said[S.v];save();render()},
real:function(){var v=mv('real');if(v>0)D.T.real=v;else delete D.T.real;save();render()},
vn:function(e){var v=vend(e.dataset.id);if(v&&e.value.trim()){v.n=e.value.trim();save();render()}}};
document.addEventListener('click',function(e){var b=e.target.closest('[data-a],[data-f]');if(!b)return;
if(b.dataset.f){var f=b.dataset.f,dh=mv(f);U[f]=b.dataset.u;$('#'+f).value=dh?(U[f]==='DH'?trim(dh):String(R(dh))):'';b.parentNode.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b)});if(LIVE)LIVE();return}
var a=b.dataset.a;if(EL&&EL[a]&&$('#sh').classList.contains('o')&&a!=='close'&&a!=='setv'&&a!=='del'){EL[a](b);return}if(ACT[a])ACT[a](b)});
document.addEventListener('input',function(e){var t=e.target;if(t.id==='nm'){var it=D.I[t.value.trim()];if(it&&vend(it.v)){S.av=it.v;$('#vc').innerHTML=vchips()}}
if(t.id==='qv'&&EL&&EL.qin){EL.qin();return}if(LIVE)LIVE()});
document.addEventListener('change',function(e){var c=e.target.dataset.c;if(c&&CHG[c]&&!$('#sh').classList.contains('o'))CHG[c](e.target);else if(c==='vn')CHG.vn(e.target)});
load();render()})();
