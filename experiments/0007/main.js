window.onload = function(){
  console.log('Loaded');
  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight

      var ctx = context;


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

        ctx.stroke();
    }

    var points = [];
    points.push({x: 0, y: 0});
    points.push({x: 100, y: 50});
    points.push({x: 400, y: 150});
    points.push({x: 100, y: 250});

    drawPoints(points);


};
