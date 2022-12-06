<<<<<<< HEAD
$(window).scroll(function () {
  var scroll = $(".inv-animate-fade").scrollTop();
  console.log(scroll);
  if (scroll >= 100) {
    $(".inv-animate-fade").fadeOut(2000);
  } else {
    $(".inv-animate-fade").fadeIn(2000);
  }
});
=======
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  
  window.addEventListener("scroll", reveal);
  
>>>>>>> c8cdb58f23119d4c599236a0d7eab7734c346544
