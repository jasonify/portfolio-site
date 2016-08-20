window.onload = function(){
  console.log('Loaded');
  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      radius = width / 4,
      angle = 0,
      speed = 0.02,
      objSize = 15;

      var tree = new Image();
      tree.src  = 'tree.png';
      var fps = 60;
      var sun = new Image();
      sun.src = 'sun.png';

      var render = function() {
        setTimeout(function() {

        context.restore();
        context.clearRect(0, 0, width, height);
        context.save();
        context.translate(width /2  ,  height /2)

        context.drawImage(tree, 0-tree.width/6,0-tree.height/6, tree.width/3, tree.height/3);
        context.fillStyle='black';
        context.beginPath();

        var x = radius * Math.sin(angle);
        var y =  radius * Math.cos(angle);

        context.drawImage(sun, x-sun.width/2, y-sun.height/2, sun.width, sun.height);
        //context.arc(x, y, objSize, 0, 2 * Math.PI);
        context.stroke();
        context.fill();

        angle+=speed;

        requestAnimationFrame(render);
        }, 1000/ fps);
       
      }

      render();

      document.addEventListener('mousemove', function(e){
        var x = e.clientX;
        if( Math.abs(width /2 - x) <= width * 0.1){
          speed = 0.1
        } else{
          speed = 0.02;
        }
      });



};
