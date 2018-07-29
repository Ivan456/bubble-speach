let canvas = new fabric.Canvas('canvas')

var refresh = function() {
  var data = JSON.stringify(canvas)
  canvas.loadFromJSON(data, function() {
    canvas.renderAll()
  })
}
const refreshButton = document.querySelector('#refreshButton')
refreshButton.addEventListener('click', refresh)

const bubbleOptions = {
  x: 200,
  y: 200,
  w: 200,
  h: 80,
  lineWidth: 2,
  lineColor: 'green',
  backgroundColor: 'red',
}

const pointerOptions = {
  x: 150,
  y: 150,
  radius: 8,
  color: 'blue',
}

let additioanalProps = {
  id: 0,
  anyName: 'anyValue',
  anyName2: [2],
}

extendFabricPathBubble(fabric, canvas)
let i = 3
while (i--) {
  Bubble.create(fabric, canvas, bubbleOptions, pointerOptions, additioanalProps)
  bubbleOptions.x += 250
  pointerOptions.x += 250

  additioanalProps = JSON.parse(JSON.stringify(additioanalProps))
  additioanalProps.id = i
}
