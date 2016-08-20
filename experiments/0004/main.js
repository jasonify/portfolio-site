window.onload = function(){
  console.log('Loaded');
  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      radius = width / 4,
      angle = 0,
      speed = 0.05,
      objSize = 15;

      var tree = new Image();
      tree.src  = 'tree.png';

      var render = function() {
        context.restore();
        context.clearRect(0, 0, width, height);
        context.save();
        context.translate(width /2  ,  height /2)
        context.drawImage(tree, 0-tree.width/6,0-tree.height/6, tree.width/3, tree.height/3);
        context.fillStyle='black';
        context.beginPath();

        var x = radius * Math.sin(angle);
        var y =  radius * Math.cos(angle);
        console.log('x', x, 'y', y);

        context.arc(x, y, objSize, 0, 2 * Math.PI);
        context.stroke();
        context.fill();

        angle+=speed;
        console.log('angle', angle);

        requestAnimationFrame(render);
       
      }

      render();




};
