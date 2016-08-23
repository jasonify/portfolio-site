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
      var points1 = [];
      for(var i = 0; i < 10 ; i++){
        var x = i;
        points1.push({x: x, y: -img.height*0.055  + i*20});
      }

      ctx.save();
      ctx.translate(width/2, height/2);
      drawPoints(points1);
      ctx.drawImage(img,  -img.width/2 
      , -img.height /2 , img.width, img.height);
    }

    //context.drawImage(img, width/2-img.width/2, height/2-img.height/2, img.width, img.height);
    img.onload = function() {
      console.log('img loaded');
      render();
    }


};
