import {GameObject} from "../classes/GameObject"

export const DemoRoom = {
  gameObjects: {
    hero: new GameObject({
      x: 5,
      y: 6,
      isPlayerControlled: true
    }),
    npc1: new GameObject({
      x: 7,
      y: 9
    })
  }
}
