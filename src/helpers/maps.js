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
      npcA: new Person({
        x: utils.withGrid(7),
        y: utils.withGrid(9),
        src: require("../images/characters/people/npc1.png"),
        behaviorLoop: [
          {type: "stand", direction: "left", time: 800},
          {type: "stand", direction: "up", time: 800},
          {type: "stand", direction: "right", time: 1200},
          {type: "stand", direction: "up", time: 1200}
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "Hello Thereeeeee!",
                faceHero: "npcA"
              },
              {type: "textMessage", text: "See ya around"},
              {who: "hero", type: "walk", direction: "left"}
            ]
          }
        ]
      }),
      npcB: new Person({
        x: utils.withGrid(8),
        y: utils.withGrid(5),
        src: require("../images/characters/people/npc2.png")
        // behaviorLoop: [
        //   {type: "walk", direction: "left"},
        //   {type: "stand", direction: "up", time: 800},
        //   {type: "walk", direction: "up"},
        //   {type: "walk", direction: "right"},
        //   {type: "walk", direction: "down"}
        // ]
      })
    },
    walls: {
      // walls collisions based on map
      [utils.asGridCoord(7, 6)]: true,
      [utils.asGridCoord(8, 6)]: true,
      [utils.asGridCoord(7, 7)]: true,
      [utils.asGridCoord(8, 7)]: true
    },
    cutsceneSpaces: {
      [utils.asGridCoord(7, 4)]: [
        {
          events: [
            {who: "npcB", type: "walk", direction: "left"},
            {who: "npcB", type: "stand", direction: "up", time: 500},
            {who: "npcB", type: "textMessage", text: "You can't go in there"},
            {who: "npcB", type: "textMessage", text: "Get out!!"},
            {who: "npcB", type: "walk", direction: "right"},
            {who: "npcB", type: "stand", direction: "left"},
            {who: "hero", type: "walk", direction: "down"},
            {who: "hero", type: "walk", direction: "left"},
            {who: "npcB", type: "stand", direction: "down"}
          ]
        }
      ],
      [utils.asGridCoord(5, 10)]: [
        {
          events: [
            {type: "changeMap", map: "Kitchen"},
          ]
        }
      ],
    }
  },
  Kitchen: {
    lowerSrc: require("../images/maps/KitchenLower.png"),
    upperSrc: require("../images/maps/KitchenUpper.png"),
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(5)
      }),
      npcB: new Person({
        x: utils.withGrid(10),
        y: utils.withGrid(8),
        src: require("../images/characters/people/npc3.png"),
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "You've made it!",
                faceHero: "npcA"
              }
            ]
          }
        ]
      })
    }
  }
}
