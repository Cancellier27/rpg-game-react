import {utils} from "../helpers/utils"
import {OverWorldEvent} from "./OverWorldEvent"

export class OverWorldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects
    this.walls = config.walls || {}
    this.cutsceneSpaces = config.cutsceneSpaces || {}
    this.overWorld = null

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

  isSpaceTaken(currentX, currentY, direction) {
    const {x, y} = utils.nextPosition(currentX, currentY, direction)
    return this.walls[`${x},${y}`] || false
  }

  mountObjects() {
    // set the id variable in the object to its key value
    Object.keys(this.gameObjects).forEach((key) => {
      let object = this.gameObjects[key]
      object.id = key
    })

    Object.values(this.gameObjects).forEach((object) => {
      object.mount(this)
    })
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true

    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverWorldEvent({
        event: events[i],
        map: this
      })
      await eventHandler.init()
    }

    this.isCutscenePlaying = false

    // reset NPCs to their initial behaviors
    Object.values(this.gameObjects).forEach((object) =>
      object.doBehaviorEvent(this)
    )
  }

  checkForActionCutscene() {
    const hero = this.gameObjects.hero
    const coords = utils.nextPosition(hero.x, hero.y, hero.direction)
    const match = Object.values(this.gameObjects).find((object) => {
      return `${object.x},${object.y}` === `${coords.x},${coords.y}`
    })

    // fires an action cutscene when the character finds another character on the map
    if (!this.isCutscenePlaying && match && match.talking.length) {
      this.startCutscene(match.talking[0].events)
    }
  }

  checkForFootstepCutscene() {
    const hero = this.gameObjects["hero"]
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`]
    if (!this.isCutscenePlaying && match) {
      this.startCutscene(match[0].events)
    }
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true
  }

  removeWall(x, y) {
    delete this.walls[`${x},${y}`]
  }

  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY)
    const {x, y} = utils.nextPosition(wasX, wasY, direction)
    this.addWall(x, y)
  }
}
