window.onload = function(){
  console.log('Loaded');
  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight



      context.fillStyle="#8BF28B";
      var scale = width/3;
      console.log('scale', scale);

      for(var angle  = 0; angle < Math.PI * 2; angle+=0.01){

        var x = angle * scale;
            y = Math.sin(angle) * scale;
          context.fillRect(x,y, 3,3);
      }

};
