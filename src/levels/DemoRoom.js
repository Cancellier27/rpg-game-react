import {Person} from "../classes/Person"
import {utils} from "../helpers/utils"

export const DemoRoom = {
  gameObjects: {
    hero: new Person({
      x: utils.withGrid(5),
      y: utils.withGrid(6),
      isPlayerControlled: true
    }),
    // npc1: new Person({
    //   x: utils.withGrid(7),
    //   y: utils.withGrid(9)
    // })
  }
}
