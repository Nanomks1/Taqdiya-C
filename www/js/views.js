(function(){'use strict';var Q=TQ,D=Q.D,S=Q.S,esc=Q.esc,ic=Q.ic,n2=Q.n2,money=Q.money,money2=Q.money2,mf=Q.mf,trim=Q.trim;
function vchips(){return D.V.map(function(v){return '<button class="chip'+(S.av===v.id?' on':'')+'" style="--c:'+v.c+'" data-a="av" data-id="'+v.id+'"><i style="background:'+v.c+'"></i>'+esc(v.n)+'</button>'}).join('')}
Q.vchips=vchips;
function vPrep(){S.av=S.av&&Q.vend(S.av)?S.av:D.V[0].id;
var h='<div class="card"><label>شحال في جيبي</label>'+mf('bud',D.T.b)+'</div>';
h+='<div class="card"><label>غرض نفد</label><input id="nm" list="dl" placeholder="اسم الغرض" autocomplete="off"><datalist id="dl">'+Object.keys(D.I).map(function(n){return '<option value="'+esc(n)+'">'}).join('')+'</datalist><div class="chips" id="vc">'+vchips()+'</div><button class="pri" data-a="add">إضافة</button></div>';
var fr=Q.freq();if(fr.length)h+='<div class="card"><label>متكرّرة</label><div class="chips" style="margin:0">'+fr.map(function(n){return '<button class="chip" data-a="quick" data-id="'+esc(n)+'">+ '+esc(n)+'</button>'}).join('')+'</div></div>';
D.V.forEach(function(v){var L=Q.vl(v.id);if(!L.length)return;h+='<div class="vh"><i style="background:'+v.c+'"></i>'+esc(v.n)+'<span>'+L.length+'</span></div><div class="list">'+L.map(function(l){return '<div class="row" data-a="pedit" data-id="'+l.id+'"><div class="g"><b'+(l.st?' class="dn"':'')+'>'+esc(l.n)+'</b></div>'+(l.st?'<span class="sm">اشتُري</span>':'')+'</div>'}).join('')+'</div>'});
return h}
function vShop(){var T=D.T,sp=Q.spent();
if(!S.v||!Q.vend(S.v))S.v=(D.V.filter(function(v){return Q.vl(v.id).length})[0]||D.V[0]).id;var sv=S.v,tot=Q.vtot(sv);
var h='<div class="strip">'+[['خرجت بـ',T.b],['صرفت',sp],['الباقي',T.b-sp]].map(function(a,i){return '<div><span>'+a[0]+'</span><b'+(i===2&&a[1]<0?' class="hi"':'')+'>'+money(a[1])+'</b><em>'+money2(a[1])+'</em></div>'}).join('')+'</div>';
h+='<div class="tabs">'+D.V.map(function(v){var n=Q.vl(v.id).filter(function(l){return !l.st}).length;return '<button class="chip'+(sv===v.id?' on':'')+'" style="--c:'+v.c+'" data-a="sv" data-id="'+v.id+'">'+esc(v.n)+(n?' <small>'+n+'</small>':'')+'</button>'}).join('')+'</div>';
var said=T.said[sv],todo=Q.vl(sv).filter(function(l){return !l.st}).length,ch='';
if(said!=null){var d=said-tot;ch=Math.abs(d)<0.005?'<span class="lo">✓ مطابق</span>':'<span class="wr">الفرق '+(d>0?'+':'')+n2(d)+'</span>'}
h+='<div class="card"><label><span>مجموع '+esc(Q.vend(sv).n)+'</span><span>'+(todo?'بقي '+todo+' غير مشترى':'')+'</span></label><div class="tot">'+money(tot)+'</div><div class="sm">'+money2(tot)+'</div><label style="margin:10px 0 6px"><span>قال البائع</span>'+ch+'</label>'+mf('said',said)+'</div>';
var L=Q.vl(sv);
if(!L.length)h+='<p class="em">لا أغراض عند هذا البائع.</p>';
else h+='<div class="list">'+L.map(function(l){
if(!l.st){var x=Q.lastP(l.n,(D.I[l.n]||{}).m||'w',l.id);return '<div class="row td" data-a="ent" data-id="'+l.id+'"><div class="g"><b>'+esc(l.n)+'</b><span class="sm">'+(x?'آخر ثمن '+Q.lt(x,(D.I[l.n]||{}).u):'لم يُشترَ بعد')+'</span></div></div>'}
var c=l.m==='a'?null:Q.cmp(l.n,l.p,l.m,l.id),tg=c?'<span class="sm '+c.c+'">'+(c.c==='lo'?'↓ ':c.c==='hi'?'↑ ':'')+'كان '+trim(c.last)+'</span>':'';
return '<div class="row" data-a="ent" data-id="'+l.id+'"><div class="g"><b>'+esc(l.n)+'</b><span class="sm">'+Q.qtxt(l)+'</span></div><div class="e"><b>'+n2(Q.cost(l))+'</b>'+tg+'</div></div>'}).join('')+'</div>';
var pd=T.pay[sv];
h+='<div class="bar"><button class="sq" data-a="addhere" aria-label="إضافة غرض">'+ic('plus')+'</button><button class="pri" data-a="pay">'+(pd!=null?'دُفع '+n2(pd)+' — تعديل':'تأكيد الدفع لـ'+esc(Q.vend(sv).n))+'</button></div>';
return h}
function vTally(){var T=D.T,sp=Q.spent(),h='<div class="card">',any=false;
D.V.forEach(function(v){var t=Q.vtot(v.id),p=T.pay[v.id];if(!t&&p==null)return;any=true;h+='<div class="sum"><span>'+esc(v.n)+(p!=null&&Math.abs(p-t)>0.004?'<br><span class="sm">الحساب '+n2(t)+'</span>':'')+'</span><b>'+money(p!=null?p:t)+'</b></div>'});
if(!any)h+='<p class="em">لم تشترِ شيئًا بعد.</p>';
h+='<div class="sum"><span>مجموع ما صُرف</span><b>'+money(sp)+'</b></div><div class="sum"><span>خرجت بـ</span><b>'+money(T.b)+'</b></div></div>';
var ex=T.b-sp,ch='';if(T.real!=null){var d=T.real-ex;ch=Math.abs(d)<0.005?'<span class="lo">✓ مطابق</span>':'<span class="wr">الفرق '+(d>0?'+':'')+n2(d)+'</span>'}
h+='<div class="card"><label>المفروض في جيبي الآن</label><div class="tot">'+money(ex)+'</div><div class="sm">'+money2(ex)+'</div><label style="margin:10px 0 6px"><span>ما في جيبي فعلًا</span>'+ch+'</label>'+mf('real',T.real)+'</div><button class="pri" data-a="fin">إنهاء الجولة</button><div style="height:16px"></div>';
return h}
Q.render=function(){Q.live=null;var $=Q.$;$('#ttl').textContent=['تحضير القائمة','عند البائع','جرد الجيب'][S.tab];$('#gear').innerHTML=ic('gear');$('#hist').innerHTML=ic('clock');
$('#nav').innerHTML=['list','basket','receipt'].map(function(i,k){return '<button data-a="tab" data-id="'+k+'" class="'+(S.tab===k?'on':'')+'">'+ic(i)+'<span>'+['التحضير','عند البائع','الجرد'][k]+'</span></button>'}).join('');
$('#m').innerHTML=[vPrep,vShop,vTally][S.tab]()}})();
