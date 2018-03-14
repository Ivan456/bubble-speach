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

const refresh = function () {
	const data = JSON.stringify(canvas);

	canvas.clear();
	canvas.loadFromJSON(data);
	
	events();
}

function events(){
	canvas.on('selection:cleared', (options) => {
        bubble.pointer.hide();
        console.log('this.pointer.hide()');
    });
		
	canvas.on('mouse:up', (options) => {
        bubble.bubble.scaling(options);
        console.log('this.bubble.scaling(options)');
	});
	//TODO add for each and type check 
	canvas._objects[0].on('moving', (options) => {
        bubble.pointer.setVisible(false);
        console.log('this.pointer.setVisible(false)');
    });
		
    canvas._objects[0].on('rotating', (options) => {
        bubble.pointer.setVisible(false);
		console.log('this.pointer.setVisible(false)');
    });
		
	canvas._objects[0].on('scaling', (options) => {
        bubble.pointer.setVisible(false);
		console.log('this.pointer.setVisible(false)');
    });
		
    canvas._objects[0].on('modified', (options) => {
        bubble.pointer.setVisible(true);
        console.log('this.pointer.setVisible(true)');
    });
		
    canvas._objects[0].on('selected', (options) => {
        bubble.bubble.scaling(options);
        console.log('this.scaling(options)');

        bubble.pointer.show();
        console.log('this.pointer.show()');
    });
}
	

const refreshButton = document.querySelector("#refreshButton");
refreshButton.addEventListener('click', refresh);







