import {utils} from "../helpers/utils"
import { OverWorldEvent } from "./OverWorldEvent"

export class OverWorldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects
  
    this.walls = config.walls || {}

    this.isCutscenePlaying = false

    this.isMessageDisplaying = false
    this.messageText = ""
    this.messageOnComplete = null
  }

  terminateMessage() {
    this.isMessageDisplaying = false
    this.messageText = ""
    this.messageOnComplete = null
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

  async startCutscene(events) {
    this.isCutscenePlaying = true

    for (let i = 0; i<events.length; i++) {
      const eventHandler = new OverWorldEvent({
        event: events[i],
        map: this
      })
      await eventHandler.init()
    }

    this.isCutscenePlaying = false

    // reset NPCs to their initial behaviors
    Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
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
