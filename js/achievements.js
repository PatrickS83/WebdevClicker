class Achievements {
  constructor() {
    this.achievements = [
      {
        name: 'Student',
        descriptionReq: 'Make 5 commits',
        description: 'You made your first five commits. Hooray!',
        picture: '../img/achievements/achieveTest1.jpg',
        unlocked: false,
        required: {
          clicks: 5,
          score: null,
          time: null
        }
      },
      {
        name: 'Intern',
        descriptionReq: 'Make 100 commits',
        description: 'You made 100 commits. wow!',
        picture: '../img/achievements/achieveTest2.jpg',
        unlocked: false,
        required: {
          clicks: 100,
          score: null,
          time: null
        }
      },
    ];
    this.init();
  }

  init() {
    this.achievementChecker();
    ui.displayAchievements(this.achievements);
  }

  // checks for unlocked achievements periodically
  achievementChecker() {
    setInterval(() => {
      this.achievements.forEach((achievement) => {
        if (achievement.unlocked === false) {
          if (clickerApp.timesClicked >= achievement.required.clicks) {
            Materialize.toast(`<img src="${achievement.picture}">
              Achievement unlocked: ${achievement.name}`, 4000, 'toast_achievement');
            achievement.unlocked = true;
            ui.displayAchievements(this.achievements);
          }
        }
      });
    }, 1000);
  }
}
