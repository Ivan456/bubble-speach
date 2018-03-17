class Pointer {
    constructor(canvas) {
        this.canvas = canvas;

        this.x ;//= pointerOptions.x;
        this.y ;//= pointerOptions.y;
        this.pointer = {};
        this.hidden = true;
    }

    setBubble(bubble) {
        this.bubble = bubble;
    }
	
	init(customCircle){
		this.pointer = customCircle;
		this.setEvents();
		this.x = customCircle.left + 14;
	    this.y = customCircle.top + 14;
		this.canvas.add(this.pointer);
	}

    create() {
		console.log("pointer.create");
        let pointerConfig = {   
            left: this.x,
            top: this.y
        };
		
        this.pointer = new fabric.CustomCircle(pointerConfig);
        this.setEvents();
    }
	
	setEvents(){
		this.pointer.on('moving', (options) => {
            this.moving(options);
        });
	}

    update() {
        console.log("pointer.update");
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
		console.log("pointer.show");
        if (this.hidden) {
            this.canvas.add(this.pointer);
            this.hidden = false;
        }
    }

	setVisible(bool) {
		console.log("pointer.visible");
		this.pointer.visible = bool;
	}

    hide() {
		console.log("pointer.hide");
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