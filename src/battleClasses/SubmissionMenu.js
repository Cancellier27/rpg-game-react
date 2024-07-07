import {Actions} from "../Content/Actions"

export class SubmissionMenu {
  constructor({caster, enemy, onComplete, map}) {
    this.caster = caster
    this.enemy = enemy
    this.onComplete = onComplete
    this.map = map
  }

  decide(action = null) {
    if (action) {
      this.map.isPlayerChoosing = false
      this.onComplete({
        action: Actions[action],
        target: this.enemy
      })
    } else {
      this.map.isPlayerChoosing = false
      this.onComplete({
        action: Actions[this.caster.actions[0]],
        target: this.enemy
      })
    }
  }

  init() {
    if (this.caster.isPlayerControlled) {
      // show some ui
      this.map.decideFn = (action) => this.decide(action)
      this.map.isPlayerChoosing = true

    } else {
      this.decide()
    }
  }
}
