$(document).ready(() => {
  var cnt = new Countdown("cntd", new Date("2023-5-31 23:59:59 GMT+0700"));

  setInterval(function () {
    cnt.tick();
    cnt.draw();
  }, 1000);

  $("#reservation-btn").click(() => {
    $("html, body").animate(
      {
        scrollTop: $(".location-wrapper").offset().top,
      },
      "slow"
    );
  });
});

// Animation Usage
var anim1 = new ScrollAnimation(
  ".inv-reveal",
  {
    position: "relative",
    transform: "translateY(150px)",
    opacity: "0",
    transition: "1s all ease",
  },
  {
    transform: "translateY(0)",
    opacity: "1",
  },
  150,
  true
);

var anim2 = new ScrollAnimation(
  ".inv-reveal-rand",
  {
    position: "relative",
    transform: "translateY(150px)",
    opacity: "0",
    transition: "1s all ease",
  },
  {
    transform: "translateY(0)",
    opacity: "1",
  },
  () => {
    return 100 + Math.floor(Math.random() * 75);
  },
  true
);

var anim3 = new ScrollAnimation(
  ".inv-spin",
  {
    position: "relative",
    transform: "rotate(360deg)",
    opacity: "0",
    transition: "1s all ease",
  },
  {
    transform: "rotate(0)",
    opacity: "1",
  },
  150,
  true
);

window.addEventListener("scroll", () => {
  anim1.animate();
  anim2.animate();
  anim3.animate();
});
