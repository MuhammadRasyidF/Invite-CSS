// Usage to 31 December 2022, 23:59:59
var cnt = new Countdown("cntd", new Date("2022-12-31 23:59:59 GMT+0700")); 

setInterval(function() {
    cnt.tick();
    cnt.draw();
  
}, 1000);