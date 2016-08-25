window.onload = function(){
  console.log('Loaded');

  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      angle = 0,
      speed = 0.01


      var ctx = context;
      var img = new Image();

      img.src = 'mouse.png';


      img.addEventListener('load', function(){

        var render = function(){
          ctx.restore();
          ctx.save();

          ctx.translate( width / 2, height / 2);
          ctx.drawImage(img,-img.width/2, -img.height/2, img.width, img.height);

          setTimeout(function(){ 
            render();
          }, 1000/30);
        }
        render();
      });



};
