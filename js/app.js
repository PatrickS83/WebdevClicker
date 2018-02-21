class ClickerApp {
  constructor() {
    // amount of times player clicked commit
    this.timesClicked = 0;
    this.score = 0;
    // base increase of score
    this.baseIncrease = 1;
    // base increase from upgrades
    this.upgradeIncrease = 0;
    // score multiplier for clicking on commit button
    this.clickMuliplier = 1;
    // collection of bought upgrades
    this.upgrades = {
      coffee: {
        name: 'coffee', price: 100, productivity: 1, multiply: 0, unlocked: false, bought: false
      },
      multiMonitor: {
        name: 'multiMonitor', price: 300, productivity: 3, multiply: 0, unlocked: false, bought: false
      },
      headphones: {
        name: 'headphones', price: 500, productivity: 3, multiply: 0, unlocked: false, bought: false
      },

    };
    // initilization on creation
    this.updateData();
  }

  // updates relevant data to current state
  updateData() {
    ui.displayScore(this.score);
    this.checkUnlockBuyableItems();
    this.checkUnlockBuyableUpgrades();
    this.calculateStatistics();
  }

  // called by clicking on commit-image. Increases commit score.
  increaseScoreFromClick() {
    this.timesClicked += 1;
    this.score += (this.baseIncrease + this.upgradeIncrease) * this.clickMuliplier;
    this.updateData();
  }

  // increases commit score from helpers
  increaseScoreFromHelpers(scoreToAdd) {
    this.score += scoreToAdd;
    this.updateData();
  }

  // expects a number to subtract from commit score
  subtractScore(scoreToSubtract) {
    this.score -= scoreToSubtract;
    this.updateData();
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

  // checks and unlocks upgrades if player has enough commits
  checkUnlockBuyableUpgrades() {
    // temp variables to improve code readability
    const [coffee, multiMonitor, headphones] = [
      this.upgrades.coffee,
      this.upgrades.multiMonitor,
      this.upgrades.headphones
    ];

    if (this.score >= coffee.price && !coffee.unlocked) {
      UI.unlockBuyableItem('Coffee');
      coffee.unlocked = true;
    } else if (this.score >= multiMonitor.price && !multiMonitor.unlocked) {
      UI.unlockBuyableItem('multiMonitor');
      multiMonitor.unlocked = true;
    } else if (this.score >= headphones.price && !headphones.unlocked) {
      UI.unlockBuyableItem('headphones');
      headphones.unlocked = true;
    }
  }

  // adds bought upgrades to player object
  addUpgrade(upgradeName) {
    this.upgrades[upgradeName].bought = true;
    this.calculateUpgradeIncrease();
  }

  // calculates the productivity increase from upgrades
  calculateUpgradeIncrease() {
    const upgrades = Object.values(this.upgrades);
    let upgradeProductivity = 0;
    upgrades.forEach((upgrade) => {
      if (upgrade.bought) {
        upgradeProductivity += upgrade.productivity;
      }
    });
    this.upgradeIncrease = upgradeProductivity;
  }

  // calculates basic statistics and passes it to display function as an object
  calculateStatistics() {
    const stats = {};
    stats.baseIncrease = this.baseIncrease;
    stats.upgradeIncrease = this.upgradeIncrease;
    stats.multiplier = this.clickMuliplier;
    stats.timesClicked = this.timesClicked;
    stats.helperCPS = 0;
    // checking if an instance of an helper exists and then add the cps to stats object
    if (this.sleepyCat) stats.helperCPS += this.sleepyCat.cps * this.sleepyCat.amount;
    if (this.HTMLBaby) stats.helperCPS += this.HTMLBaby.cps * this.HTMLBaby.amount;
    if (this.outsourceEveything) stats.helperCPS += this.outsourceEveything.cps * this.outsourceEveything.amount;
    if (this.skynet) stats.helperCPS += this.skynet.cps * this.skynet.amount;
    ui.displayStatistics(stats);
  }

  // adds and removes bonuses from events
  calculateEventBonuses(multiplier, bonus = 0) {
    this.score += bonus;
    this.clickMuliplier += multiplier;
    this.updateData();
  }
}


// UI class handles everything browser-display related
class UI {
  constructor() {
    this.elementList = {
      commitDisplay: document.querySelector('#commits'),
      gitCommitBtn: document.querySelector('#commit_button'),
      clickContainer: document.querySelector('.click_container'),
      buyItemButtons: document.querySelectorAll('.buyItemButton'),
      buyUpgradeButtons: document.querySelectorAll('.buyUpgradeButton'),
      sleepyCatInfo: document.querySelectorAll('.sleepycat_info'),
      statisticContainer: document.querySelector('.statistics_container'),
      statisticDisplay: document.querySelector('.statistic_display'),
      achievementDisplay: document.querySelector('.achievement_display'),
      eventList: document.querySelector('#eventsList'),
      noActiveEvent: document.querySelector('#noEvents'),
    };
  }

  // expects number and displays commit score in browser window
  displayScore(score) {
    this.elementList.commitDisplay.innerText = score.toFixed(0);
  }

  // shows visual feedback (the amount added to commit score) when player clicks git-image
  displayClickFeedback() {
    const clickFeedback = document.createElement('span');
    clickFeedback.innerHTML = `git commit +${(clickerApp.baseIncrease + clickerApp.upgradeIncrease) * clickerApp.clickMuliplier}`;
    this.elementList.clickContainer.prepend(clickFeedback);
    setInterval(() => {
      clickFeedback.remove();
    }, 1000);
  }

  // expects an object and displays the statistics inside
  displayStatistics(stats) {
    this.elementList.statisticDisplay.innerHTML = `
      <p>Amount of times clicked commit: ${stats.timesClicked}</p>
      <p>Your Productivity: ${(stats.baseIncrease + stats.upgradeIncrease) * stats.multiplier} <br>
      (${stats.baseIncrease} Base + ${stats.upgradeIncrease} from Upgrades * ${stats.multiplier} from multipliers)</p>
      <p>Commits per second from Helpers: ${stats.helperCPS}</p>
    `;
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

  // changes shopping cart to green checkmark when upgrade is bought
  static displayBoughtUpgrade(name) {
    const upgradeButton = document.querySelector(`#${name}`);
    upgradeButton.innerHTML = 'check';
    upgradeButton.style.color = 'green';
  }

  // display events in event tab
  displayEvents(currentEvent) {
    // make "No active Events" invisible when there are current active events
    if (this.elementList.eventList.childElementCount === 1 && this.elementList.noActiveEvent.classList.contains('activated')) {
      this.elementList.noActiveEvent.classList.toggle('activated');
    }
    // add event to event tab
    const li = document.createElement('li');
    li.classList.add('collection-item');
    li.dataset.identity = currentEvent.id;
    li.innerHTML = `${currentEvent.description}, duration: <span>${currentEvent.duration}</span> seconds`;
    this.elementList.eventList.appendChild(li);
    this.displayEventCountdown(li.dataset.identity, currentEvent.duration);
  }

  // displays event duration as a countdown
  displayEventCountdown(id, duration) {
    const currentEvent = document.querySelector(`[data-identity="${id}"] span`);
    let eventDuration = duration - 1;
    const eventInterval = setInterval(() => {
      currentEvent.innerHTML = eventDuration;
      eventDuration -= 1;
    }, 1000);
    // stops interval after event is finished
    setTimeout(() => clearInterval(eventInterval), duration * 1000);
  }

  // removes event from event tab. expects 'data-identity' of the event
  removeEvents(id) {
    const eventToRemove = document.querySelector(`[data-identity="${id}"]`);
    eventToRemove.remove();
    // make "No active Events" visible when there are no current events
    if (this.elementList.eventList.childElementCount === 1 && !this.elementList.noActiveEvent.classList.contains('activated')) {
      this.elementList.noActiveEvent.classList.toggle('activated');
    }
  }

  // displays achievements in statistics tab
  displayAchievements(achievements) {
    this.elementList.achievementDisplay.innerHTML = '<hr><h5 class="center-align">Achievements</h5>';
    achievements.forEach((achievement) => {
      const opaqueness = achievement.unlocked ? '' : 'opaque';
      const tooltip = achievement.unlocked ? achievement.description : achievement.descriptionReq;
      this.elementList.achievementDisplay.innerHTML += `
        <img
          src="${achievement.picture}"
          class="tooltipped ${opaqueness}"
          data-position="top" data-delay="30"
          data-tooltip="${achievement.name}: ${tooltip}"
        >`;
    });
    // initialize materialize tooltips
    $('.tooltipped').tooltip({ delay: 50 });
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
    ui.elementList.buyItemButtons.forEach(button => button.addEventListener('click', this.handleHelperItemBuy));
    ui.elementList.buyUpgradeButtons.forEach(button => button.addEventListener('click', this.handleUpgradeBuy));
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

  // called when player buys an upgrade
  static handleUpgradeBuy(e) {
    const boughtUpgrade = e.target.id;
    clickerApp.addUpgrade(boughtUpgrade);
    UI.displayBoughtUpgrade(boughtUpgrade);
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
const events = new Events();
const achievements = new Achievements();

$(document).ready(() => {
  $('.tooltipped').tooltip({ delay: 50 });
});
