class Pointer {
    constructor(canvas, pointerOptions) {
        this.canvas = canvas;

        this.hasControls = false;
        this.x = pointerOptions.x;
        this.y = pointerOptions.y;
        this.pointer = {};
        this.hidden = pointerOptions.hidden || true;

        this.innerText = {};
        this.group = {};
    }

    setBubble(bubble) {
        this.bubble = bubble;
    }

    create() {
        let pointerConfig = {   
            left: this.x,
            top: this.y
        };
		
		fabric.CustomCircle = fabric.util.createClass(fabric.Circle, {
			type: 'CustomCircle',
    
			initialize: function (points) {
				this.callSuper('initialize',points);
				
				this.set('radius', 8);
				this.set('fill', "blue");
				this.set('hasControls', false);
				this.set('hasBorders', false);
			},
		});
	
			
		fabric.CustomCircle.fromObject = function (object, callback) {
			fabric.Object._fromObject("CustomCircle", object, callback, 'circle');
		};
		
		
        this.pointer = new fabric.CustomCircle(pointerConfig);
		

       // this.pointer = new fabric.Circle(pointerConfig);
        this.pointer.on('moving', (options) => {
            this.moving(options);
        });
    }

    update() {
        var pointerConfig = {
            left: this.x,
            top: this.y
        };

        this.pointer.set(pointerConfig);

		
        if (this.hidden === false){
            this.hide();
            this.show();
        } 

    }

    show() {
        if (this.hidden) {
            this.canvas.add(this.pointer);
            this.hidden = false;
        }
    }

	setVisible(bool) {
		this.pointer.visible = bool;
	}

    hide() {
        this.canvas.remove(this.pointer);
        this.hidden = true;
    }

    moving(options) {
		console.log("moving");
        this.x = options.e.offsetX;
        this.y = options.e.offsetY;
        this.bubble.update();
    }
}