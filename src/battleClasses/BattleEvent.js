import {TextMessage} from "../classes/TextMessage"
import {SubmissionMenu} from "./SubmissionMenu"
import {utils} from "../helpers/utils"
import {DAMAGE_BLINK} from "../helpers/consts"
import {BattleAnimations} from "../Content/BattleAnimations"

export class BattleEvent {
  constructor(event, battle, map) {
    this.event = event
    this.battle = battle
    this.map = map
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
      map: this.map,
      onComplete: (submission) => {
        resolve(submission)
      }
    })

    menu.init()
  }

  async stateChange(resolve) {
    const {caster, target, damage, recover, status, action} = this.event
    const element = document.querySelector(`.${target.classId}`)
    let who = this.event.onCaster ? caster : target

    if (action.targetType === "friendly") {
      who = caster
    }

    if (damage) {
      // modify the target to have less hp
      target.hp = target.hp - damage
      if (target.hp <= 0) target.hp = 0

      // start blinking
      element.classList.add("battle-damage-blink")
    }

    if (recover) {
      let newHp = who.hp + recover

      if (newHp > who.maxHp) {
        newHp = who.maxHp
      }

      who.hp = newHp
    }

    if (status) {
      who.status = {...status}
    }
    if (status === null) {
      who.status = null
    }

    // wait a bit
    await utils.wait(DAMAGE_BLINK)

    //stop blinking
    element.classList.remove("battle-damage-blink")

    resolve()
  }

  async giveXp(resolve) {
    const maxXp = this.event.combatant.maxXp
    const xpBarStyle = document.querySelector(".xp-bar-used").style
    let xpNextLvl = this.event.xp
    
    if(maxXp <= this.event.combatant.xp + this.event.xp) {
      this.event.combatant.xp = this.event.combatant.maxXp
      this.event.combatant.level += 1
      xpNextLvl = this.event.combatant.xp + this.event.xp - maxXp  
        

      // await utils.wait(1000)
      const message = new TextMessage({
        text: "Hero has leveled up!",
        onComplete: () => {
          resolve()
        }
      })

        message.init(this.battle.map)
  

      xpBarStyle.transition = "none"
      this.event.combatant.xp = 0
    }

    await utils.wait(500)
    xpBarStyle.transition = "width 1s"
    this.event.combatant.xp += xpNextLvl
  }

  animation(resolve) {
    const fn = BattleAnimations[this.event.animation]
    fn(this.event, resolve)
  }

  init(resolve) {
    this[this.event.type](resolve)
  }
}
