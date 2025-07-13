import {Person} from "../classes/Person"
import {utils} from "../helpers/utils"

export const Kitchen = {
  gameObjects: {
    hero: new Person({
      isPlayerControlled: true,
      x: utils.withGrid(5),
      y: utils.withGrid(9)
    }),
    npcB: new Person({
      x: utils.withGrid(10),
      y: utils.withGrid(8),
      talking: [
        {
          events: [
<<<<<<< HEAD
            {type: "textMessage", text: "Lets Battle!", faceHero: "npcA"},
            {type: "battle", faceHero: "npcA"},
=======
            {type: "textMessage", text: "You made it!", faceHero: "npcB"},
            {type: "battle", enemy: "npcB"}
>>>>>>> e73226c58a97210c66ce32b66451fb94a349c67e
          ]
        }
      ]
    })
  },
  cutsceneSpaces: {
    [utils.asGridCoord(5, 10)]: [
      {
        events: [{type: "changeMap", map: "Street"}]
      }
    ]
  }
}
