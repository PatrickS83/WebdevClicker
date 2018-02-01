class ClickerApp {
  constructor() {
    this.score = 0;
  }

  increaseScore() {
    this.score += 1;
    ui.displayScore(this.score);
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
    clickerApp.increaseScore();
  }
}

const clickerApp = new ClickerApp();
const controller = new Controller();
const ui = new UI();
