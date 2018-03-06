// (function(){
    let canvas = new fabric.Canvas('canvas');

    var refresh = function () {
        var namedImg = new LabeledRect();
        canvas.add(namedImg);
        var data = JSON.stringify(canvas);
        canvas.clear();
        canvas.loadFromJSON(data, function() {
           canvas.renderAll();
        });
    }
    const refreshButton = document.querySelector("#refreshButton");
    refreshButton.addEventListener('click', refresh)


    var LabeledRect = fabric.util.createClass(fabric.Path, {

        type: 'labeledRect',
      
        initialize: function(options) {
          options || (options = { });
      
          this.callSuper('initialize', options);
          this.set('label', options.label || '');
        },
      
        toObject: function() {
          return fabric.util.object.extend(this.callSuper('toObject'), {
            label: this.get('label')
          });
        },
      
        _render: function(ctx) {
          this.callSuper('_render', ctx);
      
          ctx.font = '20px Helvetica';
          ctx.fillStyle = '#333';
          ctx.fillText(this.label, -this.width/2, -this.height/2 + 20);
        }
      });

    fabric.NamedImage = fabric.util.createClass(fabric.Path, {
        type: 'named-image',
        initialize: function(element, options) {

            let bubbleOptions = {
                x: 100,
                y: 100,
                w: 200,
                h: 80,
                lineWidth: 2,
                lineColor: "green",
                backgroundColor: "red"}
        
            let pointerOptions = {
                x: 50,
                y: 50,
                radius: 8,
                color: "blue",
            };
            this.callSuper('initialize', bubbleOptions, pointerOptions);
            'options' && this.set('name', 'options.name');

            let bubble = new Bubble(fabric, canvas, bubbleOptions, pointerOptions);
        }
        ,
        toObject: function() {
            return fabric.util.object.extend(this.callSuper('toObject'), { name: this.name });
          }
    });
    fabric.NamedImage.fromObject = function(object, callback) {
          callback && callback(new fabric.NamedImage(object));
      };
      fabric.NamedImage.async = true

// // })()
