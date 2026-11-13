(function(){'use strict';var Q=TQ,D=Q.D,U=Q.U,R=Q.R,trim=Q.trim,num=Q.num,$=function(s){return document.querySelector(s)};
var IC={plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',x:'<path d="M18 6L6 18M6 6l12 12"/>',
list:'<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',basket:'<path d="M3 10h18l-2 10H5zM8 10l4-6 4 6"/>',
receipt:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6"/>',gear:'<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'};
Q.ic=function(n){return '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+IC[n]+'</svg>'};
Q.ACT={};Q.live=null;
Q.open=function(h){$('#sh').innerHTML='<div class="bk" data-a="close"></div><div class="pn">'+h+'</div>';$('#sh').classList.add('o')};
Q.close=function(){$('#sh').classList.remove('o');$('#sh').innerHTML='';Q.live=null};
Q.hd=function(t,back){return '<div class="hd">'+(back?'<button class="ib" data-a="'+back+'">›</button>':'')+'<b>'+Q.esc(t)+'</b><button class="ib" data-a="close">'+Q.ic('x')+'</button></div>'};
Q.toast=function(m,undo){var t=$('#ts');t.innerHTML='';var s=document.createElement('span');s.textContent=m;t.appendChild(s);
if(undo){var b=document.createElement('button');b.textContent='تراجع';b.onclick=function(){t.classList.remove('o');undo()};t.appendChild(b)}
t.classList.add('o');clearTimeout(Q.toast.t);Q.toast.t=setTimeout(function(){t.classList.remove('o')},undo?5000:1800)};
Q.mf=function(id,dh,u){u=u||U[id]||D.s.prim;U[id]=u;var v=dh?(u==='DH'?trim(dh):String(R(dh))):'';return '<div class="mf"><input id="'+id+'" data-c="'+id+'" inputmode="decimal" value="'+v+'"><div class="seg">'+['DH','R'].map(function(k){return '<button data-f="'+id+'" data-u="'+k+'" class="'+(u===k?'on':'')+'">'+(k==='DH'?'درهم':'ريال')+'</button>'}).join('')+'</div></div>'};
Q.mv=function(id){var e=$('#'+id);if(!e)return 0;var v=num(e.value);return U[id]==='DH'?v:v/20};
Q.$=$})();
