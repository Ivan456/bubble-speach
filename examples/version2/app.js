let canvas = new fabric.Canvas('canvas');
let canvas2 = new fabric.Canvas('canvas2');

var refresh = function () {
	var data = JSON.stringify(canvas.toObject([]));
    canvas.renderAll();
	canvas2.loadFromJSON(data, function(){
		canvas2.renderAll();
    });
}

const refreshButton = document.querySelector("#refreshButton");
refreshButton.addEventListener('click', refresh)



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

(function(){
let bubble = new BubblePath(fabric, canvas, bubbleOptions, pointerOptions);
bubble.init();
})()
