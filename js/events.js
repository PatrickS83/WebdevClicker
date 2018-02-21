class Events {
  constructor() {
    this.eventList = [
      {
        id: 0, name: 'Testevent', duration: 5, multiply: 1, bonus: 0, active: false, description: 'This is a testevent (1)',
      },
      {
        id: 1, name: 'Testevent2', duration: 10, multiply: 1, bonus: 0, active: false, description: 'This is a testevent (2)',
      },
      {
        id: 2, name: 'Testevent3', duration: 12, multiply: 1, bonus: 0, active: false, description: 'This is a testevent (3)',
      },
      {
        id: 3, name: 'Testevent4 (one time bonus)', duration: 0, multiply: 0, bonus: 500, active: false, description: 'This is a testevent (4, bonus only)',
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
    }, 10000);
  }

  // starts a new event. Expects an index of eventList array.
  startEvent(index) {
    const currentEvent = this.eventList[index];
    const eventDuration = currentEvent.duration * 1000;
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
