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
        direction: this.event.direction
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

  init() {
    return new Promise((resolve) => {
      this[this.event.type](resolve)
    })
  }
}
