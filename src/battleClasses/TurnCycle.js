export class TurnCycle {
  constructor({battle, onNewEvent}) {
    this.battle = battle
    this.onNewEvent = onNewEvent
    this.currentTeam = "player" // or enemy
  }

  async turn() {}

  async init() {
    await this.onNewEvent({
      type: "textMessage",
      text: "The battle is starting!"
    })

    // start the first turn
    this.turn()
  }
}
