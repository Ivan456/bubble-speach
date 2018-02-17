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
        this.bubble.set(this.bordersOptions);

        this.show();
    }

    update() {
        this.hide();
        this.create();
    }

   moving(options, eventName) {
		this.x += options.e.movementX;
		this.y += options.e.movementY;

		this.pointer.x += options.e.movementX;
		this.pointer.y += options.e.movementY;
        this.pointer.update();
    }
	
	scaling(options) {
		/*
		 fabric doesn't change path coordinate during scaling , but changes oCoords 
		 this method calculates real parameters for generatePath and pointer update methods.
		*/
		var k;
		
		if(this.direction == 0 ){//pointer middle left 
			this.pointer.x = this.bubble.oCoords.tl.x - 13;
			k = ( -this.bubble.oCoords.tl.y + this.bubble.oCoords.bl.y)/( this.fabricPathText[6][2] - this.fabricPathText[11][2]  );
			this.pointer.y = k * (this.fabricPathText[8][2]  - this.fabricPathText[11][2] ) + this.bubble.oCoords.tl.y - 13;
			
			
			this.h = this.bubble.oCoords.mb.y - this.bubble.oCoords.mt.y ;
			let kw = (this.fabricPathText[3][1] - this.fabricPathText[9][1])/( this.fabricPathText[3][1] - this.fabricPathText[8][1]);
			this.w = (this.bubble.oCoords.mr.x- this.bubble.oCoords.ml.x) * kw;
			this.y =  this.bubble.oCoords.tl.y ;
			this.x = this.bubble.oCoords.ml.x + (this.bubble.oCoords.mr.x- this.bubble.oCoords.ml.x) * (1-kw);
		}
		if(this.direction == 2){// pointer top middle
			let kh = (this.fabricPathText[9][2] - this.fabricPathText[11][2])/(this.fabricPathText[9][2] - this.fabricPathText[2][2]);
			this.y = this.bubble.oCoords.tl.y + (1-kh)*(this.bubble.oCoords.bl.y - this.bubble.oCoords.tl.y);
			if(this.fabricPathText[2][1] > this.fabricPathText[11][1] && this.fabricPathText[2][1] < this.fabricPathText[5][1] ){ 
				this.pointer.y = this.bubble.oCoords.tl.y - 16;
				k = ( -this.bubble.oCoords.tl.x + this.bubble.oCoords.tr.x)/( this.fabricPathText[5][1] - this.fabricPathText[11][1]  );
				this.pointer.x = k * (this.fabricPathText[2][1]  - this.fabricPathText[11][1] ) + this.bubble.oCoords.tl.x - 8;
				
				this.w = (this.bubble.oCoords.tr.x - this.bubble.oCoords.tl.x);
				this.x = this.bubble.oCoords.tl.x;
				
			} else if( this.fabricPathText[2][1] < this.fabricPathText[11][1]){// pointer top left
				this.pointer.y = this.bubble.oCoords.tl.y - 14;
                this.pointer.x = this.bubble.oCoords.tl.x - 13;
				
				let kw = (this.fabricPathText[5][1] - this.fabricPathText[11][1]  )/( this.fabricPathText[5][1] - this.fabricPathText[2][1]);
				this.w = (this.bubble.oCoords.tr.x - this.bubble.oCoords.tl.x )*kw;
				this.x = this.bubble.oCoords.tl.x + (this.bubble.oCoords.tr.x - this.bubble.oCoords.tl.x )*(1-kw);
				
				
				
			} else if( this.fabricPathText[2][1] > this.fabricPathText[5][1] ){ //pointer top right
				this.pointer.y = this.bubble.oCoords.tr.y - 14;
                this.pointer.x = this.bubble.oCoords.tr.x - 5;
				
				let kw = (this.fabricPathText[5][1] - this.fabricPathText[11][1])/( this.fabricPathText[2][1] - this.fabricPathText[11][1]);
				this.w = (this.bubble.oCoords.tr.x - this.bubble.oCoords.tl.x )*kw;
				this.x = this.bubble.oCoords.tl.x;
			}
			this.h = (this.bubble.oCoords.bl.y - this.bubble.oCoords.tl.y)*kh;	
		}
		if(this.direction == 1 ){// pointer middle right
			this.pointer.x = this.bubble.oCoords.tr.x ;
			k = ( -this.bubble.oCoords.tl.y + this.bubble.oCoords.bl.y)/( this.fabricPathText[7][2] - this.fabricPathText[2][2]  );
			this.pointer.y = k * (this.fabricPathText[4][2]  - this.fabricPathText[2][2] ) + this.bubble.oCoords.tl.y - 10;//center
			
			
			this.x = this.bubble.oCoords.tl.x;
			this.y = this.bubble.oCoords.tl.y;
			this.h = this.bubble.oCoords.mb.y - this.bubble.oCoords.mt.y ;
			
			let kw = (this.fabricPathText[2][1] - this.fabricPathText[11][1])/( this.fabricPathText[4][1] - this.fabricPathText[11][1]);
			this.w = (this.bubble.oCoords.mr.x- this.bubble.oCoords.ml.x) * kw;
			
			
		}
		if(this.direction == 3 ){// pointer bottom center
			this.pointer.y = this.bubble.oCoords.bl.y;
			let kh = (this.fabricPathText[9][2] - this.fabricPathText[11][2]  )/( this.fabricPathText[6][2] - this.fabricPathText[11][2]);
			this.h = (this.bubble.oCoords.bl.y - this.bubble.oCoords.tl.y) * kh;
			if(this.fabricPathText[6][1] > this.fabricPathText[9][1] && this.fabricPathText[6][1] < this.fabricPathText[4][1] ){ 
				k = ( -this.bubble.oCoords.bl.x + this.bubble.oCoords.br.x)/( this.fabricPathText[9][1] - this.fabricPathText[4][1]  );
				this.pointer.x = k * ( -this.fabricPathText[6][1]  + this.fabricPathText[9][1] ) + this.bubble.oCoords.tl.x - 8; 
				this.w = (this.bubble.oCoords.br.x - this.bubble.oCoords.bl.x);
				
				this.x = this.bubble.oCoords.tl.x;
				this.y = this.bubble.oCoords.tl.y;
				
				
			} else if( this.fabricPathText[6][1] < this.fabricPathText[9][1]){//pointer bottom left
				let kw = (this.fabricPathText[4][1] - this.fabricPathText[9][1])/( this.fabricPathText[4][1] - this.fabricPathText[6][1]);
				this.w = (this.bubble.oCoords.br.x - this.bubble.oCoords.bl.x )*kw;
				
				this.pointer.y = this.bubble.oCoords.bl.y - 5;
				this.pointer.x = this.bubble.oCoords.bl.x - 13;
				
				this.x = this.bubble.oCoords.bl.x + (this.bubble.oCoords.br.x - this.bubble.oCoords.bl.x )*(1-kw);
				this.y = this.bubble.oCoords.tl.y;
				
				
				
			} else if( this.fabricPathText[6][1] > this.fabricPathText[4][1] ){// pointer bottom right
				let kw = (this.fabricPathText[4][1] - this.fabricPathText[9][1])/( this.fabricPathText[6][1] - this.fabricPathText[9][1]);
				this.w = (this.bubble.oCoords.br.x - this.bubble.oCoords.bl.x )*kw;
				
				this.pointer.y = this.bubble.oCoords.br.y - 5;
				this.pointer.x = this.bubble.oCoords.br.x - 5;
				
				this.x = this.bubble.oCoords.tl.x;
				this.y = this.bubble.oCoords.tl.y;
				
			}
        }
        this.pointer.update();
	}
  

    show() {
        this.canvas.add(this.bubble);
    }

    hide() {
        this.canvas.remove(this.bubble);
    }
}
