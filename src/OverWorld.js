import {useEffect, useRef, useState} from "react"
import {OVERWORLD_MAPS} from "./helpers/maps"
import "./OverWorld.css"

// React components
import Sprite from "./components/Sprite"
import MapSprite from "./components/MapSprite"

// Classes
import {DirectionInput} from "./GameObjects/DirectionInput"

export default function OverWorld() {
  const [levelData, setLevelData] = useState(null)
  const [mapLower, setMapLower] = useState(null)
  const [mapUpper, setMapUpper] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [cameraPerson, setCameraPerson] = useState(null)
  const [gameObjects, setGameObjects] = useState([])
  const [directionInput, setDirectionInput] = useState(null)

  useEffect(() => {
    setLevelData(OVERWORLD_MAPS.DemoRoom)
    setDirectionInput(new DirectionInput())

    // starts gameloop when both variables are fulfilled
    if (levelData && directionInput) {
      directionInput.init()
      startGameLoop()
    }
  }, [levelData])

  function gameLoopStepWork(delta) {
    Object.values(levelData.gameObjects).forEach((object) => {
      object.update({
        delta, // timeStamp variable to maybe use on characters
        arrow: directionInput.direction
      })
    })

    // set camera person - hero
    setCameraPerson(levelData.gameObjects.hero)

    // create an iterable array to get the objects elements
    let gameObjectsArray = Object.values(levelData.gameObjects).map((object) =>
      object.getState()
    )

    setMapLower(levelData.lowerSrc)
    setMapUpper(levelData.upperSrc)
    setGameObjects(gameObjectsArray)
    setIsLoaded(true)
  }

  function startGameLoop() {
    let previousMs
    const step = 1 / 60 // setting to 60 fps for all refresh rates

    const stepFn = (timeStamp) => {
      if (previousMs === undefined) {
        previousMs = timeStamp
      }

      let delta = (timeStamp - previousMs) / 1000
      while (delta >= step) {
        gameLoopStepWork(delta)
        delta -= step
      }
      previousMs = timeStamp - delta * 1000 // Make sure we don't lose unprocessed (delta) time

      // business as usual tick
      requestAnimationFrame(stepFn)
    }

    // First tick
    requestAnimationFrame(stepFn)
  }

  return (
    <>
      {/* draw lower layer map */}
      {isLoaded && (
        <div className="map-lower" style={{zIndex: 0}}>
          <MapSprite
            requireImageUrl={mapLower}
            cameraPerson={cameraPerson}
            key={"Lower"}
          />
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
              cameraPerson={cameraPerson}
              key={object.frameCoord}
            />
          )
        })}

      {/* draw upper layer map */}
      {isLoaded && (
        <div className="map-upper" style={{zIndex: 20}}>
          <MapSprite
            requireImageUrl={mapUpper}
            cameraPerson={cameraPerson}
            key={"upper"}
          />
        </div>
      )}
    </>
  )
}
