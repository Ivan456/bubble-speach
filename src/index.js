import Bubble from './bubble.js'
import extendFabricPathBubble from './extendFabricPathBubble.js'

if (window) {
  window.Bubble = Bubble
  window.extendFabricPathBubble = extendFabricPathBubble
}

export { Bubble, extendFabricPathBubble }
