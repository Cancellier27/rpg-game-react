import { TextMessage } from "../classes/TextMessage"
import { SubmissionMenu } from "./SubmissionMenu"

export class BattleEvent {
  constructor(event, battle) {
    this.event = event
    this.battle = battle
  }

  textMessage(resolve) {
    const text = this.event.text
    .replace("{CASTER}", this.event.caster?.name)
    .replace("{TARGET}", this.event.target?.name)
    .replace("{ACTION}", this.event.action?.name)


    const message = new TextMessage({
      text,
      onComplete: () => {
        resolve()
      }
    })
    message.init(this.battle.map)
  }

  submissionMenu(resolve) {
    const menu = new SubmissionMenu({
      caster: this.event.caster,
      enemy: this.event.enemy,
      onComplete: submission => {
        resolve(submission)
      }
    
    })

    menu.init(this.battle.map)
  }

  init(resolve) {
    this[this.event.type](resolve)
  }
}
