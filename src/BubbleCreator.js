class BubbleCreator {
    constructor(fabric, canvas, bubbleOptions,customCircle) {
        this.canvas = canvas;
        this.pointer = new Pointer(this.canvas);
		this.pointer.init(customCircle);
        this.bubble = new Bubble(this.canvas,bubbleOptions, this.pointer);
        this.pointer.setBubble(this.bubble);
    }

    init(customObject) {
        this.bubble.init(customObject);
        

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
