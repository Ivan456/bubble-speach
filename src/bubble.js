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
        this.direction;
        
        this.bordersOptions = {
            borderColor: 'red',
            cornerColor: 'green',
            cornerSize: 7,
            transparentCorners: false
          };
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
		radius = Math.min(h, w)/4;
		console.log("generatePath");
		
        if (this.pointer.y < y || this.pointer.y > y + h) {
			wideBaseTriangle = w * 0.20;
            con1 = Math.min(Math.max(x + radius, this.pointer.x - wideBaseTriangle/2), r - radius - wideBaseTriangle);
            con2 = Math.min(Math.max(x + radius + wideBaseTriangle, this.pointer.x + wideBaseTriangle/2), r - radius);
        } else {
			wideBaseTriangle = h * 0.30;
            con1 = Math.min(Math.max(y + radius, this.pointer.y - wideBaseTriangle/2), b - radius - wideBaseTriangle);
            con2 = Math.min(Math.max(y + radius + wideBaseTriangle, this.pointer.y + wideBaseTriangle/2), b - radius);
        }

        let dir;

        if (this.pointer.y < y){ dir = this.direction = 2;}
        if (this.pointer.y > y){ dir = this.direction = 3;}
        if (this.pointer.x < x && this.pointer.y >= y && this.pointer.y <= b){ dir = this.direction = 0;}
        if (this.pointer.x > x && this.pointer.y >= y && this.pointer.y <= b){ dir = this.direction = 1;}
        if (this.pointer.x >= x && this.pointer.x <= r && this.pointer.y >= y && this.pointer.y <= b) dir = -1;

        this.beginPath();
        this.moveTo(x + radius, y);
        if (dir == 2) {
            this.lineTo(con1, y);
            this.lineTo(this.pointer.x, this.pointer.y);
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
            this.pointer.setVisible(false);
        });
        this.bubble.on('rotating', (options) => {
            console.log('rotating')
			this.pointer.setVisible(false);
            //this.moving(options, 'rotating');
        });
		this.bubble.on('scaling', (options) => {
            console.log('SCALING')
			this.pointer.setVisible(false);
			//this.moving(options, 'scaling');
        });
        this.bubble.on('modified', (options) => {
            this.pointer.setVisible(true);
			
        });
        this.bubble.on('selected', (options) => {
            this.scaling(options);
            this.pointer.show();
        });
    }

    create() {
        this.generatePath();
        this.bubble = new fabric.Path(this.fabricPathText);
        this.setEvents();

        this.bubble.set({
            strokeWidth: this.lineWidth,
            fill: this.backgroundColor,
            stroke: this.lineColor,
            hasRotatingPoint: false
        });
        this.bubble.set(this.bordersOptions);

        this.show();
    }

    update() {
        this.hide();
        this.create();
    }

   moving(options, eventName) {
       /* switch (eventName) {
            case "moving":
            case "scaling":*/
                this.x += options.e.movementX;
                this.y += options.e.movementY;

                this.pointer.x += options.e.movementX;
                this.pointer.y += options.e.movementY;
			/*
                break;
            case "rotating":
                let angle = this.bubble.getAngle();
                let radians = (Math.PI / 180) * angle;
                let cos = Math.cos(radians);
                let sin = Math.sin(radians);
				h = this.bubble.oCoords.ml.y;
				w = this.bubble.oCoords.mb.x;
                let pointerX = this.pointer.x;
                let pointerY = this.pointer.y;
                let bubbleX = this.x + (w / 2);
                let bubbleY = this.y + (h / 2);

                    /* let newPointerX = (cos * (pointerX - bubbleX)) + (sin * (pointerY - bubbleY)) + bubbleX;
                    let newPointerY = (cos * (pointerY - bubbleY)) - (sin * (pointerX - bubbleX)) + bubbleY; */

               /* this.pointer.x = (cos * (pointerX - bubbleX) - sin * (pointerY - bubbleY) + bubbleX);
                this.pointer.y = (sin * (pointerX - bubbleX) + cos * (pointerY - bubbleY) + bubbleY);

                break;
        }*/

        this.pointer.update();
    }
	
	/**
	*method written by сicadidae 3301
	*
	*/
	scaling(options) {
		console.log("scaling");
		var k;
		
		if(this.direction == 0 ){
			this.pointer.x = this.bubble.oCoords.tl.x - 13;
			k = ( -this.bubble.oCoords.tl.y + this.bubble.oCoords.bl.y)/( this.fabricPathText[6][2] - this.fabricPathText[11][2]  );
			this.pointer.y = k * (this.fabricPathText[8][2]  - this.fabricPathText[11][2] ) + this.bubble.oCoords.tl.y - 13;
			
			
			this.h = this.bubble.oCoords.mb.y - this.bubble.oCoords.mt.y ;
			let kw = (this.fabricPathText[3][1] - this.fabricPathText[9][1])/( this.fabricPathText[3][1] - this.fabricPathText[8][1]);
			this.w = (this.bubble.oCoords.mr.x- this.bubble.oCoords.ml.x) * kw;
			this.y =  this.bubble.oCoords.tl.y ;
			this.x = this.bubble.oCoords.ml.x + (this.bubble.oCoords.mr.x- this.bubble.oCoords.ml.x) * (1-kw);
			
			//bubble.canvas.renderAll();
		}
		if(this.direction == 2){
			let kh = (this.fabricPathText[9][2] - this.fabricPathText[11][2])/(this.fabricPathText[9][2] - this.fabricPathText[2][2]);
			this.y = this.bubble.oCoords.tl.y + (1-kh)*(this.bubble.oCoords.bl.y - this.bubble.oCoords.tl.y);
			if(this.fabricPathText[2][1] > this.fabricPathText[11][1] && this.fabricPathText[2][1] < this.fabricPathText[5][1] ){ 
				this.pointer.y = this.bubble.oCoords.tl.y - 16;
				k = ( -this.bubble.oCoords.tl.x + this.bubble.oCoords.tr.x)/( this.fabricPathText[5][1] - this.fabricPathText[11][1]  );
				this.pointer.x = k * (this.fabricPathText[2][1]  - this.fabricPathText[11][1] ) + this.bubble.oCoords.tl.x - 8;
				
				this.w = (this.bubble.oCoords.tr.x - this.bubble.oCoords.tl.x);
				this.x = this.bubble.oCoords.tl.x;
				
			} else if( this.fabricPathText[2][1] < this.fabricPathText[11][1]){// pointer left
				this.pointer.y = this.bubble.oCoords.tl.y - 14;
                this.pointer.x = this.bubble.oCoords.tl.x - 13;
				
				let kw = (this.fabricPathText[5][1] - this.fabricPathText[11][1]  )/( this.fabricPathText[5][1] - this.fabricPathText[2][1]);
				this.w = (this.bubble.oCoords.tr.x - this.bubble.oCoords.tl.x )*kw;
				this.x = this.bubble.oCoords.tl.x + (this.bubble.oCoords.tr.x - this.bubble.oCoords.tl.x )*(1-kw);
				
				
				
			} else if( this.fabricPathText[2][1] > this.fabricPathText[5][1] ){ //pointer right
				this.pointer.y = this.bubble.oCoords.tr.y - 14;
                this.pointer.x = this.bubble.oCoords.tr.x - 5;
				
				let kw = (this.fabricPathText[5][1] - this.fabricPathText[11][1])/( this.fabricPathText[2][1] - this.fabricPathText[11][1]);
				this.w = (this.bubble.oCoords.tr.x - this.bubble.oCoords.tl.x )*kw;
				this.x = this.bubble.oCoords.tl.x;
			}
			this.h = (this.bubble.oCoords.bl.y - this.bubble.oCoords.tl.y)*kh;	
		}
		if(this.direction == 1 ){
			this.pointer.x = this.bubble.oCoords.tr.x ;
			k = ( -this.bubble.oCoords.tl.y + this.bubble.oCoords.bl.y)/( this.fabricPathText[7][2] - this.fabricPathText[2][2]  );
			this.pointer.y = k * (this.fabricPathText[4][2]  - this.fabricPathText[2][2] ) + this.bubble.oCoords.tl.y - 10;//center
			
			
			this.x = this.bubble.oCoords.tl.x;
			this.y = this.bubble.oCoords.tl.y;
			this.h = this.bubble.oCoords.mb.y - this.bubble.oCoords.mt.y ;
			
			let kw = (this.fabricPathText[2][1] - this.fabricPathText[11][1])/( this.fabricPathText[4][1] - this.fabricPathText[11][1]);
			this.w = (this.bubble.oCoords.mr.x- this.bubble.oCoords.ml.x) * kw;
			
			
		}
		if(this.direction == 3 ){
			this.pointer.y = this.bubble.oCoords.bl.y;
			let kh = (this.fabricPathText[9][2] - this.fabricPathText[11][2]  )/( this.fabricPathText[6][2] - this.fabricPathText[11][2]);
			this.h = (this.bubble.oCoords.bl.y - this.bubble.oCoords.tl.y) * kh;
			if(this.fabricPathText[6][1] > this.fabricPathText[9][1] && this.fabricPathText[6][1] < this.fabricPathText[4][1] ){ 
				k = ( -this.bubble.oCoords.bl.x + this.bubble.oCoords.br.x)/( this.fabricPathText[9][1] - this.fabricPathText[4][1]  );
				this.pointer.x = k * ( -this.fabricPathText[6][1]  + this.fabricPathText[9][1] ) + this.bubble.oCoords.tl.x - 8; 
				this.w = (this.bubble.oCoords.br.x - this.bubble.oCoords.bl.x);
				
				this.x = this.bubble.oCoords.tl.x;
				this.y = this.bubble.oCoords.tl.y;
				
				
			} else if( this.fabricPathText[6][1] < this.fabricPathText[9][1]){//left
				let kw = (this.fabricPathText[4][1] - this.fabricPathText[9][1])/( this.fabricPathText[4][1] - this.fabricPathText[6][1]);
				this.w = (this.bubble.oCoords.br.x - this.bubble.oCoords.bl.x )*kw;
				
				this.pointer.y = this.bubble.oCoords.bl.y - 5;
				this.pointer.x = this.bubble.oCoords.bl.x - 13;
				
				this.x = this.bubble.oCoords.bl.x + (this.bubble.oCoords.br.x - this.bubble.oCoords.bl.x )*(1-kw);
				this.y = this.bubble.oCoords.tl.y;
				
				
				
			} else if( this.fabricPathText[6][1] > this.fabricPathText[4][1] ){//right
				let kw = (this.fabricPathText[4][1] - this.fabricPathText[9][1])/( this.fabricPathText[6][1] - this.fabricPathText[9][1]);
				this.w = (this.bubble.oCoords.br.x - this.bubble.oCoords.bl.x )*kw;
				
				this.pointer.y = this.bubble.oCoords.br.y - 5;
				this.pointer.x = this.bubble.oCoords.br.x - 5;
				
				this.x = this.bubble.oCoords.tl.x;
				this.y = this.bubble.oCoords.tl.y;
				
			}
			
			
				
        }
		
		// this.lineWidth = (this.bubble.zoomX + this.bubble.zoomY) ;
		
        this.pointer.update();
	}
  

    show() {
        this.canvas.add(this.bubble);
    }

    hide() {
        this.canvas.remove(this.bubble);
    }
}