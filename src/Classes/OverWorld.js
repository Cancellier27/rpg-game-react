import LevelsMap from "../levels/levelsMap"
import {DirectionInput} from "./DirectionInput"
import {OverWorldMap} from "./OverWorldMap"
import {GameLoop} from "./GameLoop"
import {KeyPressListener} from "./KeyPressListener"
import { FADE_TIME } from "../helpers/consts"
import { utils } from "../helpers/utils"

export class OverWorld {
  constructor(levelId, onEmit) {
    this.levelId = levelId
    this.onEmit = onEmit

    this.isFadeIn = false
    this.isFadeOut = false

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
      // is there someone to talk here to?
      this.overWorldMap.checkForActionCutscene()
    })
  }

  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", (e) => {
      if (e.detail.whoId === "hero") {
        this.overWorldMap.checkForFootstepCutscene()
      }
    })
  }

  async changeMap(mapConfig) {
    this.isFadeIn = true

    await utils.wait(FADE_TIME)

    this.isFadeIn = false
    this.isFadeOut = true
    this.levelId = mapConfig
    this.startMap(mapConfig) 
    
    await utils.wait(FADE_TIME)

    this.isFadeOut = false
  }

  startMap(mapConfig) {
    // initializes OverWorldMap
    this.overWorldMap = new OverWorldMap(LevelsMap[mapConfig])

    this.overWorldMap.overWorld = this
    this.overWorldMap.mountObjects()
    this.gameObjects = this.overWorldMap.gameObjects
  }

  init() {
    this.startMap(this.levelId)
    
    this.bindActionInput()
    this.bindHeroPositionCheck()
    
    // initializes DirectionInput
    this.directionInput = new DirectionInput()
    this.directionInput.init()

    // start GameLoop
    this.startGameLoop()

    // this.overWorldMap.startCutscene([
    //   {type: "battle"}
    // ])
  }

  destroy() {
    this.gameLoop.stop()
    this.directionInput.unbind()
  }

  getState() {
    return {
      currentLevel: this.levelId,
      gameObjects: this.gameObjects,
      cameraPerson: this.gameObjects.hero,
      
      // fade information
      isFadeIn: this.isFadeIn,
      isFadeOut: this.isFadeOut,

      // battle
      isBattle: this.overWorldMap.isBattle,
      battle: this.overWorldMap.battle,
      decideFn: this.overWorldMap.decideFn,

      // textMessage
      OWMap: this.overWorldMap,
      messageOnComplete: this.overWorldMap.messageOnComplete,

      restart: () => {
        this.init()
      }
    }
  }
}
