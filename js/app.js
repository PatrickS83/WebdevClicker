class ClickerApp {
  constructor() {
    this.score = 0;
    // base increase of score
    this.baseIncrease = 1;
    // score multiplier for clicking on commit button
    this.clickMuliplier = 1;
  }

  // called by clicking on commit-image. Increases commit score.
  increaseScoreFromClick() {
    this.score += this.baseIncrease * this.clickMuliplier;
    ui.displayScore(this.score);
    this.checkUnlockBuyableItems();
  }

  // increases commit score from helpers
  increaseScoreFromHelpers(scoreToAdd) {
    this.score += scoreToAdd;
    ui.displayScore(this.score);
    this.checkUnlockBuyableItems();
  }

  // expects a number to subtract from commit score
  subtractScore(scoreToSubtract) {
    this.score -= scoreToSubtract;
    ui.displayScore(this.score);
  }

  // checks and unlocks helpers if player has enough commits
  checkUnlockBuyableItems() {
    if (this.score >= 10 && !this.sleepyCat) {
      this.sleepyCat = new BuyableItem('Sleepy Cat', 50, 1, 2);
      UI.unlockBuyableItem('Sleepy Cat');
    } else if (this.score >= 100 && !this.HTMLBaby) {
      this.HTMLBaby = new BuyableItem('HTML Baby', 150, 1, 3);
      UI.unlockBuyableItem('HTML Baby');
    } else if (this.score >= 250 && !this.outsourceEveything) {
      this.outsourceEveything = new BuyableItem('Outsource Everything', 300, 1, 6);
      UI.unlockBuyableItem('Outsource Everything');
    } else if (this.score >= 750 && !this.skynet) {
      this.skynet = new BuyableItem('Skynet', 1000, 1, 15);
      UI.unlockBuyableItem('Skynet');
    }
  }
}


// UI class handles everything browser-display related
class UI {
  constructor() {
    this.elementList = {
      commitDisplay: document.querySelector('#commits'),
      gitCommitBtn: document.querySelector('#commit_button'),
      clickContainer: document.querySelector('.click_container'),
      buyButtons: document.querySelectorAll('.buyButton'),
      sleepyCatInfo: document.querySelectorAll('.sleepycat_info')
    };
  }

  // expects number and displays commit score in browser window
  displayScore(score) {
    this.elementList.commitDisplay.innerText = score.toFixed(0);
  }

  // shows visual feedback (the amount added to commit score) when player clicks git-image
  displayClickFeedback() {
    const clickFeedback = document.createElement('span');
    clickFeedback.innerHTML = `git commit +${clickerApp.baseIncrease * clickerApp.clickMuliplier}`;
    this.elementList.clickContainer.prepend(clickFeedback);
    setInterval(() => {
      clickFeedback.remove();
    }, 1000);
  }

  // unlocks helper by removing blocking div
  static unlockBuyableItem(name) {
    const blockingDiv = document.querySelector(`[data-itemLocked="${name}"]`);
    blockingDiv.remove();
  }

  // displays price, commits per second and number of buyable helpers
  static displayItemInfos(name, price, cps, owned) {
    const [displayedPrice, displayedCps, displayedOwned] = document.querySelectorAll(`[data-itemName="${name}"]`);
    displayedPrice.innerHTML = price;
    displayedCps.innerHTML = cps;
    displayedOwned.innerHTML = owned;
  }
}

// Controller handles all event listener and button clicks
class Controller {
  constructor() {
    Controller.setupEventListeners();
  }

  // initializing event listeners
  static setupEventListeners() {
    ui.elementList.gitCommitBtn.addEventListener('click', this.handleCommitClick);
    ui.elementList.buyButtons.forEach(button => button.addEventListener('click', this.handleHelperItemBuy));
  }

  // called when git-image is clicked
  static handleCommitClick() {
    clickerApp.increaseScoreFromClick();
    ui.displayClickFeedback();
  }

  // called when player buys a new helper
  static handleHelperItemBuy(e) {
    const boughtHelper = e.target.id;
    // placeholder for future multi-buy option
    const amount = 1;
    if (clickerApp[boughtHelper] && clickerApp[boughtHelper].price <= clickerApp.score) {
      clickerApp.subtractScore(clickerApp[boughtHelper].price);
      clickerApp[boughtHelper].increaseAmount(amount);
    }
  }
}

// template for creating a new helper
class BuyableItem {
  constructor(name, price, amount, cps) {
    this.name = name;
    this.price = price;
    this.amount = amount;
    this.cps = cps;
    this.init();
  }

  // called on creation of new instance
  init() {
    this.calculateCommits();
    UI.displayItemInfos(this.name, this.price, this.cps, this.amount);
  }

  // calculates the commits per second and adds them to score in an interval
  calculateCommits() {
    setInterval(() => {
      clickerApp.increaseScoreFromHelpers(this.amount * (this.cps / 2));
    }, 500);
  }

  // increases the number of owned helpers of this type
  increaseAmount(amount) {
    this.amount += amount;
    this.updatePrice();
    UI.displayItemInfos(this.name, this.price, this.cps, this.amount);
  }

  // increases price after every bought helper of this type
  updatePrice() {
    this.price = Math.round(this.price * 1.05);
  }
}

const ui = new UI();
const clickerApp = new ClickerApp();
const controller = new Controller();

