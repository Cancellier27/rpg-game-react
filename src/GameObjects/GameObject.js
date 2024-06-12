export class GameObject {
  constructor(config) {
    this.type = config.type || "npc"
    this.x = config.x || 0
    this.y = config.y || 0
    this.size = config.size || 32
    this.requireImageUrl =
      config.src || require("../images/characters/people/hero.png")
  }

  getState() {
    return {
      frameCoord: [this.x, this.y],
      size: this.size,
      requireImageUrl: this.requireImageUrl,
      type: this.type
    }
  }
}
