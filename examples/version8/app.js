const canvas = new fabric.Canvas('canvas');
extendFabricPathBubble(fabric, canvas);

canvas.loadFromJSON(JSON.stringify(savedCanvas), function() {
	console.log('THIS LINE IS NEVER CALLED');
	canvas.renderAll();
});

const refresh = function () {
    var data = JSON.stringify(canvas);
    canvas.loadFromJSON(data, function() {
       canvas.renderAll();
    });
}

let bubbleOptions = {
    x: 200,
    y: 200,
    w: 200,
    h: 80,
    lineWidth: 2,
    lineColor: 'green',
    backgroundColor: 'red'}

let pointerOptions = {
    x: 150,
    y: 150,
    radius: 8,
    color: 'blue'
}

let bubble = new Bubble(fabric, canvas, bubbleOptions, pointerOptions)
