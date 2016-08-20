window.onload = function(){
  console.log('Loaded');
  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      radius = width / 3,
      objSize = 15;



      context.translate(width /2  ,  height /2)
      context.fillStyle='black';
      context.beginPath();
      context.arc(0, 0, objSize, 0, 2 * Math.PI);
      context.stroke();
      context.fill();



};
