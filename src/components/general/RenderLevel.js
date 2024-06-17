import "./components.css"
import {useEffect, useState} from "react"
import {useRecoilState, useRecoilValue} from "recoil"
import {currentLevelIdAtom} from "../../atoms/currentLevelIdAtom"
import {OverWorld} from "../../classes/OverWorld"

import BackgroundMapTiles from "./BackgroundMapTiles"
import NpcsPlacementTiles from "./NpcsPlacementTiles"

export default function RenderLevel() {
  const [level, setLevel] = useState(null)
  const [currentLevelId, setCurrentLevelId] = useRecoilState(currentLevelIdAtom)

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

  function handleGoKitchen() {
    let nextLevel = currentLevelId === "DemoRoom" ? "Kitchen" : "DemoRoom"
    setCurrentLevelId(nextLevel)
  }

  return (
    <>
      <div className="overWorld-container">
        <div className="overWorld-map-lower">
          <BackgroundMapTiles level={level} />
        </div>{" "}
        <div className="overWorld-npcs">
          <NpcsPlacementTiles level={level} />
        </div>
      </div>
      <button style={{zIndex: 50}} onClick={handleGoKitchen}>
        ChangeLevel
      </button>
    </>
  )
}
