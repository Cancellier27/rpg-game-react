import { utils } from "../helpers/utils"

export class Combatant {
  constructor(config, battle) {
    Object.keys(config).forEach((key) => {
      this[key] = config[key]
    })
    this.battle = battle
  }

  get givesXp() {
    // return this.level * 20
    return this.xp
  }

  getPostEvents() {
    if (this.status?.type === "heal") {
      return [
        {type: "textMessage", text: "Being healed!"},
        {type: "stateChange", recover: 5, onCaster: true}
      ]
    }

    return []
  }

  getReplacedEvents(originalEvents) {
    if (this.status?.type === "sleepy" && utils.randomFromArray([true, false, false])) {
      return [
        {type: "textMessage", text: `${this.name} put enemy to sleep`},
      ]
    }

    return originalEvents
  }

  decrementStatus() {
    if (this.status?.expiresIn > 0) {
      const statusType = this.status.type
      this.status.expiresIn -= 1
      if (this.status?.expiresIn === 0) {
        this.status = null
        return {
          type: "textMessage",
          text: `${statusType} status expired`
        }
      }
    }

    return null
  }
}
