import {Walking} from "./Walking"

export class GameObject {
  constructor(config) {
    // this.id to be set on OverWorldMap when initialized
    this.id = null
    this.isMounted = false
    this.x = config.x || 0
    this.y = config.y || 0
    this.direction = config.direction || "down"
    this.isShadow = config.isShadow === undefined ? true : config.isShadow

    this.walking = new Walking({})
  }

  mount(map) {
    this.isMounted = true
    map.addWall(this.x, this.y)
  }


  update() {}
}
