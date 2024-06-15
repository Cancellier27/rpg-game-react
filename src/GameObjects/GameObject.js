import {Walking} from "./Walking"
import {OverWorldEvent} from "./OverWorldEvent"

export class GameObject {
  constructor(config) {
    this.id = null
    this.isMounted = false
    this.type = config.type || "npc"
    this.x = config.x || 0
    this.y = config.y || 0
    this.direction = config.direction || "down"
    this.size = config.size || 32
    this.shadow = config.shadow || true
    this.requireImageUrl = config.src || require("../images/characters/people/hero.png")
    this.walking = new Walking({
      gameObject: this
    })

    this.behaviorLoop = config.behaviorLoop || []
    this.behaviorLoopIndex = 0
  
    this.talking = config.talking || []
  }

  mount(map) {
    this.isMounted = true
    map.addWall(this.x, this.y)

    // If we have a behavior, kick off after a short delay
    setTimeout(() => {
      this.doBehaviorEvent(map)
    }, 10)
  }

  update() {}

  // executes the behavior on the map data for each object
  async doBehaviorEvent(map) {

    // don't do anything is there is a cutscene playing or there is not config to be ran from the object
    if(map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
      return
    }

    // setting up the behavior event
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex]
    eventConfig.who = this.id

    // create an event instance out of our next event config
    const eventHandler = new OverWorldEvent({map: map, event: eventConfig})
    await eventHandler.init()

    // restart the loop 
    this.behaviorLoopIndex += 1
    if(this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0
    }

    // calls itself again!
    this.doBehaviorEvent(map)
 
  }

  getState() {
    return {
      frameCoord: [this.x, this.y],
      size: this.size,
      requireImageUrl: this.requireImageUrl,
      type: this.type,
      shadow: this.shadow,
      animation: this.walking.getState()
    }
  }
}
