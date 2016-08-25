window.onload = function(){
  console.log('Loaded');

  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      angle = 0,
      inMotion = true,
      shakes = 1000,
      speed = 0.1


      var ctx = context;
      var img = new Image();
      img.src = 'mouse.png';



      var drawPoints = function(points) {
        

        ctx.beginPath();
        // move to the first point
        ctx.moveTo(points[0].x, points[0].y);

        for (i = 1; i < points.length - 2; i ++)
        {
          var xc = (points[i].x + points[i + 1].x) / 2;
          var yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }

        // curve through the last two points
        ctx.quadraticCurveTo(points[i].x, points[i].y, points[i+1].x,points[i+1].y);

        ctx.strokeStyle = '#E4AFFF';
        ctx.lineCap = "round";
        ctx.lineWidth = 6;
        ctx.stroke();
    }

      var drawCord = function(){
        var points = [];
        points.push({x: -img.width*0.02, y: 0});
        points.push({x: -img.width*0.02, y: -180});
        
        for(var i = 4; i < 12; i++){
          points.push({x: Math.sin(angle+i)*100 , y: -i*60  });
        }


        if(inMotion){
        angle+= speed;
        }
        console.log(JSON.stringify(points));
        drawPoints(points);

      };

      img.addEventListener('load', function(){

        var render = function(){
          ctx.restore();
          ctx.save();
          ctx.clearRect(0,0, width, height);

          ctx.translate( width / 2, height / 2);

          drawCord();
          ctx.drawImage(img,-img.width/2, -img.height/2, img.width, img.height);


          setTimeout(function(){ 
            render();
          }, 1000/30);
        }
        render();
      });



};
