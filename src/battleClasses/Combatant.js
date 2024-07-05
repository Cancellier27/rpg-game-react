export class Combatant {
  constructor(config, battle) {
    Object.keys(config).forEach((key) => {
      this[key] = config[key]
    })
    this.battle = battle
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

  decrementStatus() {
    if (this.status?.expiresIn > 0) {
      const statusType = this.status.type
      this.status.expiresIn -= 1
      if (this.status?.expiresIn === 0) {
        this.status = null
      }
      return {
        type: "textMessage",
        text: `${statusType} status expired`
      }
    }

    return null
  }
}
