import {useEffect, useState} from "react"
import "./components.css"

// React components
import Sprite from "./Sprite"
import MapSprite from "./MapSprite"
import TextBalloon from "./TextBalloon"

// Classes
import {overWorldMap, directionInput, map} from "../GameObjects/classes"
import {KeyPressListener} from "../GameObjects/KeyPressListener"
import {OVERWORLD_MAPS} from "../helpers/maps"

export default function OverWorld() {
  const [levelData, setLevelData] = useState(OVERWORLD_MAPS[`${overWorldMap.map}`])
  const [mapLower, setMapLower] = useState(null)
  const [mapUpper, setMapUpper] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [cameraPerson, setCameraPerson] = useState(null)
  const [gameObjects, setGameObjects] = useState([])
  const [isMessageDisplayed, setIsMessageDisplayed] = useState(false)

  useEffect(() => {
    // setoverWorldMap(overWorldMap)
    // setLevelData(OVERWORLD_MAPS[`${overWorldMap.map}`])
    console.log("go")
    startGameLoop()
    return  () => {

    }
  }, [])

  function gameLoopStepWork(delta) {
    Object.values(map.gameObjects).forEach((object) => {
      object.update({
        delta, // timeStamp variable to maybe use on characters
        arrow: directionInput.direction,
        map: overWorldMap
      })
    })

    // set camera person - hero
    setCameraPerson(map.gameObjects.hero)

    // create an iterable array to get the objects elements
    let gameObjectsArray = Object.values(map.gameObjects).map((object) =>
      object.getState()
    )
    // sort the array to be in Y order of rendering
    gameObjectsArray.sort((a, b) => {
      return a.frameCoord[1] - b.frameCoord[1]
    })

    setMapLower(map.lowerSrc)
    setMapUpper(map.upperSrc)
    setGameObjects(gameObjectsArray)
    setIsLoaded(true)
  }

  function startGameLoop() {
    // create dynamic overWorldMap for the npcs and for the hero when he moves
    directionInput.init()
    overWorldMap.mountObjects()
    bindActionInput()
    bindHeroPositionCheck()
    let previousMs
    const step = 1 / 60 // setting to 60 fps for all refresh rates
    
    // console.log(map)
    // console.log(map.gameObjects)
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

  function bindActionInput() {
    new KeyPressListener("Enter", () => {
      // Is there anyone to talk here?
      overWorldMap.checkForActionCutscene(setIsMessageDisplayed)
    })
  }

  function bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", (event) => {
      if (event.detail.whoId === "hero") {
        // Hero's positing changed
        overWorldMap.checkForFootstepCutscene(setIsMessageDisplayed)
      }
    })
  }

  return (
    <div className="overWorld-container">
      {/* draw lower layer map */}
      {isLoaded && (
        <div className="overWorld-map-lower">
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
        <div className="overWorld-map-upper">
          <MapSprite
            requireImageUrl={mapUpper}
            cameraPerson={cameraPerson}
            key={"upper"}
          />
        </div>
      )}

      {isMessageDisplayed && (
        <TextBalloon setIsMessageDisplayed={setIsMessageDisplayed} />
      )}
    </div>
  )
}
