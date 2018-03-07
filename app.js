let canvas = new fabric.Canvas('canvas')
let bubbleOptions = {
    x: 100,
    y: 100,
    w: 200,
    h: 80,
    lineWidth: 2,
    lineColor: "green",
    backgroundColor: "red"}

let pointerOptions = {
    x: 50,
    y: 50,
    radius: 8,
    color: "blue",
};
let bubble = new BubbleCreator(fabric, canvas, bubbleOptions, pointerOptions);
bubble.init();

var refresh = function () {
	var objToJson = {}; 
	objToJson.x = bubble.bubble.x;
	objToJson.y = bubble.bubble.y;
	objToJson.w = bubble.bubble.w;
	objToJson.h = bubble.bubble.h;
	objToJson.pointerX = bubble.pointer.x;
	objToJson.pointerY = bubble.pointer.y;
	var data = JSON.stringify(objToJson);
	canvas.clear();
	var obj = JSON.parse(data);
	(function(){
		bubbleOptions.x = obj.x;  
		bubbleOptions.y = obj.y;
		bubbleOptions.w = obj.w;
		bubbleOptions.h = obj.h;
		pointerOptions.x = obj.pointerX;
		pointerOptions.y = obj.pointerY;
		bubble = new BubbleCreator(fabric, canvas, bubbleOptions, pointerOptions);
		bubble.init();
	})()
}

const refreshButton = document.querySelector("#refreshButton");
refreshButton.addEventListener('click', refresh)







