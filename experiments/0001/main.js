window.onload = function(){
  console.log('Loaded');
  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight

      var clear = function(){
        console.log('width', width);
        console.log('height', height);
        //context.translate(0, -height/2);
        context.clearRect(0, 0, width, height);
      };


      var drawLine = function(scale) {

        // context.translate(0, height/2);
        context.fillStyle="#8BF28B";

        console.log('scale', scale);

        for(var angle  = 0; angle < Math.PI * 2; angle+=0.01){
          var x = angle * scale;
          y = Math.sin(angle) * scale;
          context.fillRect(x,y, 3,3);
        }
      };

      var scale = height/3;
      drawLine(scale);

      document.body.addEventListener('mousemove', function(e){
        console.log('e', e);
        context.translate(0, height/2);
        drawLine(e.clientX);
        context.translate(0, -height/2);

      });

};
