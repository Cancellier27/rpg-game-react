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

  mountObjects() {
    Object.values(this.gameObjects).forEach(object => {
      object.mount(this)
    })
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true
  }

  removeWall(x, y) {
    delete this.walls[`${x},${y}`]
  }
  
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY)
    const {x,y} = utils.nextPosition(wasX, wasY, direction)
    this.addWall(x,y)
  }

}
