import {GameObject} from "../classes/GameObject"
import {utils} from "../helpers/utils"

export const DemoRoom = {
  gameObjects: {
    hero: new GameObject({
      x: utils.withGrid(5),
      y: utils.withGrid(6),
    }),
    // npc1: new GameObject({
    //   x: 7,
    //   y: 9
    // })
  }
}
