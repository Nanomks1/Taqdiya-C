(function(){'use strict';var Q=TQ,D=Q.D,S=Q.S,U=Q.U,A=Q.ACT,$=Q.$,mv=Q.mv,esc=Q.esc;
A.tab=function(b){S.tab=+b.dataset.id;Q.close();Q.render();$('#m').scrollTop=0};
A.close=function(){Q.close()};
A.av=function(b){S.av=b.dataset.id;$('#vc').innerHTML=Q.vchips()};
A.add=function(){var n=$('#nm').value.trim();if(!n)return;if(D.T.L.some(function(l){return l.n===n&&!l.st})){Q.toast('موجود في القائمة');return}Q.addLine(n,S.av);Q.render()};
A.quick=function(b){Q.addLine(b.dataset.id,D.I[b.dataset.id].v);Q.render()};
A.sv=function(b){S.v=b.dataset.id;Q.render()};
A.addhere=function(){Q.open(Q.hd('غرض جديد عند '+Q.vend(S.v).n)+'<input id="nm2" list="dl" placeholder="اسم الغرض" autocomplete="off"><datalist id="dl">'+Object.keys(D.I).map(function(n){return '<option value="'+esc(n)+'">'}).join('')+'</datalist><button class="pri" data-a="addok">متابعة</button>')};
A.addok=function(){var n=$('#nm2').value.trim();if(!n)return;var l=D.T.L.filter(function(x){return x.n===n&&x.v===S.v&&!x.st})[0]||Q.addLine(n,S.v);Q.es(l.id)};
A.pay=function(){var sv=S.v,t=Q.vtot(sv),p=D.T.pay[sv];function upd(){var o=Q.spent()-(D.T.pay[sv]!=null?D.T.pay[sv]:t),d=t-mv('pf2');$('#pk').textContent=Q.money(D.T.b-o-mv('pf2'));$('#pl').innerHTML=Math.abs(d)>0.004?'<button class="sec" data-a="payleft">سجّل الفرق كعالق: '+(d>0?'بقا ليه عندي ':'بقا ليا عندو ')+Q.money(Math.abs(d))+'</button>':''}
Q.open(Q.hd('الدفع لـ'+Q.vend(sv).n)+'<div class="sm">حساب التطبيق: '+Q.money(t)+'</div><label style="margin-top:8px">المبلغ الذي دفعته فعلًا</label>'+Q.mf('pf2',p!=null?p:t)+'<div class="res"><span class="sm">الباقي في جيبي</span><b id="pk"></b></div><div id="pl"></div><button class="pri" data-a="payok">تأكيد</button>'+(p!=null?'<button class="sec" data-a="payno">إلغاء التأكيد</button>':''));Q.live=upd;upd()};
A.payok=function(){D.T.pay[S.v]=mv('pf2');Q.save();Q.close();Q.render()};
A.payno=function(){delete D.T.pay[S.v];Q.save();Q.close();Q.render()};
A.fin=function(){Q.open(Q.hd('إنهاء الجولة؟')+'<p>تُحفظ الجولة في السجل، والأغراض التي لم تُشترَ تبقى في القائمة القادمة.</p><button class="pri" data-a="finok">إنهاء وحفظ</button><button class="sec" data-a="close">رجوع</button>')};
A.finok=function(){Q.finish();Q.close();S.tab=0;Q.render();if(Q.bk)Q.bk.auto(true)};
var CHG={bud:function(){D.T.b=mv('bud');Q.save();Q.render()},said:function(){var v=mv('said');if(v>0)D.T.said[S.v]=v;else delete D.T.said[S.v];Q.save();Q.render()},
real:function(){var v=mv('real');if(v>0)D.T.real=v;else delete D.T.real;Q.save();Q.render()},
vn:function(e){var v=Q.vend(e.dataset.id);if(v&&e.value.trim()){v.n=e.value.trim();Q.save();Q.render()}}};
document.addEventListener('click',function(e){var b=e.target.closest('[data-a],[data-f]');if(!b)return;
if(b.dataset.f){var f=b.dataset.f,dh=mv(f);U[f]=b.dataset.u;$('#'+f).value=dh?(U[f]==='DH'?Q.trim(dh):String(Q.R(dh))):'';b.parentNode.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b)});if(Q.live)Q.live();return}
var a=A[b.dataset.a];if(a)a(b)});
document.addEventListener('input',function(e){var t=e.target;if(t.id==='nm'){var it=D.I[t.value.trim()];if(it&&Q.vend(it.v)){S.av=it.v;$('#vc').innerHTML=Q.vchips()}}if(Q.live)Q.live()});
document.addEventListener('change',function(e){var c=e.target.dataset.c,open=$('#sh').classList.contains('o');if(c&&CHG[c]&&(!open||c==='vn'))CHG[c](e.target)});
A.exp=function(){Q.open(Q.hd('مصروف عابر')+'<input id="el" placeholder="مثلًا: خبز" autocomplete="off"><div class="chips">'+['خبز','طاكسي','كيس','ماء'].map(function(n){return '<button class="chip" data-a="expl" data-id="'+n+'">'+n+'</button>'}).join('')+'</div><label style="margin-top:10px">المبلغ</label>'+Q.mf('ea',0)+'<button class="pri" data-a="expok">إضافة</button>')};
A.expl=function(b){$('#el').value=b.dataset.id};
A.expok=function(){var a=mv('ea');if(a<=0){Q.toast('أدخل المبلغ');return}D.T.ex.push({id:Q.uid(),l:$('#el').value.trim()||'مصروف',a:a});Q.save();Q.close();Q.render();Q.toast('أُضيف المصروف')};
A.expx=function(b){D.T.ex=D.T.ex.filter(function(x){return x.id!==b.dataset.id});Q.save();Q.render()};
A.bal=function(){var v=S.v,o=D.O[v]||0;S.bs=o<0?'-':'+';Q.open(Q.hd('العالق مع '+Q.vend(v).n)+'<div class="seg3"><button data-a="bsg" data-id="+" class="'+(S.bs==='+'?'on':'')+'">بقا ليه عندي</button><button data-a="bsg" data-id="-" class="'+(S.bs==='-'?'on':'')+'">بقا ليا عندو</button></div>'+Q.mf('ba',Math.abs(o))+'<button class="pri" data-a="balok">حفظ</button><button class="sec" data-a="balno">مسح العالق</button>')};
A.bsg=function(b){S.bs=b.dataset.id;b.parentNode.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b)})};
A.balok=function(){var a=mv('ba');if(a>0.004)D.O[S.v]=S.bs==='+'?a:-a;else delete D.O[S.v];Q.save();Q.close();Q.render()};
A.balno=function(){delete D.O[S.v];Q.save();Q.close();Q.render()};
A.payleft=function(){var d=Q.vtot(S.v)-mv('pf2'),o=Math.round(((D.O[S.v]||0)+d)*100)/100;D.T.pay[S.v]=mv('pf2');if(Math.abs(o)>0.004)D.O[S.v]=o;else delete D.O[S.v];Q.save();Q.close();Q.render()};
var SH=null;function copyT(t){try{navigator.clipboard.writeText(t).then(function(){Q.toast('تم نسخ القائمة')},function(){Q.toast('تعذّرت المشاركة')})}catch(e){Q.toast('تعذّرت المشاركة')}}
A.share=function(){var t=Q.shareText();try{SH=SH||Capacitor.registerPlugin('Share')}catch(e){}if(SH&&SH.share)SH.share({text:t}).catch(function(){copyT(t)});else copyT(t)};
var APP=null,lastBk=0;try{APP=Capacitor.registerPlugin('App')}catch(e){}
if(APP&&APP.addListener)APP.addListener('backButton',function(){if($('#sh').classList.contains('o')){Q.close();return}var n=Date.now();if(n-lastBk<2000)APP.exitApp();else{lastBk=n;Q.toast('اضغط مرة أخرى للخروج')}});
Q.load();Q.render()})();
