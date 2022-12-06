class ScrollAnimation {
  pxOffset = 0;
  repeat = false;
  isActive = false;
  name;
  style = {};
  activeStyle = {};

  constructor(name, style = {}, activeStyle = {}, offset = 0, repeat = false) {
    this.name = name;
    this.pxOffset = offset;
    this.style = style;
    this.activeStyle = activeStyle;
    this.repeat = repeat;

    var objectList = document.querySelectorAll(this.name);
    for (let obj of objectList) {
      for(const key in this.style) {
        obj.style[key] = this.style[key];
      }
    }
  }

  animate() {
    var objectList = document.querySelectorAll(this.name);
    var windowHeight = window.innerHeight;
    for (let obj of objectList) {
      var elementTop = obj.getBoundingClientRect().top;
  
      if (elementTop < windowHeight - this.pxOffset) {
        if(!this.isActive) {
          this.isActive = true;
          for(const key in this.activeStyle) {
            obj.style[key] = this.activeStyle[key];
          }
        }
      } else {
        if(this.isActive && this.repeat) {
          this.isActive = false;
          for(const key in this.activeStyle) {
            obj.style[key] = this.style[key];
          }
        }
      }
    }
  }
}