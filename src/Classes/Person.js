import {GameObject} from "./GameObject"

export class Person extends GameObject {
  constructor(config) {
    super(config)
    this.movementProgressRemaining = 0
    this.isStanding = false

    this.isPlayerControlled = config.isPlayerControlled || false

    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1]
    }
  }

  update(state) {
    this.updatePosition()
    this.updateSprite(state)

    if (
      this.isPlayerControlled &&
      this.movementProgressRemaining === 0 &&
      state.arrow
    ) {
      this.direction = state.arrow
      this.movementProgressRemaining = 16
    }

    // if (this.movementProgressRemaining > 0) {
    //   this.updatePosition()
    // } else {
    //   // more cases for starting loop

    //   //Case: keyboard ready and have any arrow pressed
    //   if (
    //     !state.map.isCutscenePlaying &&
    //     this.isPlayerControlled &&
    //     state.arrow
    //   ) {
    //     this.startBehavior(state, {
    //       type: "walk",
    //       direction: state.arrow
    //     })
    //   }
    //   this.updateSprite(state)
    // }
  }

  // startBehavior(state, behavior) {
  //   // move to this direction
  //   this.direction = behavior.direction

  //   // walk behavior --------------------------
  //   if (behavior.type === "walk") {
  //     // stop here is space is not free
  //     if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
  //       // retry the npc automatic movement every 1 sec
  //       behavior.retry &&
  //         setTimeout(() => {
  //           this.startBehavior(state, behavior)
  //         }, 1000)
  //       return
  //     }
  //     // ready to walk
  //     // moves the wall of the hero while he moves
  //     state.map.moveWall(this.x, this.y, this.direction)
  //     this.movementProgressRemaining = 16
  //     this.updateSprite(state)
  //   }

  //   // stand behavior --------------------------
  //   if (behavior.type === "stand") {
  //     this.isStanding = true
  //     setTimeout(() => {
  //       utils.emitEvent("PersonStandComplete", {
  //         whoId: this.id
  //       })
  //     }, behavior.time)
  //     this.isStanding = false
  //   }
  // }

  updatePosition() {
    if (this.movementProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction]
      this[property] += change
      this.movementProgressRemaining -= Math.abs(change)
      // finished walking!
      // utils.emitEvent("PersonWalkingComplete", {
      //   whoId: this.id
      // })
    }
  }

  updateSprite(state) {
    if (
      this.isPlayerControlled &&
      this.movementProgressRemaining === 0 &&
      !state.arrow
    ) {
      this.walking.setAnimation("idle-" + this.direction)
      return
    }

    if (this.movementProgressRemaining > 0) {
      this.walking.setAnimation("walk-" + this.direction)
    }
  }
}