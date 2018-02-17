class Bubble {
    constructor(fabric, canvas, bubbleOptions, pointerOptions) {
        this.id = 'Bubble' + Date.now();
        this.canvas = canvas;
        this.pointer = new BubblePointer(this.canvas, pointerOptions);
        this.bubble = new BubblePath(this.canvas, bubbleOptions, this.pointer);
        this.pointer.setBubble(this.bubble);
        this.init();
    }

    init() {
        this.bubble.create();
        this.pointer.create();

        this.canvas.on('selection:cleared', (options) => {
            this.pointer.hide();
        });
		
		this.canvas.on('mouse:up', (options) => {
            this.bubble.scaling(options);
		
		if(this.bubble.bubble.active ){
				this.pointer.show();
			} else if ( options.target === null)  {
				
				this.pointer.hide();
			}
		});
    }
}
