class ClickerApp {
  constructor() {
    this.score = 0;
    // score multiplier for clicking on commit button
    this.clickMuliplier = 1;
  }

  increaseScoreFromClick() {
    this.score += 1 * this.clickMuliplier;
    ui.displayScore(this.score);
  }

  increaseScoreFromInterval() {
    setInterval(() => {
      this.score += 1 * this.muliplier;
      ui.displayScore(this.score);
    }, 300);
  }
}

class UI {
  constructor() {
    this.elementList = {
      scoreDisplay: document.querySelector('#score'),
      gitCommitBtn: document.querySelector('#commit_button'),
      clickContainer: document.querySelector('.click_container')
    };
  }

  displayScore(score) {
    this.elementList.scoreDisplay.innerText = score;
  }

  displayClickFeedback() {
    const clickFeedback = document.createElement('span');
    clickFeedback.innerHTML = 'git commit';
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
  }

  static handleCommitClick() {
    clickerApp.increaseScoreFromClick();
    ui.displayClickFeedback();
  }
}

const ui = new UI();
const clickerApp = new ClickerApp();
const controller = new Controller();
