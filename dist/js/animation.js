$(window).scroll(function () {
  var scroll = $(".inv-animate-fade").scrollTop();
  console.log(scroll);
  if (scroll >= 100) {
    $(".inv-animate-fade").fadeOut(2000);
  } else {
    $(".inv-animate-fade").fadeIn(2000);
  }
});
