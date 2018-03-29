function extendFabricPathBubble (fabric, canvas) {
    fabric.BubblePath = fabric.util.createClass(fabric.Path, {
        type: 'BubblePath',
        initialize: function(options) {
            this.callSuper('initialize', options);
        }
    });
    fabric.BubblePath.fromObject = function ({ bubbleOptions, pointerOptions }, callback) {
        let bubble = new Bubble(fabric, canvas, bubbleOptions, pointerOptions);
        canvas.renderAll();
        // callback && callback();
    };
}
