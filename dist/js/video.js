const container = $('.video-container')
const videoTimeLine = $('.video-timeline')
const mainVideo = $('#inv-video').get(0)
const progressBar = $('.progress-bar')
const playPause = $('.play-pause')
const skipBackward = $('.skip-backward')
const skipForward = $('.skip-forward')
const volumeButton = $('.volume')
const volumeSlider = $('.volume-slider')
const speedButton = $('.playback-speed')
const speedOptions =  $('.speed-options')
const picInPic = $('.pic-in-pic')
const fullScreen = $('.fullscreen')
const timeCurrent = $('.time-current')
const timeEnd = $('.time-end')

let timer

const hideControls = () => {
  if (mainVideo.paused) return
  timer = setTimeout(() => {
    console.log("ERE");
    container.removeClass('show-controls')
  }, 3000);
}

hideControls()

container.mousemove(() => {
  container.addClass('show-controls')
  clearTimeout(timer)
  hideControls()
})

const formatTime = time => {
  let seconds = Math.floor(time % 60)
  let minutes = Math.floor(time / 60) % 60
  let hours = Math.floor(time / 3600)

  seconds = seconds < 10 ? `0${seconds}` : seconds
  minutes = minutes < 10 ? `0${minutes}` : minutes
  hours = hours < 10 ? `0${hours}` : hours
  
  if (hours == 0) { return `${minutes}:${seconds}`}
  return `${hours}:${minutes}:${seconds}`
}

$('#inv-video').on('timeupdate', e => {
  let {currentTime, duration} = e.target
  let percent = (currentTime / duration) * 100
  progressBar.width(`${percent}%`)
  timeCurrent.text(formatTime(currentTime))
})

$('#inv-video').on('loadeddata', e => {
  timeEnd.text(formatTime(e.target.duration))
})

videoTimeLine.click(e => {
  let timelineWidth = $(videoTimeLine).outerWidth()
  mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration
})

const draggableBar = e => {
  let timelineWidth = $(videoTimeLine).outerWidth()
  progressBar.width(`${e.offsetX}px`)
  mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration
  timeCurrent.text(formatTime(mainVideo.currentTime))
}

videoTimeLine.mousemove(e => {
  let progressTime = videoTimeLine.find('span')
  let offsetX = e.offsetX
  progressTime.css('left', `${offsetX}px`)
  let timelineWidth = $(videoTimeLine).outerWidth()
  let percent = (e.offsetX / timelineWidth) * mainVideo.duration
  progressTime.text(formatTime(percent))
})

videoTimeLine.mousedown(() => {
  videoTimeLine.bind('mousemove', draggableBar)
})
container.mouseup(()=> {
  videoTimeLine.unbind('mousemove', draggableBar)
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
     mainVideo.volume = 1.0;
     v_icon.removeClass('fa-volume-xmark').addClass('fa-volume-high')
  }
})

volumeSlider.on('change keyup input', e => {
  let volume = e.target.value
  let v_icon = volumeButton.children('svg:first')
  mainVideo.volume = volume;
  if (volume == 0) {
    v_icon.removeClass('fa-volume-high').addClass('fa-volume-xmark')
  }
  else {
    v_icon.removeClass('fa-volume-xmark').addClass('fa-volume-high')
  }
})

speedButton.click(() => {
  speedOptions.toggleClass('show')
});

speedOptions.find('li').each((i, option) => {
  $(option).click(e => {
    let speed = $(option).data('speed')
    mainVideo.playbackRate = speed
    $(speedOptions).find('li.active').removeClass('active')
    $(option).addClass('active')
  })
})

picInPic.click(() => {
  mainVideo.requestPictureInPicture()
})

fullScreen.click(() => {
  if (!document.fullscreenElement) {
    if(mainVideo.requestFullscreen){
      container.get(0).requestFullscreen()
    } 
    else if (mainVideo.webkitRequestFullscreen){
      container.get(0).webkitRequestFullscreen()
    }
    else if (mainVideo.mozRequestFullScreen){
      container.get(0).mozRequestFullScreen()
    }
    else if (mainVideo.msRequestFullscreen){
      container.get(0).msRequestFullscreen()
    }
    fullScreen.children(':first').removeClass('fa-expand').addClass('fa-compress')
  }
  else {
    fullScreen.children(':first').removeClass('fa-compress').addClass('fa-expand')
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
  }
})

playPause.click(() => {
  mainVideo.paused ? mainVideo.play() : mainVideo.pause()
  if (mainVideo.paused) {
    playPause.children(':first').removeClass('fa-pause').addClass('fa-play')
  }
  else {
    playPause.children(':first').removeClass('fa-play').addClass('fa-pause')
  }
})

$(document).click(e => {
  if (e.target.tagName != 'SPAN' && e.target.className != 'material-symbols-rounded') {
    speedOptions.removeClass('show')
  }
})