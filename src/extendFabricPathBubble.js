function extendFabricPathBubble (fabric) {
    fabric.BubblePath = fabric.util.createClass(fabric.Path, {
        type: 'BubblePath',
        initialize: function(options) {
            this.callSuper('initialize', options);
        }
    });
    fabric.BubblePath.fromObject = function ({ bubbleOptions, pointerOptions }, callback) {
        new Bubble(fabric, canvas, bubbleOptions, pointerOptions);
        canvas.renderAll();
    };
}
