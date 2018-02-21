class Achievements {
  constructor() {
    this.achievements = [
      {
        name: 'Student',
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
        description: 'You made 100 commits. wow!',
        picture: '../img/achievements/achieveTest2.jpg',
        unlocked: false,
        required: {
          clicks: 100,
          score: null,
          time: null
        }
      }
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
            Materialize.toast(`Achievement unlocked: ${achievement.name}`, 4000, 'toast_achievement');
            achievement.unlocked = true;
            ui.displayAchievements(this.achievements);
          }
        }
      });
    }, 1000);
  }
}
