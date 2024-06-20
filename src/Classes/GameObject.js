import {Walking} from "./Walking"
import {OverWorldEvent} from "./OverWorldEvent"

export class GameObject {
  constructor(config) {
    // this.id to be set on OverWorldMap when initialized
    this.id = null
    this.isMounted = false
    this.x = config.x || 0
    this.y = config.y || 0
    this.direction = config.direction || "down"
    this.isShadow = config.isShadow === undefined ? true : config.isShadow

    this.behaviorLoop = config.behaviorLoop || []
    this.behaviorLoopIndex = 0
  
    this.walking = new Walking({})
  }

  mount(map) {
    this.isMounted = true
    map.addWall(this.x, this.y)

    // If we have a behavior, kick off after a short time
    setTimeout(() => {
      this.doBehaviorEvent(map)
    }, 10 )
  }

  async doBehaviorEvent(map) {
    if(map.isCutscenePlaying || this.behaviorLoop.length === 0) {
      return
    }
    // console.log(this.behaviorLoopIndex)
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex]
    eventConfig.who = this.id

    const eventHandler = new OverWorldEvent({map: map, event: eventConfig})
    await eventHandler.init()

    this.behaviorLoopIndex += 1
    // resets the loop
    if(this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0
    }

    this.doBehaviorEvent(map)

  }


  update() {}
}
