let bubbleOptions = {
    canvasId: "canvas",
    x: 100,
    y: 100,
    w: 200,
    h: 80,
    lineWidth: 2,
    lineColor: "green",
    backgroundColor: "red"
};

let pointerOptions = {
    x: 50,
    y: 50,
    radius: 4,
    color: "blue",
};

let bubble = new BubbleCreator(fabric, bubbleOptions, pointerOptions);
bubble.init();