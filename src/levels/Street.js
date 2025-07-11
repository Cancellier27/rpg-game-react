import {Person} from "../classes/Person"
import {utils} from "../helpers/utils"

export const Street = {
  gameObjects: {
    hero: new Person({
      isPlayerControlled: true,
      x: utils.withGrid(5),
      y: utils.withGrid(10)
    }),
    npcA: new Person({
      x: utils.withGrid(10),
      y: utils.withGrid(12),
      behaviorLoop: [
        {type: "walk", direction: "right"},
        {type: "walk", direction: "right"},
        {type: "walk", direction: "right"},
        {type: "stand", direction: "right", time: 1200},
        {type: "stand", direction: "up", time: 1200},
        {type: "walk", direction: "left"},
        {type: "walk", direction: "left"},
        {type: "walk", direction: "left"},
        {type: "stand", direction: "left", time: 2000},
        {type: "stand", direction: "down", time: 2000}
      ],
      talking: [
        {
          events: [
            {type: "textMessage", text: "Watch out on the street", faceHero: "npcA"},
            {type: "textMessage", text: "You never know how are looking", faceHero: "npcA"}
          ]
        }
      ]
    })
  },
  cutsceneSpaces: {
    [utils.asGridCoord(5,9)]: [
      {
        events: [
          {type: "changeMap", map: "Kitchen"}
        ]
      }
    ],
    [utils.asGridCoord(29,9)]: [
      {
        events: [
          {type: "changeMap", map: "DemoRoom"}
        ]
      }
    ]
  }
}
