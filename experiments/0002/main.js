window.onload = function(){
  console.log('Loaded');


  var toggled = true;



  document.addEventListener('mousedown', function(){
    toggled = !toggled;
    console.log('toggled');

    $('#bee').animate({ 'margin-left': -25 }, 10).animate({ 'margin-left': 0 }, 50).animate({ 'margin-left': 25 }, 10).animate({ 'margin-left': 0 }, 50);


  });


  var counter = 0;

    var render = function(){
      var bee = document.getElementById('bee');
      var body = document.body;

      //counter+=0.5;
    if(counter >= 50) counter = 0;
    var bg1 = 'black';
    var bg2 = 'linear-gradient(to bottom, #f9ed7f '+ counter + '%,#f1da36 ' + (100 - counter) +'%)'

    requestAnimationFrame(render);

    if(toggled){
      body.style.background = bg1;
      bee.style.background =bg2;
    } else {
      body.style.background = bg2;
      bee.style.background =bg1;

    }
  }


  render();
};
