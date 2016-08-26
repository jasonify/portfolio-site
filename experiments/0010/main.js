$(window).load(function() {
  console.log('jquery');
  var scrolled = true;
  $(document).on('click', function(){
    if(scrolled){
      $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    } else {
      $("html, body").animate({ scrollTop: 0 }, 1000);
    }
    scrolled = !scrolled;
  });
  });

window.onload = function(){
  console.log('Loaded');


    /*
  document.addEventListener('mousedown', function(){
    window.scrollTo(0,document.body.scrollHeight);

  });
  */
};
