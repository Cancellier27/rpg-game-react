import {useEffect, useRef, useState} from "react"
import {OVERWORLD_MAPS} from "./helpers/maps"
import "./OverWorld.css"

// React components
import Sprite from "./components/Sprite"
import MapSprite from "./components/MapSprite"

// Classes
import { DirectionInput } from "./GameObjects/DirectionInput"

export default function OverWorld() {
  const [levelData, setLevelData] = useState(null)
  const [mapLower, setMapLower] = useState(null)
  const [mapUpper, setMapUpper] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [gameObjects, setGameObjects] = useState([])

  useEffect(() => {
    setLevelData(OVERWORLD_MAPS.DemoRoom)

    // starts gameloop when component mounts
    if (levelData) {
      startGameLoop()
    }
  }, [levelData])


  function startGameLoop() {
    const fps = 60

    const directionInput = new DirectionInput()
    directionInput.init()

    const step = () => {


      let gameObjectsArray = Object.values(levelData.gameObjects).map(
        (object) => object.getState()
      )

      Object.values(levelData.gameObjects).forEach((object) => {
        object.update({
          arrow: directionInput.direction
        })
      })

      setMapLower(levelData.lowerSrc)
      setMapUpper(levelData.upperSrc)
      setGameObjects(gameObjectsArray)
      setIsLoaded(true)

      setTimeout(() => {
        requestAnimationFrame(() => {
          step()
        })
      }, 1000 / fps)
    }

    step()
  }

  return (
    <>
    {/* draw lower layer map */}
      {isLoaded && (
        <div className="map-lower" style={{zIndex: 0}}>
          <MapSprite requireImageUrl={mapLower} key={"Lower"} />
        </div>
      )}

{/* draw characters */}
      {isLoaded &&
        gameObjects.map((object) => {
          return (
            <Sprite
              frameCoord={object.frameCoord}
              size={object.size}
              requireImageUrl={object.requireImageUrl}
              isShadow={object.shadow}
              animation={object.animation}
              cameraPerson={levelData.gameObjects.hero}
              key={object.frameCoord}
            />
          )
        })}

{/* draw upper layer map */}
      {isLoaded && (
        <div className="map-upper" style={{zIndex: 20}}>
          <MapSprite requireImageUrl={mapUpper} key={"upper"} />
        </div>
      )}
    </>
  )
}
