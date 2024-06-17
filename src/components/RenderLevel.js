import "./components.css"
import {useEffect, useState} from "react"
import {useRecoilValue} from "recoil"
import {currentLevelIdAtom} from "../atoms/currentLevelIdAtom"
import {OverWorld} from "../Classes/OverWorld"

// React components
// import Sprite from "./Sprite"
import MapSprite from "./MapSprite"
// import TextBalloon from "./TextBalloon"

export default function RenderLevel() {
  const [level, setLevel] = useState(null)
  const currentLevelId = useRecoilValue(currentLevelIdAtom)

  useEffect(() => {
    // Create and subscribe to state changes
    const levelState = new OverWorld(currentLevelId, (newState) => {
      setLevel(newState)
    })

    //Get initial state
    setLevel(levelState.getState())


    //Destroy method when this component unmounts for cleanup
    return () => {
      levelState.destroy()
    }
  }, [currentLevelId])

  if (!level) {
    return null
  }

  // function gameLoopStepWork(delta) {
  //   Object.values(map.gameObjects).forEach((object) => {
  //     object.update({
  //       delta, // timeStamp variable to maybe use on characters
  //       arrow: directionInput.direction,
  //       map: overWorldMap
  //     })
  //   })

  //   // set camera person - hero
  //   setCameraPerson(map.gameObjects.hero)

  //   // create an iterable array to get the objects elements
  //   let gameObjectsArray = Object.values(map.gameObjects).map((object) =>
  //     object.getState()
  //   )
  //   // sort the array to be in Y order of rendering
  //   gameObjectsArray.sort((a, b) => {
  //     return a.frameCoord[1] - b.frameCoord[1]
  //   })

  //   setMapLower(map.lowerSrc)
  //   setMapUpper(map.upperSrc)
  //   setGameObjects(gameObjectsArray)
  //   setIsLoaded(true)
  // }

  // function startGameLoop() {
  //   // create dynamic overWorldMap for the npcs and for the hero when he moves
  //   directionInput.init()
  //   overWorldMap.mountObjects()
  //   bindActionInput()
  //   bindHeroPositionCheck()
  //   let previousMs
  //   const step = 1 / 60 // setting to 60 fps for all refresh rates

  //   // console.log(map)
  //   // console.log(map.gameObjects)
  //   const stepFn = (timeStamp) => {

  //     if (previousMs === undefined) {
  //       previousMs = timeStamp
  //     }

  //     let delta = (timeStamp - previousMs) / 1000
  //     while (delta >= step) {
  //       gameLoopStepWork(delta)
  //       delta -= step
  //     }
  //     previousMs = timeStamp - delta * 1000 // Make sure we don't lose unprocessed (delta) time

  //     // business as usual tick
  //     requestAnimationFrame(stepFn)
  //   }

  //   // First tick
  //   requestAnimationFrame(stepFn)
  // }

  // function bindActionInput() {
  //   new KeyPressListener("Enter", () => {
  //     // Is there anyone to talk here?
  //     overWorldMap.checkForActionCutscene(setIsMessageDisplayed)
  //   })
  // }

  // function bindHeroPositionCheck() {
  //   document.addEventListener("PersonWalkingComplete", (event) => {
  //     if (event.detail.whoId === "hero") {
  //       // Hero's positing changed
  //       overWorldMap.checkForFootstepCutscene(setIsMessageDisplayed)
  //     }
  //   })
  // }

  return (
    <div className="overWorld-container">
      <div className="overWorld-map-lower">
        <MapSprite level={level} />
      </div>{" "}
    </div>
  )
}
