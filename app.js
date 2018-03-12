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
	/*var objToJson = {}; 
	objToJson.x = bubble.bubble.x;
	objToJson.y = bubble.bubble.y;
	objToJson.w = bubble.bubble.w;
	objToJson.h = bubble.bubble.h;
	objToJson.pointerX = bubble.pointer.x;
	objToJson.pointerY = bubble.pointer.y;*/
	//canvas.clear();
	
	
	var data = JSON.stringify(canvas);
	canvas.clear();
	canvas.loadFromJSON(data);
	canvas.renderAll();
	/*
	var data = JSON.stringify(canvas);
	console.log("1" + data);
	
	
	 canvas.loadFromJSON(data, function() {
           canvas.renderAll();
        });
	console.log("2" + JSON.stringify(canvas));*/	
		/*
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
	})()*/
}





fabric.Note = new fabric.util.createClass(fabric.Path, {

    type: 'note',

    /**
     * Initializer
     *
     * @param  {[array]} points  Polygon points
     * @param  {[array]} options Options for Polygon
     * @return {[object]}
     */
    initialize: function (points, options) {
        options || (options = { });

        this.callSuper('initialize', points, options);

        // Custom attributes
        this.set('x', options.x || 'Number not set!');
		this.set('y', options.y || 'Number not set!');
		this.set('w', options.w || 'Number not set!');
		this.set('h', options.h || 'Number not set!');
		

        // Set Defaults
        this.set('angle', options.angle || 0);
        this.set('evented', options.evented || true);
        this.set('hasControls', options.hasControls || false);
        this.set('hasRotatingPoint', options.hasRotatingPoint || false);
        this.set('hoverCursor', options.hoverCursor || 'pointer');
        this.set('lockMovementX', options.lockMovementX || true);
        this.set('lockMovementY', options.lockMovementY || true);
        this.set('lockRotation', options.lockRotation || true);
        this.set('hasBorders', options.hasBorders || false);

        
        
    },

    /**
     * Convert to object
     * @return {[object]}
     */
    toObject: function() {
        return fabric.util.object.extend(this.callSuper('toObject'), {
			x: this.get('x'),
			y: this.get('y'),
			w: this.get('w'),
			h: this.get('h')
        });
    },

    toJSON: function() {
        return fabric.util.object.extend(this.callSuper('toJSON'), {
            x: this.get('x'),
			y: this.get('y'),
			w: this.get('w'),
			h: this.get('h')
        });
    },

    /**
     * Canvas renderer
     */
    _render: function (ctx) {
        this.callSuper('_render', ctx);

		
        /*ctx.font = '15px Helvetica';
        ctx.fillStyle = '#fff';
        ctx.fillText(this.number, -this.width / 2 + 20, -this.height/2 + 20, [20]);
        ctx.textAlign = 'center';*/
    }
	

});

fabric.Note.fromObject = function (object, callback, forceAsync) {
    return fabric.Object._fromObject('Note', object, callback, forceAsync, ['points'])
};


const refreshButton = document.querySelector("#refreshButton");
refreshButton.addEventListener('click', refresh)







