let canvas = new fabric.Canvas('canvas')
let noteInitOptions = {
    x: 100,
    y: 100,
    w: 200,
    h: 80
};

let pointerInitOptions = {
    left: 76,
    top: 76
};
let bubble = new BubbleCreator(fabric, canvas, noteInitOptions, new fabric.CustomCircle().set(pointerInitOptions));

bubble.bubble.generatePath();
bubble.init(new fabric.CustomObject(bubble.bubble.fabricPathText));

const refresh = function () {
	const data = JSON.stringify(canvas);

	canvas.clear();
	canvas.loadFromJSON(data);
	let bubble = new BubbleCreator(fabric, canvas, noteInitOptions, canvas._objects[1]);

	
	bubble.init(canvas._objects[0]);
}
/*
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
        //bubble.bubble.scaling(options);
        //console.log('this.scaling(options)');

        bubble.pointer.show();
        console.log('this.pointer.show()');
    });
}
	
*/
const refreshButton = document.querySelector("#refreshButton");
refreshButton.addEventListener('click', refresh);






