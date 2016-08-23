window.onload = function(){
  console.log('Loaded');

  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,
      angle = 0,
      speed = 0.008


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

    var yLen = 40;
    var xLen = 10;
    var bubblesSpeed = 1;

    // Prep bubbles:
    var bubblesLeft = [];
    var bubbleWidth = 20;
    var bubblesLeftHeight = height + bubbleWidth;
    var bubblesRightHeight = height + bubbleWidth;
    var bubblesRight = [];

    var generateBubbles = function(){
      bubblesLeft = [];
      bubbleWidth = 20;
      bubblesLeftHeight = height + bubbleWidth;
      bubblesRightHeight = height + bubbleWidth;
      bubblesRight = [];

      for(var i = 0; i < 5; i++) {
        bubblesLeft.push({ 
          x: 50-Math.random()*190 + width*0.2, 
          y: Math.random()*200,
          radius: Math.random() * 12 + 5});


          bubblesRight.push({ 
            x: 50-Math.random()*190 + width * 0.8, 
            y: Math.random()*100,
            radius: Math.random() * 22 + 10});
      }
    }
    generateBubbles();



    console.log(bubblesLeft);
    console.log(bubblesRight);

    var renderBubbles = function(){
      bubblesLeftHeight -= bubblesSpeed;
      bubblesRightHeight -= bubblesSpeed;

      if(bubblesRightHeight <= 0 - height*0.3){
        generateBubbles();
      }


      var drawBubble = function(b) {
        context.beginPath();
        console.log(b);
        context.arc(b.x, b.y, b.radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'white';
        context.fill();
      }


      context.clearRect(0,0, canvas.width, canvas.height);
      context.translate(0, bubblesLeftHeight);
      for(var i = 0; i < bubblesLeft.length; i++){
        var leftB= bubblesLeft[i];
        var rightB = bubblesRight[i];
        drawBubble(leftB);
        drawBubble(rightB);
      }


    };

    var render = function() {

      ctx.restore();
      ctx.save();
      renderBubbles();
      ctx.restore();
      ctx.save();

      ctx.translate(width/2, height/2);

      var points1 = [];

      for(var j = -2 ; j < 2 ; j++){
        points1 = [];
        for(var i = 0; i < 5 ; i++){
          var x = Math.sin(j+i*angle);

          //console.log('x', x);
          var x = x*xLen*(5-i) + j*15 + 10;
          points1.push({x: x, y: -img.height*0.075  + i*yLen });
        }
        angle+=speed;
        drawPoints(points1);
      }

      ctx.drawImage(img,  -img.width/2 
      , -img.height /2 , img.width, img.height);


    setTimeout(function(){  requestAnimationFrame(render);
    }, 1000/60);


    }

    //context.drawImage(img, width/2-img.width/2, height/2-img.height/2, img.width, img.height);
    img.onload = function() {
      console.log('img loaded');
      render();
    }

    document.addEventListener('mousemove',function(e){
      var _x = e.clientX;
      var diff = _x - width/2;
      bubblesSpeed = Math.abs(diff * 0.005) + 1.0;
      xLen = diff / width * 20;
      xLen = Math.max( 3, xLen);
      xLen = Math.min(12, xLen);
      //console.log('xLen', xLen);
    });

};
