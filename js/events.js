class Events {
  constructor() {
    this.eventList = [
      {
        id: 0,
        name: 'Someone brought you coffee!',
        duration: 5,
        multiply: 1,
        bonus: 0,
        active: false,
        description: '5 seconds of extra productivity.'
      },
      {
        id: 1,
        name: 'Your favorite song is playing!',
        duration: 10,
        multiply: 1,
        bonus: 0,
        active: false,
        description: '10 seconds of extra productivity.'
      },
      {
        id: 2,
        name: 'Deadline for project is approaching!',
        duration: 12,
        multiply: 1,
        bonus: 0,
        active: false,
        description: '12 seconds of extra productivity.'
      },
      {
        id: 3,
        name: 'You found the exact solution on Stackoverflow!',
        duration: 0,
        multiply: 0,
        bonus: 20,
        active: false,
        description: 'Instantly gain 20 commits.'
      }
    ];
    this.startEventRandomly();
  }

  // starts a random event from the eventlist every xxx seconds (specify time in setInterval)
  startEventRandomly() {
    setInterval(() => {
      const maxNum = this.eventList.length;
      const eventID = Math.floor(Math.random() * maxNum);
      if (!this.eventList[eventID].active) this.startEvent(eventID);
    }, 20000);
  }

  // starts a new event. Expects an index of eventList array.
  startEvent(index) {
    const currentEvent = this.eventList[index];
    const eventDuration = currentEvent.duration * 1000;
    Materialize.toast(`New Event: ${currentEvent.name}`, 4000);
    currentEvent.active = true;
    ui.displayEvents(currentEvent);
    this.stopEvent(currentEvent.id, eventDuration);
    clickerApp.calculateEventBonuses(currentEvent.multiply, currentEvent.bonus);
  }

  // stops event after specified amount of time
  stopEvent(id, duration) {
    setTimeout(() => {
      const currentEvent = this.eventList[id];
      ui.removeEvents(id);
      currentEvent.active = false;
      clickerApp.calculateEventBonuses(-currentEvent.multiply, 0);
    }, duration);
  }
}
