let canvas = new fabric.Canvas('canvas')
let noteOptions = {
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
let bubble = new BubbleCreator(fabric, canvas, noteOptions, pointerOptions);

bubble.init();

var refresh = function () {

	var data = JSON.stringify(canvas);
	canvas.clear();
	canvas.loadFromJSON(data);
	canvas._objects[0].on('moving', (options) => {
            canvas._objects[1].visible=false;
        });

}

const refreshButton = document.querySelector("#refreshButton");
refreshButton.addEventListener('click', refresh)







