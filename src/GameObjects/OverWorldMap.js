import {OVERWORLD_MAPS} from "../helpers/maps"
import {utils} from "../helpers/utils"
import {OverWorldEvent} from "./OverWorldEvent"

export class OverWorldMap {
  constructor(config) {
    this.map = config.map

    this.overWorld = null

    this.walls = OVERWORLD_MAPS[this.map].walls || {}
    this.gameObjects = OVERWORLD_MAPS[this.map].gameObjects || {}
    this.cutsceneSpaces = OVERWORLD_MAPS[this.map].cutsceneSpaces || {}

    this.isCutscenePlaying = false
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

  async startCutscene(events, setMessage = null) {
    // fezes screen
    this.isCutscenePlaying = true

    // do the cutscene
    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverWorldEvent({
        map: this,
        event: events[i]
      })
      // checks if it is a textMessage cutscene
      if (events[i].type === "textMessage") {
        setMessage(true)
        await eventHandler.init()
      } else {
        await eventHandler.init()
      }
    }

    // resume movements
    this.isCutscenePlaying = false

    // reset NPCs to redo their behavior
    Object.values(this.gameObjects).forEach((object) =>
      object.doBehaviorEvent(this)
    )
  }

  // check is there is anyone in front of hero.
  checkForActionCutscene(setMessage) {
    const hero = this.gameObjects.hero
    const nextCoord = utils.nextPosition(hero.x, hero.y, hero.direction)
    const match = Object.values(this.gameObjects).find((object) => {
      return `${object.x},${object.y}` === `${nextCoord.x},${nextCoord.y}`
    })
    // fires a cutscene when hero finds another npc and press enter
    if (!this.isCutscenePlaying && match && match.talking.length) {
      this.startCutscene(match.talking[0].events, setMessage)
    }
  }

  checkForFootstepCutscene(setMessage) {
    const hero = this.gameObjects["hero"]
    const match = this.cutsceneSpaces[`${hero.x}, ${hero.y}`]
    if (!this.isCutscenePlaying && match) {
      this.startCutscene(match[0].events, setMessage)
    }
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
