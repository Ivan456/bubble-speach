class Pointer {
    constructor(canvas, pointerOptions) {
        this.canvas = canvas;

        this.hasControls = false;
        this.x = pointerOptions.x;
        this.y = pointerOptions.y;
        this.radius = pointerOptions.radius;
        this.color = pointerOptions.color;
        this.pointer = {};

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
        this.canvas.add(this.pointer);
    }

    hide() {
        this.canvas.remove(this.pointer);
    }

    moving(options) {
        this.x = options.e.clientX;
        this.y = options.e.clientY;
        this.bubble.update();
    }
}
