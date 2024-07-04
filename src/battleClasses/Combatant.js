export class Combatant {
  constructor(config, battle) {
    Object.keys(config).forEach(key => {
      this[key] = config[key]
    })
    this.battle = battle
  }

  getPostEvents() {
    if(this.status?.type === "heal") {
      return [
        {type: "textMessage", text: "Being healed!"},
        {type: "stateChange", recover: 5, onCaster: true}
      ]
    }

    return []
  }


}