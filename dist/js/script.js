// Usage to 31 December 2022, 23:59:59
var cnt = new Countdown("cntd", new Date("2022-12-31 23:59:59 GMT+0700"));

setInterval(function () {
  cnt.tick();
  cnt.draw();
}, 1000);

// Animation Usage
var anim1 = new ScrollAnimation(
  ".reveal",
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
  false
);

window.addEventListener("scroll", () => {
  anim1.animate();
});

// Video Usage
const video_1 = new VideoContainer('#video_1')
const video_2 = new VideoContainer('#video_2')