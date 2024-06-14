import { TextMessage } from "./TextMessage"

export class OverWorldEvent {
  constructor({map, event}) {
    this.map = map
    this.event = event
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

    // set up a handler to complete when correct person is done walking, then resolve promise
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonWalkingComplete", completeHandler)
        resolve()
      }
    }

    document.addEventListener("PersonWalkingComplete", completeHandler)
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

  textMessage(resolve, obj) {
    obj.text = this.event.text
    obj.onComplete = () => resolve()

  }

  init(obj = null) {
    if(obj === null) {
      return new Promise((resolve) => {
        this[this.event.type](resolve)
      })
    } else {
      return new Promise((resolve) => {
        this.textMessage(resolve, obj)
      })
    } 
  }
}
