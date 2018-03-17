fabric.CustomObject = fabric.util.createClass(fabric.Path, {
			type: 'CustomObject',
    
			initialize: function (points, options) {
				options = options || [];
				this.callSuper('initialize',points, options);
				
				this.set('borderColor', 'red');
				this.set('cornerColor', 'green');
				this.set('cornerSize', 7);
				this.set('transparentCorners', false);
				this.set('hasRotatingPoint', false);
				this.set('lockScalingFlip', true);
				this.set('strokeWidth', 2);
				this.set('fill', 'red');
				this.set('stroke', 'green');
			},
		});
	
			
		fabric.CustomObject.fromObject = function (object, callback) {
			fabric.Object._fromObject("CustomObject", object, callback, 'path');
		};