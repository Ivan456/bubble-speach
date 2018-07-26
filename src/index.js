import Bubble from './bubble'
import extendFabricPathBubble from './extendFabricPathBubble'

if (window) {
    window.Bubble = Bubble
    window.extendFabricPathBubble = extendFabricPathBubble
}

export {Bubble, extendFabricPathBubble}