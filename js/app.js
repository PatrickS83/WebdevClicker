class ClickerApp {
  constructor() {
    this.score = 0;
    // base increase of score
    this.baseIncrease = 1;
    // score multiplier for clicking on commit button
    this.clickMuliplier = 1;
  }

  increaseScoreFromClick() {
    this.score += this.baseIncrease * this.clickMuliplier;
    ui.displayScore(this.score);
    this.checkUnlockBuyableItems();
  }

  subtractScore(scoreToSubtract) {
    this.score -= scoreToSubtract;
    ui.displayScore(this.score);
  }

  checkUnlockBuyableItems() {
    if (this.score >= 10 && !this.sleepyCat) {
      this.sleepyCat = new BuyableItem('Sleepy Cat', 50, 1, 2);
    }
  }
}

class UI {
  constructor() {
    this.elementList = {
      commitDisplay: document.querySelector('#commits'),
      gitCommitBtn: document.querySelector('#commit_button'),
      clickContainer: document.querySelector('.click_container'),
      sleepyCatBtn: document.querySelector('#sleepyCatBtn'),
      sleepyCatInfo: document.querySelectorAll('.sleepycat_info')
    };
  }

  displayScore(score) {
    this.elementList.commitDisplay.innerText = score;
  }

  displayClickFeedback() {
    const clickFeedback = document.createElement('span');
    clickFeedback.innerHTML = `git commit +${clickerApp.baseIncrease * clickerApp.clickMuliplier}`;
    this.elementList.clickContainer.prepend(clickFeedback);
    setInterval(() => {
      clickFeedback.remove();
    }, 1000);
  }

  static displayItemInfos(name, price, cps, owned) {
    const [displayedPrice, displayedCps, displayedOwned] = document.querySelectorAll(`[data-itemName="${name}"]`);
    displayedPrice.innerHTML = price;
    displayedCps.innerHTML = cps;
    displayedOwned.innerHTML = owned;
  }
}

class Controller {
  constructor() {
    Controller.setupEventListeners();
  }

  static setupEventListeners() {
    ui.elementList.gitCommitBtn.addEventListener('click', this.handleCommitClick);
    ui.elementList.sleepyCatBtn.addEventListener('click', this.handleSleepyCatBuy);
  }

  static handleCommitClick() {
    clickerApp.increaseScoreFromClick();
    ui.displayClickFeedback();
  }

  static handleSleepyCatBuy() {
    // placeholder for future multi-buy option
    const amount = 1;
    if (clickerApp.sleepyCat && clickerApp.sleepyCat.price <= clickerApp.score) {
      clickerApp.subtractScore(clickerApp.sleepyCat.price);
      clickerApp.sleepyCat.increaseAmount(amount);
    }
  }
}

class BuyableItem {
  constructor(name, price, amount, cps) {
    this.name = name;
    this.price = price;
    this.amount = amount;
    this.cps = cps;
    this.init();
  }

  init() {
    this.calculateCommits();
    UI.displayItemInfos(this.name, this.price, this.cps, this.amount);
  }

  calculateCommits() {
    setInterval(() => {
      clickerApp.score += this.amount * (this.cps / 2);
      ui.displayScore(clickerApp.score);
    }, 500);
  }

  increaseAmount(amount) {
    this.amount += amount;
    this.updatePrice();
    UI.displayItemInfos(this.name, this.price, this.cps, this.amount);
  }

  updatePrice() {
    this.price = Math.round(this.price * 1.05);
  }
}

const ui = new UI();
const clickerApp = new ClickerApp();
const controller = new Controller();

