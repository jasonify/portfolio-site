window.onload = function(){
  console.log('Loaded');


  var img = new Image();
  img.src = 'images/head.png';

  var imgBody = new Image();
  imgBody.src = 'images/body.png';


  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight

      //var img = document.getElementById("head");

      var centerY = height * 0.5,
          centerX = width * 0.5,
          offset = height * 0.01,
          mouseX = 0,
          speed = 0.1,
          rotateAngle = 0,
          rotateSpeed = 0.001,
          angle = 0;

      function render() {
        var y = centerY  + Math.sin(angle) * offset;

        context.clearRect(0,0, width, height);
        context.beginPath();
        var imgWidth = img.width / 2;
        var imgHeight = img.height / 2;



        context.rotate(rotateAngle);

        context.drawImage(img, centerX - imgWidth/2, y- imgHeight /2, imgWidth, imgHeight);


        context.rotate(-1*rotateAngle);



        context.drawImage(imgBody, centerX - imgBody.width/4, centerY - imgBody.height /4, imgBody.width/2 , imgBody.height/2);
        

        rotateAngle+= rotateSpeed;
        console.log(rotateAngle);

        if(rotateAngle >= (Math.PI * 0.03)){
          rotateSpeed *= -1;
        } else if (rotateAngle  <= ( Math.PI * -0.03)){
          rotateSpeed *= -1
        }


        //angle += speed;

        requestAnimationFrame(render);
      };

      img.onload = function(){
        console.log('loaded img');
        render();
      }

      imgBody.onload = function(){
        console.log('loaded imgBody');
     }

      var clear = function(){
        console.log('width',  width);
        console.log('height', height);
        //context.translate(0, -height/2);
        context.clearRect(0, 0, width, height);
      };


      document.body.addEventListener('mousemove', function(e){
        console.log('e', e);
        mouseX = e.clientX;
        console.log('offset', offset, mouseX, centerX);
        offset = Math.min(height / (Math.abs(mouseX - centerX) + 4)  , height * 0.03);
      });

};


/*

   window.onload = function() {
   var c=document.getElementById("myCanvas");
   var ctx=c.getContext("2d");
   ctx.drawImage(img,10,10);
   };
*/
