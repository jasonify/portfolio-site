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


      // Does not handle negative numbers
      // TODO: Just do abs value to fix
      var ghettoMap = function(sourceValue, sourceLow, sourceHigh, targetLow, targetHigh) {
        var sourceDiff = sourceHigh - sourceLow;
        var targetDiff = targetHigh - targetLow;

        var multiplyer = targetHigh / sourceDiff
        return targetLow + multiplyer * sourceValue;
      }

      var drawLine = function(scale) {

        // context.translate(0, height/2);
        //context.fillStyle="#8BF28B";

        console.log('scale', scale);

        for(var angle  = 0; angle < Math.PI * 2; angle+=0.01){
          var x = angle * scale;
          y = Math.sin(angle) * scale;
          context.fillRect(x,y, 3,3);
        }
      };

      // XXX: remove:
      window.ghettoMap = ghettoMap;

      var scale = height/3;
      drawLine(scale);

      document.body.addEventListener('mousemove', function(e){
        console.log('e', e);
        context.translate(0, height/2);
        drawLine(e.clientX);
        context.translate(0, -height/2);

        var rgb = Math.floor(Math.random() * 3);
        var rgbs = [0, 0, 0];
        rgbs[rgb] = ghettoMap(e.clientY, 0, height, 0, 255);
        var rgbStr = "rgb(" +  rgbs[0] + " , "  + rgbs[1]  + ", " + rgbs[2] + ")";
        context.fillStyle = rgbStr;
        console.log(rgbStr);


      });

};
