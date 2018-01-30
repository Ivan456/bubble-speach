class Pointer {
    constructor(canvas, pointerOptions) {
        this.canvas = canvas;

        this.hasControls = false;
        this.x = pointerOptions.x;
        this.y = pointerOptions.y;
        this.radius = pointerOptions.radius;
        this.color = pointerOptions.color;
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
            radius: this.radius,
            fill: this.color,
            left: this.x,
            top: this.y,
            hasControls: this.hasControls,
            hasBorders: this.hasControls
        };

        this.pointer = new fabric.Circle(pointerConfig);
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
        this.x = options.e.clientX;
        this.y = options.e.clientY;
        this.bubble.update();
    }
}
