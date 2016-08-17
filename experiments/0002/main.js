window.onload = function(){
  console.log('Loaded');

  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight

      var centerY = height * 0.5,
          centerX = width * 0.5,
          offset = height * 0.01,
          speed= 0.1,
          angle = 0;

      function render() {
        var y = centerY  + Math.sin(angle) * offset;

        context.clearRect(0,0, width, height);
        context.beginPath();
        context.arc(centerX, y, 50, 0, Math.PI * 2, false);
        context.fill();
        angle += speed;

        requestAnimationFrame(render);
      };

      render();

      var clear = function(){
        console.log('width',  width);
        console.log('height', height);
        //context.translate(0, -height/2);
        context.clearRect(0, 0, width, height);
      };

};
