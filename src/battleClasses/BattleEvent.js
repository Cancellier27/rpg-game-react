import {TextMessage} from "../classes/TextMessage"
import {SubmissionMenu} from "./SubmissionMenu"
import {utils} from "../helpers/utils"
import {DAMAGE_BLINK} from "../helpers/consts"
import { BattleAnimations } from "../Content/BattleAnimations"

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
      onComplete: (submission) => {
        resolve(submission)
      }
    })

    menu.init(this.battle.map)
  }

  async stateChange(resolve) {
    const {caster, target, damage, recover} = this.event
    const element = document.querySelector(`.${target.classId}`)
    
    if (damage) {
      // modify the target to have less hp
      target.hp = target.hp - damage

      // start blinking
      element.classList.add("battle-damage-blink")
    }

    if(recover) {
      const who = this.event.onCaster ? caster : target
      let newHp = who.hp + recover

      if(newHp > who.maxHp) {
        newHp = who.maxHp
      }

      who.hp = newHp

    }

    // wait a bit
    await utils.wait(DAMAGE_BLINK)

    //stop blinking
    element.classList.remove("battle-damage-blink")

    resolve()
  }

  animation(resolve) {
    const fn = BattleAnimations[this.event.animation];
    fn(this.event, resolve);
  }

  init(resolve) {
    this[this.event.type](resolve)
  }
}
