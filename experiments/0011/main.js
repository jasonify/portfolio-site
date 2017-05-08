    var mouseX = 0;
    var mouseY = 0;
    var velocityMultiplier = 3;
    var isMouseDown = false;
    var wasJustRealsed = false;
    var lastMousePositions = [];
    var VECTOR_MIDDLE;

    var catWidth = 200;
    var yarnWidth = 40;
    var eyeRadius = 10;
    var cat;
    var yarn;

    // XXX: vector class
    //  will return a pointe rso doing:
    //  v1 = v2, WILL ONLY BE A REFENCE NOT A DEEP CLONE!!!!!!!!!

    // Vector of Item we are rotation.
    // This should be set to be independent of angleTo center.
    let itemRotationVector = vector.create(1,1);
    itemRotationVector.setAngle(toRadians(0));
    let onMouseDownItemRotationVector = vector.create(1,1);
    onMouseDownItemRotationVector.setAngle(toRadians(0));

    // Mouse angles:
    let startingMouseVector = vector.create(1,1);
    startingMouseVector.setAngle(toRadians(180));
    var endingMouseVector = vector.create(1,1);
    endingMouseVector.setAngle(toRadians(180));

window.onload = function(){
  var canvas =  document.getElementById("canvas");
  var context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;
    VECTOR_MIDDLE = vector.create(width/2, height/2);

    function getDeltaOfAngles(startAngle, endAngle){
      // return startAngle.getAngle
    }

    // atan2 gives us weird negative results for below the circle so we convert
    //  to standard 360 degrees:
    function convertTo360(negativeWeirdDegrees){
      var result = negativeWeirdDegrees;
      if (result < 0) {
        result = 360 + result;
      }
      return result;
    }

    function get360AngleFromCenter(targetVector){
      // This is weird rads result with nevagive stuff
      // We will transform it to clean 360 degrees
      var rads =   VECTOR_MIDDLE.getAngleTo(targetVector.getX(), targetVector.getY());
      return convertTo360( toDegrees(rads));
    }

    function getAngleToMiddle(targetVector){
        return toDegrees(VECTOR_MIDDLE.getAngleTo(targetVector.getX(), targetVector.getY()));
    }

    function getNewRotationForItem(){
      var diffAngle = angleDiff(startingMouseVector, endingMouseVector);
      var initialAngleForItem = convertTo360(toDegrees(onMouseDownItemRotationVector.getAngle()));
      return (initialAngleForItem + diffAngle) %360 ;
    }

    function mousedownRender(){
      var newAngleForItemDegrees = getNewRotationForItem();
      itemRotationVector.setAngle(toRadians(newAngleForItemDegrees));
    }

    function angleDiff(startVector, endVector) {
      // XXX: understand why the atan2 thing works here when subtracting angles:
      var startAngle = getAngleToMiddle(startVector);
      var endAngle = getAngleToMiddle(endVector);
      console.log('startAngle', startAngle, 'endAngle', endAngle);
      var diffAngle = endAngle - startAngle;
      return diffAngle;
    }

    function getAverages(){
      var previousPoint = lastMousePositions[lastMousePositions.length-2]
    }

    function spinPhysics(){
      var previousVector = lastMousePositions[lastMousePositions.length-2]
      // previousVector.setLength(1);

      console.log('prev x,y');
      console.log(previousVector.getX(), previousVector.getY());
      console.log('end x,y');
      console.log(endingMouseVector.getX(), endingMouseVector.getY());
      var diffAngle = angleDiff(previousVector, endingMouseVector);
      console.log('diffAngle', diffAngle,
      'prevAngle', toDegrees(previousVector.getAngle()), toDegrees(endingMouseVector.getAngle()));
      itemRotationVector.setVelocity(diffAngle/ 20);
    }

    function render(){
      resetCanvas();
      drawCenterPiece();
      if(lastMousePositions.length > 1000){
        lastMousePositions.splice(0, lastMousePositions.length-2);
      }

      if(wasJustRealsed) {
        wasJustRealsed = false;
        spinPhysics();
      }

      if(isMouseDown){
        itemRotationVector.setVelocity(null);
        mousedownRender();
      }

      // Safeguard in case it ever gets set to length zero:
      //XXX: bug when item rotation = 0 or 180, it's because length was set to zero somehow
      itemRotationVector.setLength(1);

      itemRotationVector.update();
      drawLeftEye();
      drawRightEye();
      drawYarn();

      setTimeout(function(){
        requestAnimationFrame(render);
      }, 1000/30);
    }

    document.body.addEventListener('mousedown', function(event){
      isMouseDown = true;
      // Resetting thigns
      itemRotationVector.setVelocity(null);
      lastMousePositions = [];
      if(lastMousePositions.length === 0 ){
        lastMousePositions.push(vector.create( mouseX, mouseY));
        lastMousePositions.push(vector.create( mouseX, mouseY));
        lastMousePositions.push(vector.create( mouseX, mouseY));
      }
      onMouseDownItemRotationVector.setAngle(itemRotationVector.getAngle());
      startingMouseVector.setXY(mouseX, mouseY);
    });

    //XXX: bug when item rotation = 0 or 180
    document.body.addEventListener('mouseup', function(event){
      isMouseDown = false;
      mouseX = event.clientX;
      mouseY = event.clientY;
      endingMouseVector.setXY(mouseX, mouseY);
      wasJustRealsed = true;
    });


    // TODO: GET AVG OF LAST FEW SAMPLES.
    // on SET VELOCITY --> empty the array again
    //  Min size of samplesArray
    //
    document.body.addEventListener('mousemove', function(event){
        mouseX = event.clientX;
        mouseY = event.clientY;
        lastMousePositions.push(vector.create( mouseX, mouseY));
        endingMouseVector.setXY(mouseX, mouseY);
    });

    function getColor(){
      return  !isMouseDown? "#000000":"#FF0000";
    };

    function get50MsMouse(){
      return lastMousePositions[lastMousePositions.length -2];
    }

    function drawCenterPiece(){
      context.save();
      context.translate(width/2, height/2);
      context.drawImage(cat,-catWidth/2,-catWidth/2, catWidth, catWidth);
      context.restore();
    }

    function drawYarn(){
      context.save();
      context.translate(width/2, height/2);
      context.rotate(itemRotationVector.getAngle())
      context.drawImage(yarn,-catWidth/2 - yarnWidth,-yarnWidth/2, yarnWidth, yarnWidth);
      context.restore();
    }


    function drawLeftEye(){
      context.save();
      context.translate(width/2, height/2);
      context.translate(-35, 18);
      context.rotate(itemRotationVector.getAngle())
      context.beginPath();
      context.arc(-15, 0, eyeRadius, 0, 2 * Math.PI, false);
      context.fillStyle = 'black';
      context.fill();
      context.restore();
    }

    function drawRightEye(){
      context.save();

      context.translate(width/2, height/2);
      context.translate(35, 18);
      context.rotate(itemRotationVector.getAngle())
      context.beginPath();
      context.arc(-15, 0, eyeRadius, 0, 2 * Math.PI, false);
      context.fillStyle = 'black';
      context.fill();
      context.restore();
    }

    function resetCanvas(){
      context.restore();
      context.clearRect(0,0, width, height);
    }

    // Load imgs:

    yarn = new Image();
    yarn.src = "imgs/yarn.svg"; // can also be a remote URL e.g. http://
    yarn.onload = function() {
      cat = new Image();
      cat.src = "imgs/cat.svg"; // can also be a remote URL e.g. http://
      cat.onload = function() {
        render();
      };
    };

};

// MAX VELOCITY? so it doesnt spin too fast

//--------------------------

// TODO: right now we make wheel point to where we start draging.
      // while kinda okay, would be way better if we take the diff angle and adjust it
      // So we can be at the actual position
      //
      // take (curr_angle / 360) and find out distance from actual mouse pointer
      //    We can do this without even spinning / velocity. just dumb version
      //

// TODO: weight the avgs of the diffs between the last few points.



  // TODO: take sample of last mouse before release to see actual speed to rotate
  //  sample velocity of mouse?, avg between last few points (every ~50 miliseconds for the last 1-2 seconds?)
  //
  //



// TODO: use circle instead

// TODO: when land on a spot, assign to prize.
// TODO: MAYBE when spinning dont allow to spin again until done
//
// TODO: release on window out so it's not so buggy
    //
