export default class BubblePointer {
  constructor(canvas, pointerOptions) {
    this.id = 'BubblePointer' + Date.now()
    this.canvas = canvas

    this.hasControls = false
    this.x = pointerOptions.x
    this.y = pointerOptions.y
    this.radius = pointerOptions.radius
    this.color = pointerOptions.color
    this.pointer = {}
    this.hidden = pointerOptions.hidden || true

    this.innerText = {}
    this.group = {}
  }

  setBubble(bubble) {
    this.bubble = bubble
  }

  create() {
    let pointerConfig = {
      radius: this.radius,
      fill: this.color,
      left: this.x,
      top: this.y,
      hasControls: this.hasControls,
      hasBorders: this.hasControls,
    }

    this.pointer = new fabric.Circle(pointerConfig)
    this.pointer.on('moving', options => {
      this.moving(options)
    })
    this.pointer.on('mousedown', options => {
      this.setVisible(false)
    })
    this.pointer.on('mouseup', options => {
      this.setVisible(true)
    })
  }

  update() {
    var pointerConfig = {
      left: this.x,
      top: this.y,
    }

    this.pointer.set(pointerConfig)

    if (this.hidden === false) {
      this.hide()
      this.show()
    }
  }

  show() {
    if (this.hidden) {
      this.canvas.add(this.pointer)
      this.hidden = false
    }
  }

  setVisible(bool) {
    this.pointer.visible = bool
  }

  hide() {
    this.canvas.remove(this.pointer)
    this.hidden = true
  }

  moving(options) {
    this.x = options.e.offsetX
    this.y = options.e.offsetY
    this.bubble.update()
  }
}
