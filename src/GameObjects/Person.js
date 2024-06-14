import {GameObject} from "./GameObject"

export class Person extends GameObject {
  constructor(config) {
    super(config)
    this.movementProgressRemaining = 0

    this.isPlayerControlled = config.isPlayerControlled || false

    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1]
    }
  }

  update(state) {
    if (this.movementProgressRemaining > 0) {
      this.updatePosition()
    } else {
      // more cases for starting loop

      //Case: keyboard ready and have any arrow pressed
      if (this.isPlayerControlled && state.arrow) {
        this.stateBehavior(state, {
          type: "walk",
          direction: state.arrow
        })
      }
      this.updateSprite(state)
    }
  }

  stateBehavior(state, behavior) {
    // move to this direction
    this.direction = behavior.direction
    if (behavior.type === "walk") {
      // walls collisions true or false
      if (state.walls.isSpaceTaken(this.x, this.y, this.direction)) {
        // stops moving when touches a wall
        return
      }
      // moves the wall of the hero while he moves
      state.walls.moveWall(this.x, this.y, this.direction)
      // ready to walk
      this.movementProgressRemaining = 16
    }
  }

  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction]
    this[property] += change
    this.movementProgressRemaining -= 1
  }

  updateSprite() {
    if (this.movementProgressRemaining > 0) {
      this.walking.setAnimation("walk-" + this.direction)
      return
    }
    this.walking.setAnimation("idle-" + this.direction)
  }
}
