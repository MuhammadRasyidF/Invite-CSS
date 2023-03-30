class InvSlider {
  sliderCount = null;
  milis = null;
  navigationBtn = [];
  counter = 0;
  animate = null

  constructor(sliderCount, milis) {
    console.log("sliderCount " + sliderCount, "\nmilis" + milis);
    this.sliderCount = sliderCount
    this.counter = 1;
    this.milis = milis
    this.autoAnimate();
    this.loadNavigationBtn();
    this.loadNavigationBtnArrow();
  }

  autoAnimate() {
    this.animate = setInterval(() => {
      this.counter++;
      if (this.counter > this.sliderCount) {
        this.counter = 1;
      }
      document.getElementById("inv-radio" + this.counter).checked = true;
      $('.inv-navigation-btn')[this.counter - 1].click()
    }, this.milis);
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

  loadNavigationBtnArrow() {
    $('#navigation-next').click(() => {
      clearInterval(this.animate)
      this.counter++;
      if (this.counter > this.sliderCount) {
        this.counter = 1;
      }
      $('.inv-navigation-btn')[this.counter - 1].click()
      this.autoAnimate()
    })
    $('#navigation-prev').click(() => {
      clearInterval(this.animate)
      this.counter--;
      if (this.counter < 1) {
        this.counter = this.sliderCount;
      }
      $('.inv-navigation-btn')[this.counter - 1].click()
      this.autoAnimate()
    })
  }
}
