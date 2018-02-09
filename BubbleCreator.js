class BubbleCreator {
    constructor(fabric, canvas, bubbleOptions, pointerOptions) {
        this.canvas = canvas;
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
		
		this.canvas.on('mouse:up', (options) => {
            this.bubble.scaling(options);
		});
        
    }
}
