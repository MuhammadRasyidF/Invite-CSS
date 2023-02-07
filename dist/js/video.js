const container = $('.container')
const mainVideo = $('#inv-video').get(0)
const progressBar = $('.progress-bar')
const playPause = $('.play-pause')
const skipBackward = $('.skip-backward')
const skipForward = $('.skip-forward')
const volumeButton = $('.volume')

$('#inv-video').on('timeupdate', (e) => {
  let {currentTime, duration} = e.target
  let percent = (currentTime / duration) * 100
  progressBar.width(`${percent}%`)
  // console.log(currentTime, duration);
})

skipBackward.click(() => {
  mainVideo.currentTime -= 5
})

skipForward.click(() => {
  mainVideo.currentTime += 5
})

volumeButton.click(() => {
  let v_icon = volumeButton.children('svg:first')
  if (v_icon.hasClass('fa-volume-high')) {
    mainVideo.volume = 0.0;
    v_icon.removeClass('fa-volume-high').addClass('fa-volume-xmark')
  }
  else {
     mainVideo.volume = 0.5;
     v_icon.removeClass('fa-volume-xmark').addClass('fa-volume-high')
  }
})

playPause.click(() => {
  mainVideo.paused ? mainVideo.play() : mainVideo.pause();
  if (mainVideo.paused) {
    playPause.children(':first').removeClass('fa-pause').addClass('fa-play')
  }
  else {
    playPause.children(':first').removeClass('fa-play').addClass('fa-pause')
  }
})