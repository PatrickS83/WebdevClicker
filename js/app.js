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
      scoreDisplay: document.querySelector('#score')
    };
  }

  displayScore(score) {
    this.elementList.scoreDisplay.innerText = score;
  }
}

class Controller {
  constructor() {
    Controller.setupEventListeners();
  }

  static setupEventListeners() {
    const gitCommitBtn = document.querySelector('#commit_button');
    gitCommitBtn.addEventListener('click', this.handleCommitClick);
  }

  static handleCommitClick() {
    clickerApp.increaseScoreFromClick();
  }
}

const clickerApp = new ClickerApp();
const controller = new Controller();
const ui = new UI();
