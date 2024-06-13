import {GameObject} from "../GameObjects/GameObject"
import {Person} from "../GameObjects/Person"
import {utils} from "../helpers/utils"

export const OVERWORLD_MAPS = {
  DemoRoom: {
    lowerSrc: require("../images/maps/DemoLower.png"),
    upperSrc: require("../images/maps/DemoUpper.png"),
    gameObjects: { 
      hero: new Person({
        x: utils.withGrid(5),
        y: utils.withGrid(6),
        isPlayerControlled: true
      }),
      // npc1: new Person({
      //   x: utils.withGrid(7),
      //   y: utils.withGrid(9),
      //   src: require("../images/characters/people/npc1.png")
      // })
    }
  },
  Kitchen: {
    lowerSrc: require("../images/maps/KitchenLower.png"),
    upperSrc: require("../images/maps/KitchenUpper.png"),
    gameObjects: {
      hero: new GameObject({
        x: 3,
        y: 5,
      }),
      npcA: new GameObject({
        x: 9,
        y: 6,
        src: require("../images/characters/people/npc2.png")
      }),
      npcB: new GameObject({
        x: 10,
        y: 8,
        src: require("../images/characters/people/npc3.png")
      })
    }
  },
}