import {Walking} from "./Walking"

export class GameObject {
  constructor(config) {
    this.type = config.type || "npc"
    this.x = config.x || 0
    this.y = config.y || 0
    this.direction = config.direction || "down"
    this.size = config.size || 32
    this.shadow = config.shadow || true
    this.requireImageUrl =
      config.src || require("../images/characters/people/hero.png")
    this.walking = new Walking({
      gameObject: this
    })
  }

  update() {}

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
