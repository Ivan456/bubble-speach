class Bubble {
    constructor(canvas, bubbleOptions, pointer) {
        this.canvas = canvas;
        this.pointer = pointer;

        this.x = bubbleOptions.x;
        this.y = bubbleOptions.y;
        this.w = bubbleOptions.w;
        this.h = bubbleOptions.h;
        this.radius = Math.min(bubbleOptions.h, bubbleOptions.w)/5;
        this.fabricPathText = [];
        this.bubble = {};

        this.backgroundColor = bubbleOptions.backgroundColor;
        this.lineColor = bubbleOptions.lineColor;
        this.lineWidth = bubbleOptions.lineWidth;


    }

    beginPath() {
        this.fabricPathText = [];
    }

    moveTo(x, y) {
        this.fabricPathText.push(['M', x, y]);
    }

    lineTo(x, y) {
        this.fabricPathText.push(['L', x, y]);
    }

    quadraticCurveTo(cpx, cpy, x, y) {
        this.fabricPathText.push(['Q', cpx, cpy, x, y]);
    }

    stroke() {
        this.fabricPathText.push(['z']);
    }

    generatePath() {
        let {
            x, 
            y,
            w,
            h,
            radius
        } = this,
        r = x + w,
        b = y + h,
        con1,
        con2,
		wideBaseTriangle;

        this.pointer.x -= this.pointer.radius
        this.pointer.y -= this.pointer.radius
		
        if (this.pointer.y < y || this.pointer.y > y + h) {
			wideBaseTriangle = w * 0.15;
            con1 = Math.min(Math.max(x + radius, this.pointer.x - wideBaseTriangle/2), r - radius - wideBaseTriangle);
            con2 = Math.min(Math.max(x + radius + wideBaseTriangle, this.pointer.x + wideBaseTriangle/2), r - radius);
        } else {
			wideBaseTriangle = h * 0.25;
            con1 = Math.min(Math.max(y + radius, this.pointer.y - wideBaseTriangle/2), b - radius - wideBaseTriangle);
            con2 = Math.min(Math.max(y + radius + wideBaseTriangle, this.pointer.y + wideBaseTriangle/2), b - radius);
        }

        let dir;

        if (this.pointer.y < y) dir = 2;
        if (this.pointer.y > y) dir = 3;
        if (this.pointer.x < x && this.pointer.y >= y && this.pointer.y <= b) dir = 0;
        if (this.pointer.x > x && this.pointer.y >= y && this.pointer.y <= b) dir = 1;
        if (this.pointer.x >= x && this.pointer.x <= r && this.pointer.y >= y && this.pointer.y <= b) dir = -1;

        this.beginPath();
        this.moveTo(x + radius, y);
        if (dir == 2) {
            this.lineTo(con1, y);
            this.lineTo(this.pointer.x + 15, this.pointer.y + 15);
            this.lineTo(con2, y);
            this.lineTo(r - radius, y);
        } else this.lineTo(r - radius, y);
        this.quadraticCurveTo(r, y, r, y + radius);
        if (dir == 1) {
            this.lineTo(r, con1);
            this.lineTo(this.pointer.x, this.pointer.y);
            this.lineTo(r, con2);
            this.lineTo(r, b - radius);
        } else this.lineTo(r, b - radius);
        this.quadraticCurveTo(r, b, r - radius, b);
        if (dir == 3) {
            this.lineTo(con2, b);
            this.lineTo(this.pointer.x, this.pointer.y);
            this.lineTo(con1, b);
            this.lineTo(x + radius, b);
        } else this.lineTo(x + radius, b);
        this.quadraticCurveTo(x, b, x, b - radius);
        if (dir == 0) {
            this.lineTo(x, con2);
            this.lineTo(this.pointer.x, this.pointer.y);
            this.lineTo(x, con1);
            this.lineTo(x, y + radius);
        } else this.lineTo(x, y + radius);
        this.quadraticCurveTo(x, y, x + radius, y);

        this.stroke();
    }

    setEvents(){
        this.bubble.on('moving', (options) => {
            this.moving(options);
        });
        this.bubble.on('rotating', (options) => {
            this.moving(options);
        });
        this.bubble.on('scaling', (options) => {
            this.moving(options);
        });
        this.bubble.on('selected', (options) => {
            this.pointer.show();
        });
    }

    create() {
        this.generatePath() 
        this.bubble = new fabric.Path(this.fabricPathText);
        this.setEvents();

        this.bubble.set({
            strokeWidth: this.lineWidth,
            fill: this.backgroundColor,
            stroke: this.lineColor
        });
        this.show();
    }

    update() {
        this.hide();
        this.create();
    }

    moving(options) {
        this.x += options.e.movementX;
        this.y += options.e.movementY;
        this.pointer.x += options.e.movementX;
        this.pointer.y += options.e.movementY;

        this.pointer.update();//если закоментить точка будет на одном месте
    }

    show() {
        this.canvas.add(this.bubble);
    }

    hide() {
        this.canvas.remove(this.bubble);
    }
}
