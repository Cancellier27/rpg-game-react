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
      npcA: new Person({
        x: utils.withGrid(7),
        y: utils.withGrid(9),
        src: require("../images/characters/people/npc1.png"),
        behaviorLoop: [
          {type: "stand", direction: "left", time: 800},
          {type: "stand", direction: "up", time: 800},
          {type: "stand", direction: "right", time: 1200},
          {type: "stand", direction: "up", time: 1200},
        ],
        talking: [
          {
            events: [
              {type: "textMessage", text: "Hello Thereeeeee!", faceHero: "npcA"},
              {type: "textMessage", text: "See ya around"},
              {who: "hero", type: "walk", direction: "left"},
            ]
          }
        ]
      }),
      npcB: new Person({
        x: utils.withGrid(3),
        y: utils.withGrid(7),
        src: require("../images/characters/people/npc2.png"),
        behaviorLoop: [
          {type: "walk", direction: "left"},
          {type: "stand", direction: "up", time: 800},
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
    }
  },
  Kitchen: {
    lowerSrc: require("../images/maps/KitchenLower.png"),
    upperSrc: require("../images/maps/KitchenUpper.png"),
    gameObjects: {
      hero: new GameObject({
        x: 3,
        y: 5
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
  }
}
