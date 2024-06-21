export class DirectionInput {
  constructor() {
    this.heldDirections = []

    this.map = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      KeyW: "up",
      KeyS: "down",
      KeyA: "left",
      KeyD: "right"
    }
  }

  get direction() {
    return this.heldDirections[0]
  }

  init() {
    this.directionKeyDownHandler = (e) => {
      const dir = this.map[e.code]
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir)
      }
    }

    this.directionKeyUpHandler = (e) => {
      const dir = this.map[e.code]
      const index = this.heldDirections.indexOf(dir)
      if (index > -1) {
        this.heldDirections.splice(index, 1)
      }
    }

    document.addEventListener("keydown", this.directionKeyDownHandler)
    document.addEventListener("keyup", this.directionKeyUpHandler)
  }

  unbind() {
    document.removeEventListener("keydown", this.directionKeyDownHandler)
    document.removeEventListener("keyup", this.directionKeyUpHandler)
  }
}
