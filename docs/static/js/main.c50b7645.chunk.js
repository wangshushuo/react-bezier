(this["webpackJsonpreact-bezier"]=this["webpackJsonpreact-bezier"]||[]).push([[0],[,,,,function(e,t,r){e.exports=r(11)},,,,,function(e,t,r){},function(e,t,r){},function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n),a=r(2),i=r.n(a),l=(r(9),r(10),r(3)),c=window.innerWidth,s=c>=720?1:c/720,d=500*s,f=new l.a;f.addPoint(10*s,10*s),f.addPoint(100*s,300*s),f.addPoint(200*s,20*s),f.addPoint(350*s,400*s),f.addPoint(500*s,20*s);var h=function(){var e=Object(n.useRef)(null);return Object(n.useLayoutEffect)((function(){if(e.current){var t=e.current.getContext("2d");if(!t)return;var r=f.getPointArray(),n=.05*d,o=n,a=1.1*d-n;t.beginPath(),t.moveTo(o,o),t.lineTo(o,a),t.lineTo(a,a),t.strokeStyle="darkred",t.stroke(),t.closePath();var i=d/100;t.font="".concat(20*s,"px serif"),t.fillText("0",o-2*i,a+2*i),t.fillStyle="darkred";for(var l=1;l<=10;l++)t.fillText(l+"",o+l*d/10,a+2*i);for(var c=1;c<=10;c++)t.fillText(c+"",o-2*i,a-c*d/10);t.beginPath();for(var h=0;h<r.length;h++){var u=r[h];0===h&&t.moveTo(o+u.x,a-u.y),t.lineTo(o+u.x,a-u.y)}t.strokeStyle="darkgreen",t.stroke(),t.closePath();for(var v=0;v<r.length;v++){var g=r[v],m=o+g.x,k=a-g.y;t.moveTo(m,k),t.beginPath(),t.arc(m,k,i,0,2*Math.PI,!0),t.closePath(),t.fillStyle="darkgreen",t.fill(),t.fillText(v+"",m+5,k+2)}t.strokeStyle="darkgreen",t.stroke(),t.beginPath(),t.moveTo(o+r[0].x,a-r[0].y),t.lineWidth=2;for(var y=1;y<d;y++){var P=a,b=y/d,x=o+f.bezier_x(b),w=P-f.bezier_y(b);t.lineTo(x,w)}t.strokeStyle="blue",t.stroke(),t.closePath()}})),o.a.createElement("div",{className:"App"},o.a.createElement("h1",null,"\u8d1d\u585e\u5c14\u66f2\u7ebf"),o.a.createElement("canvas",{ref:e,width:1.1*d,height:1.1*d,style:{margin:0,border:"1px solid #000"}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(h,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[4,1,2]]]);
//# sourceMappingURL=main.c50b7645.chunk.js.map