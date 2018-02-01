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

  checkUnlockBuyableItems() {
    if (this.score >= 10 && !this.sleepyCat) {
      this.sleepyCat = new BuyableItem('Sleepy Cat', 1, 2);
    }
  }
}

class UI {
  constructor() {
    this.elementList = {
      commitDisplay: document.querySelector('#commits'),
      gitCommitBtn: document.querySelector('#commit_button'),
      clickContainer: document.querySelector('.click_container'),
      sleepyCatBtn: document.querySelector('#sleepyCatBtn')
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

  }
}

class BuyableItem {
  constructor(name, amount, cps) {
    this.name = name;
    this.amount = amount;
    this.cps = cps;
    this.calculateCommits();
  }

  calculateCommits() {
    setInterval(() => {
      clickerApp.score += this.amount * this.cps;
      ui.displayScore(clickerApp.score);
    }, 300);
  }
}

const ui = new UI();
const clickerApp = new ClickerApp();
const controller = new Controller();

