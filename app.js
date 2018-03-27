let canvas = new fabric.Canvas('canvas');

var refresh = function () {
    var data = JSON.stringify(canvas);
    canvas.loadFromJSON(data, function() {
        canvas.renderAll();
    });
}
const refreshButton = document.querySelector("#refreshButton");
refreshButton.addEventListener('click', refresh)

let bubbleOptions = {
    x: 200,
    y: 200,
    w: 200,
    h: 80,
    lineWidth: 2,
    lineColor: "green",
    backgroundColor: "red"}

let pointerOptions = {
    x: 150,
    y: 150,
    radius: 8,
    color: "blue",
};

extendFabricPathBubble(fabric, canvas);
let bubble = new Bubble(fabric, canvas, bubbleOptions, pointerOptions);