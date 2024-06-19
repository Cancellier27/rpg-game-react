import "./components.css"
import {useEffect, useState, useRef} from "react"
import {useRecoilState, useRecoilValue} from "recoil"
import {currentLevelIdAtom} from "../../atoms/currentLevelIdAtom"
import {OverWorld} from "../../classes/OverWorld"

import MapSpriteLower from "../spriteComponents/MapSpriteLower"
import MapSpriteUpper from "../spriteComponents/MapSpriteUpper"
import NpcsPlacementTiles from "./NpcsPlacementTiles"

export default function RenderLevel() {
  const [level, setLevel] = useState(null)
  const [currentLevelId, setCurrentLevelId] = useRecoilState(currentLevelIdAtom)
  const canvasRef = useRef()

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

  return (
    <div className="overWorld-container">
      {/* Lower layer to be rendered */}
      <MapSpriteLower level={level} />
      <div>
        {/* mid layer */}
        <NpcsPlacementTiles level={level} canvasRef={canvasRef} />
      </div>
      {/* top layer to be rendered */}
      <MapSpriteUpper level={level} />
    </div>
  )
}
