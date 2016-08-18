window.onload = function(){
  console.log('Loaded');


  var toggled = true;



  document.addEventListener('mousedown', function(){
    toggled = !toggled;
    console.log('toggled');

  });


  var counter = 0;

    var render = function(){
      var bee = document.getElementById('bee');
      var body = document.body;

    counter++;
    if(counter >= 100) counter = 0;
    var bg1 = 'black';
    var bg2 = 'linear-gradient(to bottom, #fefcea 0%,#f1da36 100%)'

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
