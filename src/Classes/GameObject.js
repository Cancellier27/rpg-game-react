export class GameObject {
  constructor(config) {
    this.id = null
    this.isPlayerControlled = false
    this.x = config.x || 0
    this.y = config.y || 0
    this.walking = null
  }
}
