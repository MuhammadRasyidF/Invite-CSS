class InvSlider {
  sliderCount = null;
  milis = null;

  constructor(sliderCount, milis) {
    console.log("sliderCount " + sliderCount, "\nmilis" + milis);
    this.autoAnimate(sliderCount, milis);
  }

  autoAnimate(sliderCount, milis) {
    var counter = 1;
    setInterval(function () {
      document.getElementById("radio" + counter).checked = true;
      counter++;
      if (counter > sliderCount) {
        counter = 1;
      }
    }, milis);
  }
}
