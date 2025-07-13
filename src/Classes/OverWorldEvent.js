import {utils} from "../helpers/utils"
import {TextMessage} from "./TextMessage"
import {Battle} from "../battleClasses/Battle"

export class OverWorldEvent {
  constructor({map, event}) {
    this.map = map
    this.event = event
  }

  stand(resolve) {
    const who = this.map.gameObjects[this.event.who]
    who.startBehavior(
      {
        map: this.map
      },
      {
        type: "stand",
        direction: this.event.direction,
        time: this.event.time
      }
    )

    //Set up a handler to complete when correct person is done walking, then resolve the event
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonStandComplete", completeHandler)
        resolve()
      }
    }
    document.addEventListener("PersonStandComplete", completeHandler)
  }

  walk(resolve) {
    const who = this.map.gameObjects[this.event.who]
    who.startBehavior(
      {
        map: this.map
      },
      {
        type: "walk",
        direction: this.event.direction,
        retry: true
      }
    )

    //Set up a handler to complete when correct person is done walking, then resolve the event
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonWalkingComplete", completeHandler)
        resolve()
      }
    }
    document.addEventListener("PersonWalkingComplete", completeHandler)
  }

  textMessage(resolve) {
    // face the hero when talking
    if (this.event.faceHero) {
      const obj = this.map.gameObjects[this.event.faceHero]
      obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction)
    }

    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => resolve()
    })
    message.init(this.map)
  }

  changeMap(resolve) {
    this.map.overWorld.changeMap(this.event.map)
    resolve()
  }

  battle(resolve) {
    const battle = new Battle({
      onComplete: () => {
        this.map.endBattleScene()
        resolve()
      },
      map: this.map,
      enemy: this.event.enemy
    })

    this.map.startBattleScene(battle)
  }

  init() {
    return new Promise((resolve) => {
      this[this.event.type](resolve)
    })
  }
}
