import LevelsMap from "../levels/levelsMap"
import {DirectionInput} from "./DirectionInput"
import {Walking} from "./Walking"

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
    // this.gameObjects = this.levelData.gameObjects
  }

  destroy() {
    this.directionInput.unbind()
  }

  getState() {
    return {
      // gameObjects: this.gameObjects,
      restart: () => {
        this.init()
      }
    }
  }
}
