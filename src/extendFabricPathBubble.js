function extendFabricPathBubble (fabric, canvas) {
  canvas.preserveObjectStacking = true

  fabric.BubblePath = fabric.util.createClass(fabric.Path, {
    type: 'BubblePath',
    initialize: function (options) {
      this.callSuper('initialize', options)
    }
  })
  fabric.BubblePath.fromObject = function ({ bubbleOptions, pointerOptions }, callback) {
    let bubble = new Bubble(fabric, canvas, bubbleOptions, pointerOptions)
    callback && callback(null, new Error('error Bubble'))
  }
}
