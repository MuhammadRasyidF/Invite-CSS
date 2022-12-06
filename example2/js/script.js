
$(document).ready(()=> {
    var cnt = new Countdown("cntd", new Date("2022-12-31 23:59:59 GMT+0700")); 
    
    setInterval(function() {
        cnt.tick();
        cnt.draw();
      
    }, 1000);
    
    $('#reservation-btn').click(() => {
        $('html, body').animate({
            scrollTop: $('.location-wrapper').offset().top
        }, 'slow')
    })
})

// Animation Usage
var anim1 = new ScrollAnimation('.reveal', {
    'position': 'relative',
    'transform': 'translateY(150px)',
    'opacity': '0',
    'transition': '1s all ease'
}, {
    'transform': 'translateY(0)',
    'opacity': '1',
}, 150, true)

window.addEventListener("scroll", () => {
    anim1.animate();
});