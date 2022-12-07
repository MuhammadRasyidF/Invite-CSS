
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
var anim1 = new ScrollAnimation('.inv-reveal', {
    'position': 'relative',
    'transform': 'translateY(150px)',
    'opacity': '0',
    'transition': '1s all ease'
}, {
    'transform': 'translateY(0)',
    'opacity': '1',
}, 150, true)

var anim2 = new ScrollAnimation('.inv-reveal-rand', {
    'position': 'relative',
    'transform': 'translateY(150px)',
    'opacity': '0',
    'transition': '1s all ease'
}, {
    'transform': 'translateY(0)',
    'opacity': '1',
}, () => {
    return 100 + Math.floor(Math.random() * 150);
}, false)

var anim3 = new ScrollAnimation('.inv-spin', {
    'position': 'relative',
    'transform': 'rotate(360deg)',
    'opacity': '0',
    'transition': '1s all ease'
}, {
    'transform': 'rotate(0)',
    'opacity': '1',
}, 150, true)

var anim4 = new ScrollAnimation('.inv-scale', {
    'position': 'relative',
    'transform': 'scale(0, 0)',
    'opacity': '0',
    'transition': '1s all ease'
}, {
    'transform': 'scale(1, 1)',
    'opacity': '1',
}, 150, true)

var anim5 = new ScrollAnimation('.inv-opacity', {
    'position': 'relative',
    'opacity': '0',
    'transition': '1.5s all ease'
}, {
    
    'opacity': '1',
}, 200, true)

window.addEventListener("scroll", () => {
    anim1.animate();
    anim2.animate();
    anim3.animate();
    anim4.animate();
    anim5.animate();
});