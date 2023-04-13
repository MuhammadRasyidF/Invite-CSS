$(document).ready(() => {
    var cnt = new Countdown("cntd", new Date("2023-2-25 18:00:00 GMT+0700"));
  
    let section = $(`#banner1, #banner2, #banner3, #banner4, #banner5, #banner6`);
    section.hide()

    setInterval(function () {
      cnt.tick();
      cnt.draw();
    }, 1000);
  
    $("#openInvitation").click(() => {
      section.show()
      $("html, body").animate(
        {
          scrollTop: $("#banner1").offset().top,
        },
        "slow"
      );
    });
  });
  
  const video_2 = new VideoContainer('#videoId1')

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
  