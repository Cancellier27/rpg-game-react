export class GameObject {
  constructor(config) {
    // this.id to be set on OverWorldMap when initialized
    this.id = null
    this.x = config.x || 0
    this.y = config.y || 0
    this.isShadow = config.isShadow === undefined ? true : config.isShadow
    this.walking = null
  }
}
