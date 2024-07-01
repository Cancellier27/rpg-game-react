import { TextMessage } from "../classes/TextMessage"

export class BattleEvent {
  constructor(event, battle) {
    this.event = event
    this.battle = battle
  }

  textMessage(resolve) {
    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => {
        resolve()
      }
    })
    message.init(this.battle.map)
  }

  init(resolve) {
    this[this.event.type](resolve)
  }
}
