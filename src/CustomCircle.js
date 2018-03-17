fabric.CustomCircle = fabric.util.createClass(fabric.Circle, {
			type: 'CustomCircle',
    
			initialize: function (points) {
				this.callSuper('initialize',points);
				
				this.set('radius', 8);
				this.set('fill', "green");
				this.set('hasControls', false);
				this.set('hasBorders', false);
			}
		});
	
			
		fabric.CustomCircle.fromObject = function (object, callback) {
			fabric.Object._fromObject("CustomCircle", object, callback, 'circle');
		};