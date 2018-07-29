import BubblePath from './BubblePath'
import BubblePointer from './BubblePointer'

export default class Bubble {
  static create(
    fabric,
    canvas,
    bubbleOptions,
    pointerOptions,
    additioanalProps
  ) {
    return new Bubble(
      fabric,
      canvas,
      bubbleOptions,
      pointerOptions,
      additioanalProps
    )
  }

  constructor(fabric, canvas, bubbleOptions, pointerOptions, additioanalProps) {
    this.id = 'Bubble' + Date.now()
    this.additioanalProps = additioanalProps
    this.canvas = canvas
    this.pointer = new BubblePointer(this.canvas, pointerOptions)
    this.bubble = new BubblePath(
      this.canvas,
      bubbleOptions,
      this.pointer,
      this.additioanalProps,
      fabric
    )

    this.pointer.setBubble(this.bubble)
    this.init()

    return this.bubble
  }

  init() {
    this.bubble.create()
    this.pointer.create()

    this.canvas.on('selection:cleared', () => {
      this.pointer.hide()
    })

    this.canvas.on('mouse:up', options => {
      this.bubble.scaling(options)

      if (this.bubble.bubble.active) {
        this.pointer.show()
      } else if (options.target === null) {
        this.pointer.hide()
      }
    })
  }
}
