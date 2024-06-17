import LevelsMap from "../levels/levelsMap"
import {DirectionInput} from "./DirectionInput"

export class OverWorld {
  constructor(levelId, onEmit) {
    this.id = levelId
    this.onEmit = onEmit
    this.directionInput = new DirectionInput()
    // this.walking = new Walking()

    this.init()
  }

  init() {
    this.levelData = LevelsMap[this.id]
    this.gameObjects = this.levelData.gameObjects

    // set the id variable in the object to its key value
    Object.keys(this.gameObjects).forEach(key => {
      let object = this.gameObjects[key]
      object.id = key
    })
  }

  destroy() {
    this.directionInput.unbind()
  }

  getState() {
    return {
      gameObjects: this.gameObjects,
      restart: () => {
        this.init()
      }
    }
  }
}
