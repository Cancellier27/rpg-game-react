import { utils } from "../helpers/utils"
import { Person } from "../GameObjects/Person"

export const Kitchen = {
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