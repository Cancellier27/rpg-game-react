import { utils } from "../helpers/utils"

export const DemoRoom = {
  // gameObjects: {
  //   hero: new Person({
  //     x: utils.withGrid(5),
  //     y: utils.withGrid(6),
  //     isPlayerControlled: true
  //   }),
  //   npcA: new Person({
  //     x: utils.withGrid(7),
  //     y: utils.withGrid(9),
  //     behaviorLoop: [
  //       {type: "stand", direction: "left", time: 800},
  //       {type: "stand", direction: "up", time: 800},
  //       {type: "stand", direction: "right", time: 1200},
  //       {type: "stand", direction: "up", time: 1200}
  //     ],
  //     talking: [
  //       {
  //         events: [
  //           {
  //             type: "textMessage",
  //             text: "Hello Thereeeeee!",
  //             faceHero: "npcA"
  //           },
  //           {type: "textMessage", text: "See ya around"},
  //           {who: "hero", type: "walk", direction: "left"}
  //         ]
  //       }
  //     ]
  //   }),
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
  // },
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