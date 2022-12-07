class ScrollAnimation {
  pxOffset = 0;
  repeat = false;
  isActive = [];
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
    for(let i = 0; i < objectList.length; i++) {
      this.isActive.push(false);
      for(const key in this.style) {
        objectList[i].style[key] = this.style[key];
      }
    }
  }

  animate() {
    var objectList = document.querySelectorAll(this.name);
    var windowHeight = window.innerHeight;
    for(let i = 0; i < objectList.length; i++) {
      var elementTop = objectList[i].getBoundingClientRect().top;
      if (elementTop < windowHeight - ((typeof(this.pxOffset) === 'function') ? this.pxOffset(): this.pxOffset)) {
        if(!this.isActive[i]) {
          this.isActive[i] = true;
          for(const key in this.activeStyle) {
            objectList[i].style[key] = this.activeStyle[key];
          }
        }
      } else {
        if(this.isActive[i] && this.repeat) {
          this.isActive[i] = false;
          for(const key in this.activeStyle) {
            objectList[i].style[key] = this.style[key];
          }
        }
      }
    }
  }
}