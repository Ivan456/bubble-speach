export default function extendFabricPathBubble(fabric, canvas) {
  canvas.preserveObjectStacking = true

  fabric.BubblePath = fabric.util.createClass(fabric.Path, {
    name: 'BubblePath',
    type: 'BubblePath',
    initialize: function(options) {
      this.callSuper('initialize', options)
    },
  })

  fabric.BubblePath.fromObject = function(
    { bubbleOptions, pointerOptions, additioanalProps },
    callback
  ) {
    Bubble.create(
      fabric,
      canvas,
      bubbleOptions,
      pointerOptions,
      additioanalProps
    )
    callback && callback(null, new Error('error Bubble'))
  }
}
