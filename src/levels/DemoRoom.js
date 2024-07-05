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
      ],
      talking: [
        {
          events: [
            {type: "textMessage", text: "Hellooo there!", faceHero: "npcA"},
            {type: "textMessage", text: "see you around"},
          ]
        }
      ]
    }),
    npcB: new Person({
      x: utils.withGrid(8),
      y: utils.withGrid(5),
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
    [utils.asGridCoord(7,4)]: [
      {
        events: [
          {who: "npcB", type: "walk", direction: "left"},
          {who: "npcB", type: "stand", direction: "up", time: 500},
          {type: "textMessage", text: "You can't be in there"},
          {type: "textMessage", text: "Get out!!"},
          {who: "npcB", type: "walk", direction: "right"},
          {who: "npcB", type: "stand", direction: "left"},
          {who: "hero", type: "walk", direction: "down"},
          {who: "hero", type: "walk", direction: "left"},
          {who: "npcB", type: "stand", direction: "down"},
        ]
      }
    ], 
    [utils.asGridCoord(5,10)]: [
      {
        events: [
          {type: "changeMap", map: "Kitchen"}
        ]
      }
    ],
    [utils.asGridCoord(1,4)]: [
      {
        events: [
          {type: "battle"}
        ]
      }
    ]
  }
}
