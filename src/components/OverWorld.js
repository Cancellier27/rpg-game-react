import {useEffect, useRef, useState} from "react"
import {OVERWORLD_MAPS} from "../helpers/maps"
import "./components.css"

// React components
import Sprite from "./Sprite"
import MapSprite from "./MapSprite"
import TextBalloon from "./TextBalloon"

// Classes
import {DirectionInput} from "../GameObjects/DirectionInput"
import {OverWorldMap} from "../GameObjects/OverWorldMap"
import {textMessageObj} from "../GameObjects/OverWorldEvent"
import { KeyPressListener } from "../GameObjects/KeyPressListener"

export default function OverWorld() {
  const [mapName, setMapName] = useState("DemoRoom")
  const [mapData, setMapData] = useState(null)
  const [levelData, setLevelData] = useState(null)
  const [mapLower, setMapLower] = useState(null)
  const [mapUpper, setMapUpper] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [cameraPerson, setCameraPerson] = useState(null)
  const [gameObjects, setGameObjects] = useState([])
  const [directionInput, setDirectionInput] = useState(null)
  const [isMessageDisplayed, setIsMessageDisplayed] = useState(false)

  useEffect(() => {
    setLevelData(OVERWORLD_MAPS[mapName])
    setMapData(new OverWorldMap({map: mapName}))
    setDirectionInput(new DirectionInput())

    // starts gameloop when both variables are fulfilled
    if (levelData && directionInput && mapData) {
      startGameLoop()
    }
  }, [levelData, mapName])

  function gameLoopStepWork(delta) {
    Object.values(levelData.gameObjects).forEach((object) => {
      object.update({
        delta, // timeStamp variable to maybe use on characters
        arrow: directionInput.direction,
        map: mapData
      })
    })

    // set camera person - hero
    setCameraPerson(levelData.gameObjects.hero)

    // create an iterable array to get the objects elements
    let gameObjectsArray = Object.values(levelData.gameObjects).map((object) =>
      object.getState()
    )
    // sort the array to be in Y order of rendering
    gameObjectsArray.sort((a, b) => {
      return a.frameCoord[1] - b.frameCoord[1]
    })

    setMapLower(levelData.lowerSrc)
    setMapUpper(levelData.upperSrc)
    setGameObjects(gameObjectsArray)
    setIsLoaded(true)
  }

  function startGameLoop() {
    // create dynamic mapData for the npcs and for the hero when he moves
    directionInput.init()
    mapData.mountObjects()
    // mapData.startCutscene(
    //   [
    //     {who: "hero", type: "walk", direction: "down"},
    //     {who: "hero", type: "walk", direction: "down"},
    //     {who: "npcA", type: "walk", direction: "left"},
    //     {who: "npcA", type: "walk", direction: "left"},
    //     {who: "npcA", type: "stand", direction: "up", time: 100},
    //     {type: "textMessage", text: "Hello Thereeeeee!"},
    //     {type: "textMessage", text: "see ya"},
    //     {who: "npcA", type: "walk", direction: "right"},
    //     {who: "npcA", type: "walk", direction: "right"},
    //   ], setIsMessageDisplayed)
    bindActionInput()

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

  function bindActionInput() {
    new KeyPressListener("Enter", () => {
      // Is there anyone to talk here?
      mapData.checkForActionCutscene(setIsMessageDisplayed)
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
        <TextBalloon
          setIsMessageDisplayed={setIsMessageDisplayed}
          textMessageObj={textMessageObj}
        />
      )}
    </div>
  )
}
