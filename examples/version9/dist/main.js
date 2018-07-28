!function(t){var i={};function s(e){if(i[e])return i[e].exports;var h=i[e]={i:e,l:!1,exports:{}};return t[e].call(h.exports,h,h.exports,s),h.l=!0,h.exports}s.m=t,s.c=i,s.d=function(t,i,e){s.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:e})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,i){if(1&i&&(t=s(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(s.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var h in t)s.d(e,h,function(i){return t[i]}.bind(null,h));return e},s.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(i,"a",i),i},s.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},s.p="",s(s.s=0)}([function(t,i,s){"use strict";s.r(i);class e{constructor(t,i,s,e){this.id="BubblePath"+Date.now(),this.canvas=t,this.pointer=s,this.x=i.x,this.y=i.y,this.w=i.w,this.h=i.h,this.radius=Math.min(i.h,i.w)/5,this.fabricPathText=[],this.bubble={},this.backgroundColor=i.backgroundColor,this.lineColor=i.lineColor,this.lineWidth=i.lineWidth,this.direction,this.bordersOptions={borderColor:"red",cornerColor:"green",cornerSize:7,transparentCorners:!1},this.extendFabricPathBubble(e)}extendFabricPathBubble(t){let i=this;t[i.id]=t.util.createClass(t.Path,{type:i.id,initialize:function(t){this.callSuper("initialize",t)},toObject:function(){return i.pointer.setVisible(!1),{type:"BubblePath",bubbleOptions:{x:i.x,y:i.y,w:i.w,h:i.h,lineWidth:i.lineWidth,lineColor:i.lineColor,backgroundColor:i.backgroundColor},pointerOptions:{x:i.pointer.x,y:i.pointer.y,radius:i.pointer.radius,color:i.pointer.color}}}}),t[i.id].async=!0}beginPath(){this.fabricPathText=[]}moveTo(t,i){this.fabricPathText.push(["M",t,i])}lineTo(t,i){this.fabricPathText.push(["L",t,i])}quadraticCurveTo(t,i,s,e){this.fabricPathText.push(["Q",t,i,s,e])}stroke(){this.fabricPathText.push(["z"])}generatePath(){let t,i,s,e,{x:h,y:o,w:b,h:r,radius:n}=this,l=h+b,a=o+r;n=Math.min(r,b)/4,this.pointer.y<o||this.pointer.y>o+r?(s=.3*b,t=Math.min(Math.max(h+n,this.pointer.x-s/2),l-n-s),i=Math.min(Math.max(h+n+s,this.pointer.x+s/2),l-n)):(s=.3*r,t=Math.min(Math.max(o+n,this.pointer.y-s/2),a-n-s),i=Math.min(Math.max(o+n+s,this.pointer.y+s/2),a-n)),this.pointer.y<o&&(e=this.direction=2),this.pointer.y>o&&(e=this.direction=3),this.pointer.x<h&&this.pointer.y>=o&&this.pointer.y<=a&&(e=this.direction=0),this.pointer.x>h&&this.pointer.y>=o&&this.pointer.y<=a&&(e=this.direction=1),this.pointer.x>=h&&this.pointer.x<=l&&this.pointer.y>=o&&this.pointer.y<=a&&(e=this.direction=-1),this.beginPath(),this.moveTo(h+n,o),2==e?(this.lineTo(t,o),this.lineTo(this.pointer.x,this.pointer.y),this.lineTo(i,o),this.lineTo(l-n,o)):this.lineTo(l-n,o),this.quadraticCurveTo(l,o,l,o+n),1==e?(this.lineTo(l,t),this.lineTo(this.pointer.x,this.pointer.y),this.lineTo(l,i),this.lineTo(l,a-n)):this.lineTo(l,a-n),this.quadraticCurveTo(l,a,l-n,a),3==e?(this.lineTo(i,a),this.lineTo(this.pointer.x,this.pointer.y),this.lineTo(t,a),this.lineTo(h+n,a)):this.lineTo(h+n,a),this.quadraticCurveTo(h,a,h,a-n),0==e?(this.lineTo(h,i),this.lineTo(this.pointer.x,this.pointer.y),this.lineTo(h,t),this.lineTo(h,o+n)):this.lineTo(h,o+n),this.quadraticCurveTo(h,o,h+n,o),this.stroke()}setEvents(){this.canvas.on("object:scaling",t=>{var i=t.target;!i.strokeWidthUnscaled&&i.strokeWidth&&(i.strokeWidthUnscaled=i.strokeWidth),i.strokeWidthUnscaled&&(i.strokeWidth=i.strokeWidthUnscaled/i.scaleX)}),this.bubble.on("deselected",t=>{this.pointer.setVisible(!1)}),this.bubble.on("moving",t=>{this.pointer.setVisible(!1)}),this.bubble.on("rotating",t=>{this.pointer.setVisible(!1)}),this.bubble.on("scaling",t=>{this.pointer.setVisible(!1)}),this.bubble.on("modified",t=>{this.pointer.setVisible(!0)}),this.bubble.on("selected",t=>{this.pointer.setVisible(!0),this.scaling(t)})}create(){this.generatePath(),this.bubble=new fabric[this.id](this.fabricPathText),this.setEvents(),this.bubble.set({strokeWidth:this.lineWidth,fill:this.backgroundColor,stroke:this.lineColor,hasRotatingPoint:!1}),this.bubble.set(this.bordersOptions),this.show()}update(){this.hide(),this.create()}moving(t,i){this.x+=t.e.movementX,this.y+=t.e.movementY,this.pointer.x+=t.e.movementX,this.pointer.y+=t.e.movementY,this.pointer.update()}scaling(t){var i;if(0==this.direction){this.pointer.x=this.bubble.oCoords.tl.x-13,i=(-this.bubble.oCoords.tl.y+this.bubble.oCoords.bl.y)/(this.fabricPathText[6][2]-this.fabricPathText[11][2]),this.pointer.y=i*(this.fabricPathText[8][2]-this.fabricPathText[11][2])+this.bubble.oCoords.tl.y-13,this.h=this.bubble.oCoords.mb.y-this.bubble.oCoords.mt.y;let t=(this.fabricPathText[3][1]-this.fabricPathText[9][1])/(this.fabricPathText[3][1]-this.fabricPathText[8][1]);this.w=(this.bubble.oCoords.mr.x-this.bubble.oCoords.ml.x)*t,this.y=this.bubble.oCoords.tl.y,this.x=this.bubble.oCoords.ml.x+(this.bubble.oCoords.mr.x-this.bubble.oCoords.ml.x)*(1-t)}if(2==this.direction){let t=(this.fabricPathText[9][2]-this.fabricPathText[11][2])/(this.fabricPathText[9][2]-this.fabricPathText[2][2]);if(this.y=this.bubble.oCoords.tl.y+(1-t)*(this.bubble.oCoords.bl.y-this.bubble.oCoords.tl.y),this.fabricPathText[2][1]>this.fabricPathText[11][1]&&this.fabricPathText[2][1]<this.fabricPathText[5][1])this.pointer.y=this.bubble.oCoords.tl.y-16,i=(-this.bubble.oCoords.tl.x+this.bubble.oCoords.tr.x)/(this.fabricPathText[5][1]-this.fabricPathText[11][1]),this.pointer.x=i*(this.fabricPathText[2][1]-this.fabricPathText[11][1])+this.bubble.oCoords.tl.x-8,this.w=this.bubble.oCoords.tr.x-this.bubble.oCoords.tl.x,this.x=this.bubble.oCoords.tl.x;else if(this.fabricPathText[2][1]<this.fabricPathText[11][1]){this.pointer.y=this.bubble.oCoords.tl.y-14,this.pointer.x=this.bubble.oCoords.tl.x-13;let t=(this.fabricPathText[5][1]-this.fabricPathText[11][1])/(this.fabricPathText[5][1]-this.fabricPathText[2][1]);this.w=(this.bubble.oCoords.tr.x-this.bubble.oCoords.tl.x)*t,this.x=this.bubble.oCoords.tl.x+(this.bubble.oCoords.tr.x-this.bubble.oCoords.tl.x)*(1-t)}else if(this.fabricPathText[2][1]>this.fabricPathText[5][1]){this.pointer.y=this.bubble.oCoords.tr.y-14,this.pointer.x=this.bubble.oCoords.tr.x-5;let t=(this.fabricPathText[5][1]-this.fabricPathText[11][1])/(this.fabricPathText[2][1]-this.fabricPathText[11][1]);this.w=(this.bubble.oCoords.tr.x-this.bubble.oCoords.tl.x)*t,this.x=this.bubble.oCoords.tl.x}this.h=(this.bubble.oCoords.bl.y-this.bubble.oCoords.tl.y)*t}if(1==this.direction){this.pointer.x=this.bubble.oCoords.tr.x,i=(-this.bubble.oCoords.tl.y+this.bubble.oCoords.bl.y)/(this.fabricPathText[7][2]-this.fabricPathText[2][2]),this.pointer.y=i*(this.fabricPathText[4][2]-this.fabricPathText[2][2])+this.bubble.oCoords.tl.y-10,this.x=this.bubble.oCoords.tl.x,this.y=this.bubble.oCoords.tl.y,this.h=this.bubble.oCoords.mb.y-this.bubble.oCoords.mt.y;let t=(this.fabricPathText[2][1]-this.fabricPathText[11][1])/(this.fabricPathText[4][1]-this.fabricPathText[11][1]);this.w=(this.bubble.oCoords.mr.x-this.bubble.oCoords.ml.x)*t}if(3==this.direction){this.pointer.y=this.bubble.oCoords.bl.y;let t=(this.fabricPathText[9][2]-this.fabricPathText[11][2])/(this.fabricPathText[6][2]-this.fabricPathText[11][2]);if(this.h=(this.bubble.oCoords.bl.y-this.bubble.oCoords.tl.y)*t,this.fabricPathText[6][1]>this.fabricPathText[9][1]&&this.fabricPathText[6][1]<this.fabricPathText[4][1])i=(-this.bubble.oCoords.bl.x+this.bubble.oCoords.br.x)/(this.fabricPathText[9][1]-this.fabricPathText[4][1]),this.pointer.x=i*(-this.fabricPathText[6][1]+this.fabricPathText[9][1])+this.bubble.oCoords.tl.x-8,this.w=this.bubble.oCoords.br.x-this.bubble.oCoords.bl.x,this.x=this.bubble.oCoords.tl.x,this.y=this.bubble.oCoords.tl.y;else if(this.fabricPathText[6][1]<this.fabricPathText[9][1]){let t=(this.fabricPathText[4][1]-this.fabricPathText[9][1])/(this.fabricPathText[4][1]-this.fabricPathText[6][1]);this.w=(this.bubble.oCoords.br.x-this.bubble.oCoords.bl.x)*t,this.pointer.y=this.bubble.oCoords.bl.y-5,this.pointer.x=this.bubble.oCoords.bl.x-13,this.x=this.bubble.oCoords.bl.x+(this.bubble.oCoords.br.x-this.bubble.oCoords.bl.x)*(1-t),this.y=this.bubble.oCoords.tl.y}else if(this.fabricPathText[6][1]>this.fabricPathText[4][1]){let t=(this.fabricPathText[4][1]-this.fabricPathText[9][1])/(this.fabricPathText[6][1]-this.fabricPathText[9][1]);this.w=(this.bubble.oCoords.br.x-this.bubble.oCoords.bl.x)*t,this.pointer.y=this.bubble.oCoords.br.y-5,this.pointer.x=this.bubble.oCoords.br.x-5,this.x=this.bubble.oCoords.tl.x,this.y=this.bubble.oCoords.tl.y}}-1===this.direction&&(this.pointer.x+=this.bubble.oCoords.tl.x-this.x,this.pointer.y+=this.bubble.oCoords.tl.y-this.y,this.x=this.bubble.oCoords.tl.x,this.y=this.bubble.oCoords.tl.y),this.pointer.update()}show(){this.canvas.add(this.bubble)}hide(){this.canvas.remove(this.bubble)}}class h{constructor(t,i){this.id="BubblePointer"+Date.now(),this.canvas=t,this.hasControls=!1,this.x=i.x,this.y=i.y,this.radius=i.radius,this.color=i.color,this.pointer={},this.hidden=i.hidden||!0,this.innerText={},this.group={}}setBubble(t){this.bubble=t}create(){let t={radius:this.radius,fill:this.color,left:this.x,top:this.y,hasControls:this.hasControls,hasBorders:this.hasControls};this.pointer=new fabric.Circle(t),this.pointer.on("moving",t=>{this.moving(t)}),this.pointer.on("mousedown",t=>{this.setVisible(!1)}),this.pointer.on("mouseup",t=>{this.setVisible(!0)})}update(){var t={left:this.x,top:this.y};this.pointer.set(t),!1===this.hidden&&(this.hide(),this.show())}show(){this.hidden&&(this.canvas.add(this.pointer),this.hidden=!1)}setVisible(t){this.pointer.visible=t}hide(){this.canvas.remove(this.pointer),this.hidden=!0}moving(t){this.x=t.e.offsetX,this.y=t.e.offsetY,this.bubble.update()}}class o{static create(t,i,s,e){return new o(t,i,s,pointerOptions)}constructor(t,i,s,o){return this.id="Bubble"+Date.now(),this.canvas=i,this.pointer=new h(this.canvas,o),this.bubble=new e(this.canvas,s,this.pointer,t),this.pointer.setBubble(this.bubble),this.init(),this.bubble}init(){this.bubble.create(),this.pointer.create(),this.canvas.on("selection:cleared",t=>{this.pointer.hide()}),this.canvas.on("mouse:up",t=>{this.bubble.scaling(t),this.bubble.bubble.active?this.pointer.show():null===t.target&&this.pointer.hide()})}}function b(t,i){i.preserveObjectStacking=!0,t.BubblePath=t.util.createClass(t.Path,{type:"BubblePath",initialize:function(t){this.callSuper("initialize",t)}}),t.BubblePath.fromObject=function({bubbleOptions:s,pointerOptions:e},h){new Bubble(t,i,s,e);h&&h(null,new Error("error Bubble"))}}s.d(i,"Bubble",function(){return o}),s.d(i,"extendFabricPathBubble",function(){return b}),window&&(window.Bubble=o,window.extendFabricPathBubble=b)}]);