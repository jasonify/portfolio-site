var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();
var count = 0;

// build a rope!
var ropeLength = 30;
var multipyer = 0.5;
var points = [];

for (var i = 0; i < 25; i++)
{
    points.push(new PIXI.Point(i * ropeLength, 0));
}

var strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage('snake.png'), points);

// img width
var offsetLeft = (window.innerWidth - 631 ) / 2;
strip.position.x = offsetLeft;

// img height
var offsetTop = (window.innerHeight  -  127) /2;
strip.position.y = offsetTop;

stage.addChild(strip);

var g = new PIXI.Graphics();

g.x = strip.x;
g.y = strip.y;
stage.addChild(g);

// start animating
animate();

function animate() {

    count += 0.1;

    // make the snake
    for (var i = 0; i < points.length; i++) {
        points[i].y = Math.sin((i * multipyer) + count) * 30;

        points[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * 20;
    }

    // render the stage
    renderer.render(stage);
    requestAnimationFrame(animate);
}


document.addEventListener('mousemove', function(e){
  var diff = Math.abs(window.innerWidth / 2 - e.clientX);
  console.log('diff', diff);
  diff *= 0.001;
  multipyer = diff;
  console.log('clientX', diff);


});

function renderPoints () {

    g.clear();

    g.lineStyle(2,0xffc2c2);
    g.moveTo(points[0].x,points[0].y);

    for (var i = 1; i < points.length; i++) {
        g.lineTo(points[i].x,points[i].y);
    };

    for (var i = 1; i < points.length; i++) {
        g.beginFill(0xff0022);
        g.drawCircle(points[i].x,points[i].y,10);
        g.endFill();
    };
}
