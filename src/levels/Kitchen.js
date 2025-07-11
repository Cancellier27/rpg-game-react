import {Person} from "../classes/Person"
import {utils} from "../helpers/utils"

export const Kitchen = {
  gameObjects: {
    hero: new Person({
      isPlayerControlled: true,
      x: utils.withGrid(5),
      y: utils.withGrid(9)
    }),
    npcA: new Person({
      x: utils.withGrid(10),
      y: utils.withGrid(8),
      talking: [
        {
          events: [
            {type: "textMessage", text: "You made it!", faceHero: "npcA"}
          ]
        }
      ]
    })
  },
  cutsceneSpaces: {
    [utils.asGridCoord(5,10)]: [
      {
        events: [
          {type: "changeMap", map: "Street"}
        ]
      }
    ]
  }
}
