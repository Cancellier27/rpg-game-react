import { GameObject } from "../classes/GameObject"

export const DemoRoom = {
  gameObjects: {
    hero: new GameObject({
      x: 5,
      y: 6,
      isPlayerControlled: true
    }),
    npc1: new GameObject({
      x: 7,
      y: 9,
    }),
  //   npcB: new Person({
  //     x: utils.withGrid(8),
  //     y: utils.withGrid(5),
  //     src: require("../images/characters/people/npc2.png"),
  //     behaviorLoop: [
  //       {type: "walk", direction: "left"},
  //       {type: "stand", direction: "up", time: 800},
  //       {type: "walk", direction: "up"},
  //       {type: "walk", direction: "right"},
  //       {type: "walk", direction: "down"}
  //     ]
  //   })
  },
  // walls: {
  //   // walls collisions based on map
  //   [utils.asGridCoord(7, 6)]: true,
  //   [utils.asGridCoord(8, 6)]: true,
  //   [utils.asGridCoord(7, 7)]: true,
  //   [utils.asGridCoord(8, 7)]: true
  // },
  // cutsceneSpaces: {
  //   [utils.asGridCoord(7, 4)]: [
  //     {
  //       events: [
  //         {who: "npcB", type: "walk", direction: "left"},
  //         {who: "npcB", type: "stand", direction: "up", time: 500},
  //         {who: "npcB", type: "textMessage", text: "You can't go in there"},
  //         {who: "npcB", type: "textMessage", text: "Get out!!"},
  //         {who: "npcB", type: "walk", direction: "right"},
  //         {who: "npcB", type: "stand", direction: "left"},
  //         {who: "hero", type: "walk", direction: "down"},
  //         {who: "hero", type: "walk", direction: "left"},
  //         {who: "npcB", type: "stand", direction: "down"}
  //       ]
  //     }
  //   ],
  //   [utils.asGridCoord(5, 10)]: [
  //     {
  //       events: [
  //         {type: "changeMap", map: "Kitchen"},
  //       ]
  //     }
  //   ],
  // }
}