//plugin mandatory dependency - the fabric.js library before here!!!

class Pointer {
    constructor(bubbleOptions) {

        this.px = bubbleOptions.px;
        this.py = bubbleOptions.py;
        this.pointerRadius = bubbleOptions.pointerRadius;
        this.pointerColor = bubbleOptions.pointerColor;
        this.pointer = {};

        this.innerText = {};
        this.group = {};
    }

    createPointer() {
        var pointerConfig = {
            radius: this.pointerRadius,
            fill: this.pointerColor,
            left: this.px - this.pointerRadius,
            top: this.py - this.pointerRadius
        };

        this.pointer = new fabric.Circle(pointerConfig);
        this.pointer.hasControls = false;
        this.pointer.on('moving', (options) => {
            this.pointerMoving(options);
        });
    }

    addPointer() {
        this.canvas.add(this.pointer);
    }

    updatePointer() {
        var pointerConfig = {
            left: this.px - this.pointerRadius,
            top: this.py - this.pointerRadius
        };

        this.pointer.set(pointerConfig);
    }

    removePointer() {
        this.canvas.remove(this.pointer);
    }


    pointerMoving(options) {
        this.px = options.e.clientX;
        this.py = options.e.clientY;
        this.removeBubble();
        this.createBubble();
        this.addBubble();
    }


}

class Bubble {
    constructor(bubbleOptions) {

        this.canvas = new fabric.Canvas('canvas');
        this.x = bubbleOptions.x;
        this.y = bubbleOptions.y;
        this.w = bubbleOptions.w;
        this.h = bubbleOptions.h;
        this.radius = bubbleOptions.radius;
        this.backgroundColor = bubbleOptions.backgroundColor;
        this.fabricPathText = '';
        this.bubble = {};

        this.lineColor = bubbleOptions.lineColor;
        this.lineWidth = bubbleOptions.lineWidth;
    }

    beginPath() {
        this.fabricPathText = '';
        this.bubble = {};
    }


    moveTo(x, y) {
        this.fabricPathText += 'M' + x + ',' + y;
    }

    lineTo(x, y) {
        this.fabricPathText += 'L' + x + ',' + y;
    }

    quadraticCurveTo(cpx, cpy, x, y) {
        this.lineTo(x, y);
        // this.fabricPathText+= 'Q' + x + ',' + y + ','+ cpx + ',' + cpy;
    }

    stroke() {
        this.canvas.remove(this.bubble);
        this.fabricPathText += 'z';
        this.bubble = new fabric.Path(this.fabricPathText);

        this.bubble.set({
            strokeWidth: this.lineWidth,
            fill: this.backgroundColor,
            stroke: this.lineColor,
            opacity: 0.5
        });

        return this.bubble;

        // this.group = new fabric.Group(this.linesArray, {
        //     left: 150,
        //     top: 100,
        //     angle: -10
        // });

        // this.canvas.add(this.group);
    }

    createBubble() {
        var x = this.x;
        var y = this.y;
        var w = this.w;
        var h = this.h;
        var radius = this.radius;
        var px = this.px;
        var py = this.py;

        var r = x + w;
        var b = y + h;

        if (py < y || py > y + h) {
            var con1 = Math.min(Math.max(x + radius, px - 10), r - radius - 20);
            var con2 = Math.min(Math.max(x + radius + 20, px + 10), r - radius);
        } else {
            var con1 = Math.min(Math.max(y + radius, py - 10), b - radius - 20);
            var con2 = Math.min(Math.max(y + radius + 20, py + 10), b - radius);
        }

        var dir;

        if (py < y) dir = 2;
        if (py > y) dir = 3;
        if (px < x && py >= y && py <= b) dir = 0;
        if (px > x && py >= y && py <= b) dir = 1;
        if (px >= x && px <= r && py >= y && py <= b) dir = -1;

        this.beginPath();
        this.moveTo(x + radius, y);
        if (dir == 2) {
            this.lineTo(con1, y);
            this.lineTo(px, py);
            this.lineTo(con2, y);
            this.lineTo(r - radius, y);
        } else this.lineTo(r - radius, y);
        this.quadraticCurveTo(r, y, r, y + radius);
        if (dir == 1) {
            this.lineTo(r, con1);
            this.lineTo(px, py);
            this.lineTo(r, con2);
            this.lineTo(r, b - radius);
        } else this.lineTo(r, b - radius);
        this.quadraticCurveTo(r, b, r - radius, b);
        if (dir == 3) {
            this.lineTo(con2, b);
            this.lineTo(px, py);
            this.lineTo(con1, b);
            this.lineTo(x + radius, b);
        } else this.lineTo(x + radius, b);
        this.quadraticCurveTo(x, b, x, b - radius);
        if (dir == 0) {
            this.lineTo(x, con2);
            this.lineTo(px, py);
            this.lineTo(x, con1);
            this.lineTo(x, y + radius);
        } else this.lineTo(x, y + radius);
        this.quadraticCurveTo(x, y, x + radius, y);

        return this.stroke();
    }

    addBubble() {
        this.canvas.add(this.bubble);

        this.bubble.on('moving', (options) => {
            this.bubbleMoving(options);
        });
        this.bubble.on('rotating', (options) => {
            this.bubbleMoving(options);
        });
        this.bubble.on('scaling', (options) => {
            this.bubbleMoving(options);
        });
        this.bubble.on('selected', (options) => {
            this.addPointer();
        });
    }

    bubbleMoving(options) {
        this.x += options.e.movementX;
        this.y += options.e.movementY;
        this.px += options.e.movementX;
        this.py += options.e.movementY;


        this.updatePointer();
        this.addPointer();
    }

    removeBubble() {
        this.canvas.remove(this.bubble);
    }



    init() {
        var text = new fabric.IText('hello world', {
            left: 100,
            top: 100
        });
        this.canvas.add(text);
        text.set({
            text: "qwewqewqe",
            align: 'center'
        });
        this.canvas.add(text);


        this.createPointer();

        this.createBubble();
        this.addBubble();


        this.canvas.on('selection:cleared', (options) => {
            this.removePointer();
        });
    }
}

class Bubble {
    constructor(bubbleOptions) {

        this.canvas = new fabric.Canvas('canvas');
        this.x = bubbleOptions.x;
        this.y = bubbleOptions.y;
        this.w = bubbleOptions.w;
        this.h = bubbleOptions.h;
        this.radius = bubbleOptions.radius;
        this.backgroundColor = bubbleOptions.backgroundColor;
        this.fabricPathText = '';
        this.bubble = {};

        this.lineColor = bubbleOptions.lineColor;
        this.lineWidth = bubbleOptions.lineWidth;
    }

    beginPath() {
        this.fabricPathText = '';
        this.bubble = {};
    }


    moveTo(x, y) {
        this.fabricPathText += 'M' + x + ',' + y;
    }

    lineTo(x, y) {
        this.fabricPathText += 'L' + x + ',' + y;
    }

    quadraticCurveTo(cpx, cpy, x, y) {
        this.lineTo(x, y);
        // this.fabricPathText+= 'Q' + x + ',' + y + ','+ cpx + ',' + cpy;
    }

    stroke() {
        this.canvas.remove(this.bubble);
        this.fabricPathText += 'z';
        this.bubble = new fabric.Path(this.fabricPathText);

        this.bubble.set({
            strokeWidth: this.lineWidth,
            fill: this.backgroundColor,
            stroke: this.lineColor,
            opacity: 0.5
        });

        return this.bubble;

        // this.group = new fabric.Group(this.linesArray, {
        //     left: 150,
        //     top: 100,
        //     angle: -10
        // });

        // this.canvas.add(this.group);
    }

    createBubble() {
        var x = this.x;
        var y = this.y;
        var w = this.w;
        var h = this.h;
        var radius = this.radius;
        var px = this.px;
        var py = this.py;

        var r = x + w;
        var b = y + h;

        if (py < y || py > y + h) {
            var con1 = Math.min(Math.max(x + radius, px - 10), r - radius - 20);
            var con2 = Math.min(Math.max(x + radius + 20, px + 10), r - radius);
        } else {
            var con1 = Math.min(Math.max(y + radius, py - 10), b - radius - 20);
            var con2 = Math.min(Math.max(y + radius + 20, py + 10), b - radius);
        }

        var dir;

        if (py < y) dir = 2;
        if (py > y) dir = 3;
        if (px < x && py >= y && py <= b) dir = 0;
        if (px > x && py >= y && py <= b) dir = 1;
        if (px >= x && px <= r && py >= y && py <= b) dir = -1;

        this.beginPath();
        this.moveTo(x + radius, y);
        if (dir == 2) {
            this.lineTo(con1, y);
            this.lineTo(px, py);
            this.lineTo(con2, y);
            this.lineTo(r - radius, y);
        } else this.lineTo(r - radius, y);
        this.quadraticCurveTo(r, y, r, y + radius);
        if (dir == 1) {
            this.lineTo(r, con1);
            this.lineTo(px, py);
            this.lineTo(r, con2);
            this.lineTo(r, b - radius);
        } else this.lineTo(r, b - radius);
        this.quadraticCurveTo(r, b, r - radius, b);
        if (dir == 3) {
            this.lineTo(con2, b);
            this.lineTo(px, py);
            this.lineTo(con1, b);
            this.lineTo(x + radius, b);
        } else this.lineTo(x + radius, b);
        this.quadraticCurveTo(x, b, x, b - radius);
        if (dir == 0) {
            this.lineTo(x, con2);
            this.lineTo(px, py);
            this.lineTo(x, con1);
            this.lineTo(x, y + radius);
        } else this.lineTo(x, y + radius);
        this.quadraticCurveTo(x, y, x + radius, y);

        return this.stroke();
    }

    addBubble() {
        this.canvas.add(this.bubble);

        this.bubble.on('moving', (options) => {
            this.bubbleMoving(options);
        });
        this.bubble.on('rotating', (options) => {
            this.bubbleMoving(options);
        });
        this.bubble.on('scaling', (options) => {
            this.bubbleMoving(options);
        });
        this.bubble.on('selected', (options) => {
            this.addPointer();
        });
    }

    bubbleMoving(options) {
        this.x += options.e.movementX;
        this.y += options.e.movementY;
        this.px += options.e.movementX;
        this.py += options.e.movementY;


        this.updatePointer();
        this.addPointer();
    }

    removeBubble() {
        this.canvas.remove(this.bubble);
    }



    init() {
        var text = new fabric.IText('hello world', {
            left: 100,
            top: 100
        });
        this.canvas.add(text);
        text.set({
            text: "qwewqewqe",
            align: 'center'
        });
        this.canvas.add(text);


        this.createPointer();

        this.createBubble();
        this.addBubble();


        this.canvas.on('selection:cleared', (options) => {
            this.removePointer();
        });
    }
}



let bubbleOptions = {
    canvasId: "canvas",
    x: 100,
    y: 100,
    w: 200,
    h: 100,
    radius: 20,
    px: 50,
    py: 50,
    lineColor: "green",
    backgroundColor: "red",
    pointerColor: "green",
    lineWidth: 4,
    pointerRadius: 5
};

let bubble = new Bubble(bubbleOptions);
bubble.init();