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
      document.getElementById("inv-radio" + this.counter).checked = true;
      $('.inv-navigation-btn')[this.counter - 1].click()
      this.counter++;
      if (this.counter > sliderCount) {
        this.counter = 1;
      }
    }, milis);
  }

  loadNavigationBtn() {
    $('.inv-navigation-btn').each((index, element) => {
      $(element).on('click', () => {
        this.counter = index + 1;
        let percentage = (index/ this.sliderCount * 100);
        $('.first').css('margin-left', `-${percentage}%`)
        $('.inv-navigation-btn').removeClass('active');
        $(element).addClass('active');
      })
    })
  }
}
