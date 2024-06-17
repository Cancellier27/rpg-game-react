import {GameObject} from "../classes/GameObject"

export const Kitchen = {
  gameObjects: {
    hero: new GameObject({
      isPlayerControlled: true,
      x: 5,
      y: 5
    }),
    npc2: new GameObject({
      x: 10,
      y: 8
    })
  }
}
