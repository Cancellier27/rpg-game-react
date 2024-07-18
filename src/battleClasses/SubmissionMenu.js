import {Actions} from "../Content/Actions"

export class SubmissionMenu {
  constructor({caster, enemy, onComplete, map}) {
    this.caster = caster
    this.enemy = enemy
    this.onComplete = onComplete
    this.map = map
  }

  decide(action = null, instanceId = null) {
    if (action) {
      // player turn
      this.map.isPlayerChoosing = false
      this.onComplete({
        action: Actions[action],
        target: action.targetType === "friendly" ? this.caster : this.enemy,
        instanceId
      })
    } else {
      // enemy turn
      this.map.isPlayerChoosing = false
      this.onComplete({
        action: Actions[this.caster.actions[0]],
        target: Actions[this.caster.actions[0]].targetType === "friendly" ? this.caster : this.enemy,
        instanceId
      })
    }
  }

  init() {
    if (this.caster.isPlayerControlled) {
      // show some ui
      this.map.decideFn = (action, instanceId) => this.decide(action, instanceId)
      this.map.isPlayerChoosing = true
    } else {
      this.decide()
    }
  }
}
