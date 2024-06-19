import {utils} from "../helpers/utils"

export class OverWorldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects
    this.walls = config.walls || {}
  }

  changeMap(mapName) {
    // change the state to change the map
  }

  isSpaceTaken(currentX, currentY, direction) {
    const {x, y} = utils.nextPosition(currentX, currentY, direction)
    return this.walls[`${x},${y}`] || false
  }
}
