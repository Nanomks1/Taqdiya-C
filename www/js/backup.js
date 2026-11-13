(function(){'use strict';var Q=TQ,D=Q.D,AF=null,lastB=0,timer=null;
try{AF=window.Capacitor&&Capacitor.registerPlugin?Capacitor.registerPlugin('AllFiles'):null}catch(e){}
function call(m,a){if(!AF)return Promise.reject(new Error('no plugin'));return AF[m](a||{})}
function payload(){return JSON.stringify({app:'taqdiya',v:2,t:Date.now(),d:D})}
function empty(){return !Object.keys(D.I).length&&!D.H.length&&!D.T.L.length}
function auto(force){if(empty())return Promise.resolve();var n=Date.now();if(!force&&n-lastB<120000)return Promise.resolve();lastB=n;
return call('status').then(function(s){if(!s.granted)return;var k=(+localStorage.getItem('tq2n')||0)%5+1;localStorage.setItem('tq2n',k);return call('write',{name:'auto-'+k+'.json',data:payload()})}).catch(function(){})}
Q.onSave=function(){clearTimeout(timer);timer=setTimeout(function(){auto(false)},20000)};
document.addEventListener('visibilitychange',function(){if(document.hidden)auto(true)});
function manual(){if(empty())return Promise.reject(new Error('empty'));var d=new Date(),p=function(x){return (x<10?'0':'')+x};
var nm='manual-'+d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())+'-'+p(d.getHours())+p(d.getMinutes())+'.json';
return call('write',{name:nm,data:payload()}).then(function(){return call('list')}).then(function(r){var m=r.files.filter(function(f){return f.name.indexOf('manual-')===0}).sort(function(a,b){return b.mod-a.mod});
return Promise.all(m.slice(10).map(function(f){return call('remove',{name:f.name})}))})}
function restore(name){return call('read',{name:name}).then(function(r){var o=JSON.parse(r.data);o=o.d||o;if(!o||!o.V||!o.T)throw new Error('bad');
var pre=empty()?Promise.resolve():call('write',{name:'pre-restore.json',data:payload()});return pre.then(function(){Q.setD(o);Q.save();Q.render()})})}
Q.bk={call:call,auto:auto,manual:manual,restore:restore,has:function(){return !!AF}}})();
