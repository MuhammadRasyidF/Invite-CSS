
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