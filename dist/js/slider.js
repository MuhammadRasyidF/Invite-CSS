class InvSlider {
  sliderCount = null;
  milis = null;
  navigationBtn = [];
  counter = 0;

  constructor(sliderCount, milis) {
    console.log("sliderCount " + sliderCount, "\nmilis" + milis);
    this.sliderCount = sliderCount
    this.counter = 1;
    this.autoAnimate(sliderCount, milis);
    this.loadNavigationBtn();
  }

  autoAnimate(sliderCount, milis) {
    setInterval(() => {
      document.getElementById("radio" + this.counter).checked = true;
      $('.manual-btn')[this.counter - 1].click()
      this.counter++;
      if (this.counter > sliderCount) {
        this.counter = 1;
      }
    }, milis);
  }

  loadNavigationBtn() {
    $('.manual-btn').each((index, element) => {
      $(element).on('click', () => {
        this.counter = index + 1;
        let percentage = (index/ this.sliderCount * 100);
        $('.first').css('margin-left', `-${percentage}%`)
        $('.manual-btn').css('background-color', 'none');
        $(this).css('background-color', 'white');
      })
    })
  }
}
