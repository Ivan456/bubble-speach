class BubbleCreator {
    constructor(fabric, bubbleOptions, pointerOptions) {
        this.canvas = new fabric.Canvas('canvas');
        this.pointer = new Pointer(this.canvas, pointerOptions);
        this.bubble = new Bubble(this.canvas, bubbleOptions, this.pointer);
        this.pointer.setBubble(this.bubble);
    }

    init() {
        this.bubble.create();
        this.pointer.create();

        this.canvas.on('selection:cleared', (options) => {
            this.pointer.hide();
        });
    }
}
