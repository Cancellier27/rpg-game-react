import {useEffect, useRef, useState} from "react"
import "./OverWorld.css"

import Sprite from "./components/Sprite"
import MapSprite from "./components/MapSprite"
import {GameObject} from "./GameObjects/GameObject"

export default function OverWorld() {
  const [gameObjects, setGameObjects] = useState([])

  useEffect(() => {
    const map1 = new GameObject({
      type: "map",
      src: require("./images/maps/DemoLower.png")
    })

    const hero = new GameObject({
      x: 5,
      y: 6
    })

    const npc1 = new GameObject({
      x: 6,
      y: 7,
      src: require("./images/characters/people/npc1.png")
    })

    setGameObjects([
      ...gameObjects,
      map1.getState(),
      hero.getState(),
      npc1.getState()
    ])
  }, [])

  if (!gameObjects) {
    return null
  }

  console.log(gameObjects)

  return (
    <>
      {gameObjects.map((sprite) => {
        if (sprite.type === "map") {
          return <MapSprite requireImageUrl={sprite.requireImageUrl} key={1} />
        } else {
          return (
            <Sprite
              frameCoord={sprite.frameCoord}
              size={sprite.size}
              requireImageUrl={sprite.requireImageUrl}
              key={2}
            />
          )
        }
      })}
    </>
  )
}
