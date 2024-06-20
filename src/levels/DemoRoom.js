import {Person} from "../classes/Person"
import {utils} from "../helpers/utils"

export const DemoRoom = {
  gameObjects: {
    hero: new Person({
      x: utils.withGrid(5),
      y: utils.withGrid(6),
      isPlayerControlled: true
    }),
    npcA: new Person({
      x: utils.withGrid(7),
      y: utils.withGrid(9),
      behaviorLoop: [
        {type: "stand", direction: "up", time: 1000},
        {type: "stand", direction: "right", time: 1200},
        {type: "stand", direction: "left", time: 2000}
      ]
    }),
    npcB: new Person({
      x: utils.withGrid(3),
      y: utils.withGrid(7),
      behaviorLoop: [
        {type: "walk", direction: "left"},
        {type: "walk", direction: "up"},
        {type: "walk", direction: "right"},
        {type: "walk", direction: "down"}
      ]
    })
  },
  walls: {
    // walls collisions based on map
    [utils.asGridCoord(7, 6)]: true,
    [utils.asGridCoord(8, 6)]: true,
    [utils.asGridCoord(7, 7)]: true,
    [utils.asGridCoord(8, 7)]: true
  },
}
