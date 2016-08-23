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

        img.src = 'images/jelly.png';



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

    var points = [];
    points.push({x: 0, y: 0});
    points.push({x: 100, y: 50});
    points.push({x: 400, y: 150});
    points.push({x: 100, y: 250});

    //ctx.translate(300, 300);
    //drawPoints(points);

    var render = function() {

      ctx.restore();
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(width/2, height/2);

      for(var j = -2 ; j < 2 ; j++){
        var points1 = [];
        for(var i = 0; i < 5 ; i++){
          var x = Math.sin(i*angle);

          //console.log('x', x);
          points1.push({x: x*50 + j*40 + 20, y: -img.height*0.065  + i*40});
        }
        angle+=speed;
        drawPoints(points1);
      }

      ctx.drawImage(img,  -img.width/2 
      , -img.height /2 , img.width, img.height);

      requestAnimationFrame(render);
    }

    //context.drawImage(img, width/2-img.width/2, height/2-img.height/2, img.width, img.height);
    img.onload = function() {
      console.log('img loaded');
      render();
    }


};
