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
      y: 6,
      shadow: true
    })

    const npc1 = new GameObject({
      x: 4,
      y: 7,
      shadow: true,
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


  return (
    <>
      {gameObjects.map((sprite) => {
        if (sprite.type === "map") {
          return <MapSprite requireImageUrl={sprite.requireImageUrl} key={Date.now()} />
        } else {
          return (
            <Sprite
              frameCoord={sprite.frameCoord}
              size={sprite.size}
              requireImageUrl={sprite.requireImageUrl}
              isShadow={sprite.shadow}
              key={Date.now()}
            />
          )
        }
      })}
    </>
  )
}
