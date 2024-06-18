export class OverWorldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects
  }

  changeMap(mapName) {
    // change the state to change the map
  }

  init() {
    // set the id variable in the object to its key value
    Object.keys(this.gameObjects).forEach((key) => {
      let object = this.gameObjects[key]
      object.id = key
    })
  }
}
