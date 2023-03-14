class VideoContainer {
    obj = null

    // component
    video = null

    // btn
    btnPlay = null
    btnSeekBackward = null
    btnSeekForward = null
    btnVolume = null
    btnSpeed = null
    btnPicInPic = null
    btnFullScreen = null
    volumeSlider = null
    speedOptions = null
    
    // time
    timeLine = null
    timeProgress = null
    timeEnd = null
    timeCurrent = null
    time = null
    
    constructor (obj) {
        this.handleObject(obj)
        this.handleTimeProgress('.inv-progress-bar')
        this.HandleTimeText('.time-current', '.time-end')
        this.handleVideo('.inv-video')
        this.handleTimeLine('.inv-timeline')
        this.handlePlay('.inv-vctr-play-pause')
        this.handleSeek('.inv-vctr-seek-back', '.inv-vctr-seek-forward')
        this.handleVolume('.volume')
        this.handleVolumeSlider('.inv-vctr-volume')
        this.handleSpeed('.inv-vctr-playback', '.speed-options')
        this.handlePicInPic('.inv-vctr-pip')
        this.handleFullscreen('.inv-vctr-fullscreen')
        this.hideControls()
    }

    formatTime(time) {
        let seconds = Math.floor(time % 60)
        let minutes = Math.floor(time / 60) % 60
        let hours = Math.floor(time / 3600)

        seconds = seconds < 10 ? `0${seconds}` : seconds
        minutes = minutes < 10 ? `0${minutes}` : minutes
        hours = hours < 10 ? `0${hours}` : hours
        
        if (hours == 0) { return `${minutes}:${seconds}`}
        return `${hours}:${minutes}:${seconds}`
    }

    hideControls() {
        if (this.video.get(0).paused) return
        this.time = setTimeout(() => {
            this.obj.removeClass('show-controls')
        }, 3000)
    }

    handleObject(name) {
        this.obj = $(name).eq(0)
        console.log(`Initializing video container for ${name}`);
        this.obj.mousemove(() => {
            this.obj.addClass('show-controls')
            clearTimeout(this.time)
            this.hideControls()
        })
    }

    handleTimeProgress(name) {
        this.timeProgress = this.obj.find(name)
    }

    handleTimeLine(name) {
        this.timeLine = this.obj.find(name)
        this.timeLine.click(e => {
            let timeLineWidth = $(this.timeLine).outerWidth()
            this.video.get(0).currentTime = (e.offsetX / timeLineWidth) * this.video.get(0).duration
        })
        const draggableBar = e => {
            let timelineWidth = $(this.timeLine).outerWidth()
            this.timeProgress.width(`${e.offsetX}px`)
            this.video.get(0).currentTime = (e.offsetX / timelineWidth) * this.video.get(0).duration
            this.timeCurrent.text(this.formatTime(this.video.get(0).currentTime))
        }

        this.timeLine.mousemove(e => {
            let progressTime = this.timeLine.find('span')
            let offsetX = e.offsetX
            progressTime.css('left', `${offsetX}px`)
            let timeLineWidth = $(this.timeLine).outerWidth()
            let percent = (e.offsetX / timeLineWidth) * this.video.get(0).duration
            progressTime.text(this.formatTime(percent))
        })
        this.timeLine.mousedown(() => {
            this.timeLine.bind('mousemove', draggableBar)
        })
        this.obj.mouseup(() => {
            this.timeLine.unbind('mousemove', draggableBar)
        })
    }

    HandleTimeText(nameCurrent, nameEnd) {
        this.timeCurrent = this.obj.find(nameCurrent).eq(0)
        this.timeEnd = this.obj.find(nameEnd).eq(0)
    }

    handleVideo(name) {
        this.video = this.obj.find(name)
        this.video.on('timeupdate', e => {
            let {currentTime, duration} = e.target
            let percent = (currentTime / duration) * 100
            this.timeProgress.width(`${percent}%`)
            this.timeCurrent.text(this.formatTime(currentTime))
        })

        this.video.on('loadeddata', e => {
            this.timeEnd.text(this.formatTime(e.target.duration))
        })
    }

    handlePlay(name) {
        this.btnPlay = this.obj.find(name).eq(0)
        this.btnPlay.click(() => {
            if (this.video.get(0).paused) {
                this.video.get(0).play() 
                this.btnPlay.children(':first').removeClass('fa-play').addClass('fa-pause')
                let audio = $("audio")[0];
                if (audio && !audio.paused) audio.pause();
            }
            else {
                this.video.get(0).pause()
                this.btnPlay.children(':first').removeClass('fa-pause').addClass('fa-play')
                let startAudio = true
                $('.inv-video').each((v, i) => {
                    if (!i.paused) startAudio = false
                })
                if (startAudio) {
                    let audio = $("audio")[0];
                    if (audio && audio.paused) audio.play();
                }
            }
        })
    }

    handleSeek(nameBackward, nameForward) {
        this.btnSeekBackward = this.obj.find(nameBackward).eq(0)
        this.btnSeekForward = this.obj.find(nameForward).eq(0)

        this.btnSeekBackward.click(() => {
            this.video.get(0).currentTime -= 5
        })

        this.btnSeekForward.click(() => {
            this.video.get(0).currentTime += 5
        })
    }

    handleVolume(name) {
        this.btnVolume = this.obj.find(name).eq(0)
        this.btnVolume.click(() => {
            let v_icon = this.btnVolume.children('svg:first')
            if (v_icon.hasClass('fa-volume-high')) {
                this.video.get(0).volume = 0.0;
                v_icon.removeClass('fa-volume-high').addClass('fa-volume-xmark')
            }
            else {
                this.video.get(0).volume = 1.0;
                v_icon.removeClass('fa-volume-xmark').addClass('fa-volume-high')
            }
        })
    }
    handleVolumeSlider(name) {
        this.volumeSlider = this.obj.find(name).eq(0)
        this.volumeSlider.on('change keyup input', e => {
            let volume = e.target.value
            let v_icon = this.btnVolume.children('svg:first')
            this.video.get(0).volume = volume;
            if (volume == 0) {
              v_icon.removeClass('fa-volume-high').addClass('fa-volume-xmark')
            }
            else {
              v_icon.removeClass('fa-volume-xmark').addClass('fa-volume-high')
            }
        })
    }
    handleSpeed(name, options) {
        this.btnSpeed = this.obj.find(name).eq(0)
        this.speedOptions = this.obj.find(options).eq(0)

        this.btnSpeed.click(() => this.speedOptions.toggleClass('show'))
        this.speedOptions.find('li').each((i, option) => {
            $(option).click(e => {
              let speed = $(option).data('speed')
              this.video.get(0).playbackRate = speed
              $(this.speedOptions).find('li.active').removeClass('active')
              $(option).addClass('active')
            })
        })

        $(document).click(e => {
            if (e.target.tagName != 'SPAN' && e.target.className != 'material-symbols-rounded') {
                this.speedOptions.removeClass('show')
              }
        })
    }
    handlePicInPic(name) {
        this.btnPicInPic = this.obj.find(name).eq(0)
        this.btnPicInPic.click(() => {
            this.video.get(0).requestPictureInPicture()
          })
    }
    handleFullscreen(name) {
        this.btnFullScreen = this.obj.find(name).eq(0)
        this.btnFullScreen.click(() => {
            if (!document.fullscreenElement) {
                if(this.video.get(0).requestFullscreen){
                    this.obj.get(0).requestFullscreen()
                } 
                else if (this.video.get(0).webkitRequestFullscreen){
                    this.obj.get(0).webkitRequestFullscreen()
                }
                else if (this.video.get(0).mozRequestFullScreen){
                    this.obj.get(0).mozRequestFullScreen()
                }
                else if (this.video.get(0).msRequestFullscreen){
                    this.obj.get(0).msRequestFullscreen()
                }
                this.btnFullScreen.children(':first').removeClass('fa-expand').addClass('fa-compress')
            }
            else {
                this.btnFullScreen.children(':first').removeClass('fa-compress').addClass('fa-expand')
                if (document.exitFullscreen) document.exitFullscreen();
                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
                else if (document.msExitFullscreen) document.msExitFullscreen();
            }
        })
    }
}