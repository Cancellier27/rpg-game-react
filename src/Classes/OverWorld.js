
import LevelsMap from "../levels/levelsMap"
import {DirectionInput} from "./DirectionInput"
import {OverWorldMap} from "./OverWorldMap"
import {GameLoop} from "./GameLoop"

export class OverWorld {
  constructor(levelId, onEmit) {
    this.levelId = levelId
    this.onEmit = onEmit
    this.directionInput = new DirectionInput()
    // this.walking = new Walking()

    this.init()
  }

  startGameLoop() {
    this.gameLoop?.stop();
    this.gameLoop = new GameLoop(() => {
      this.tick();
    });
  }

  tick() {
    // Object.values(this.gameObjects).forEach((obj) => {
    //   obj.x += 0.02
    // })

    // emit changes to React
    this.onEmit(this.getState())
  }

  init() {
    this.levelData = LevelsMap[this.levelId]

    // initializes OverWorldMap
    this.overWorldMap = new OverWorldMap(this.levelData)
    this.overWorldMap.init()

    // getting the gameObjects from OverWorldMap
    this.gameObjects = this.overWorldMap.gameObjects

    // start GameLoop
    this.startGameLoop()
  }

  destroy() {
    this.gameLoop.stop();
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
