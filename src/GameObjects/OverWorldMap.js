import {utils} from "../helpers/utils"
import {OVERWORLD_MAPS} from "../helpers/maps"

export class OverWorldMap {
  constructor(config) {
    this.map = config.map
    // walls collision coordinates object
    this.walls = OVERWORLD_MAPS[this.map].walls || {}
    this.gameObjects = OVERWORLD_MAPS[this.map].gameObjects || {}
  }

  isSpaceTaken(currentX, currentY, direction) {
    const {x, y} = utils.nextPosition(currentX, currentY, direction)
    return this.walls[`${x}, ${y}`] || false
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach((key) => {

      let object = this.gameObjects[key]
      object.id = key

      // determine if the object should actually mount
      object.mount(this)
    })
  }

  //  add a new wall to the object
  addWall(x, y) {
    this.walls[`${x}, ${y}`] = true
  }

  //  remove a wall from the object
  removeWall(x, y) {
    delete this.walls[`${x}, ${y}`]
  }

  // move a wall
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY)
    const {x, y} = utils.nextPosition(wasX, wasY, direction)
    this.addWall(x, y)
  }
}
