import LevelsMap from "../levels/levelsMap"
import {DirectionInput} from "./DirectionInput"
import {OverWorldMap} from "./OverWorldMap"
import {GameLoop} from "./GameLoop"
import { KeyPressListener } from "./KeyPressListener"

export class OverWorld {
  constructor(levelId, onEmit) {
    this.levelId = levelId
    this.onEmit = onEmit

    this.init()
  }

  startGameLoop() {
    this.gameLoop?.stop()
    this.gameLoop = new GameLoop(() => {
      this.tick()
    })
  }

  tick() {
    Object.values(this.gameObjects).forEach((object) => {
      object.update({
        arrow: this.directionInput.direction,
        map: this.overWorldMap
      })
      object.walking.walk()
    })

    // EMIT CHANGES TO REACT -----------
    this.onEmit(this.getState())
  }

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      // is there somene o talk here to?
      this.overWorldMap.checkForActionCutscene()
      
    })
  }

  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", e => {
      if(e.detail.whoId === "hero") {
      this.overWorldMap.checkForFootstepCutscene()
      }
    })
  }

  init() {
    this.levelData = LevelsMap[this.levelId]

    // initializes OverWorldMap
    this.overWorldMap = new OverWorldMap(this.levelData)
    this.overWorldMap.mountObjects()

    this.bindActionInput()
    this.bindHeroPositionCheck()

    // initializes DirectionInput
    this.directionInput = new DirectionInput()
    this.directionInput.init()

    // getting the gameObjects levelData
    this.gameObjects = this.levelData.gameObjects

    // set the id variable in the object to its key value
    Object.keys(this.gameObjects).forEach((key) => {
      let object = this.gameObjects[key]
      object.id = key
    })

    // start GameLoop
    this.startGameLoop()
  }

  destroy() {
    this.gameLoop.stop()
    this.directionInput.unbind()
  }

  getState() {
    return {
      gameObjects: this.gameObjects,
      cameraPerson: this.gameObjects.hero,

      // Passing the display message data and callback
      OWMap: this.overWorldMap,
      messageOnComplete: this.overWorldMap.messageOnComplete,

      restart: () => {
        this.init()
      }
    }
  }
}
