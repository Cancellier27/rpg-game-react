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
  const currentLevelId = useRecoilValue(currentLevelIdAtom)

  let num = 0
  useEffect(() => {
    let levelState = {}
    // Create and subscribe to state changes
    if(num === 1) {
      levelState = new OverWorld(currentLevelId, (newState) => {
        setLevel(newState)
      })
  
      //Get initial state
      setLevel(levelState.getState())
      
      return () => {
        levelState.destroy()
      }
    }

    num += 1

    if(num === 2) {
      num = 0
    }

    //Destroy method when this component unmounts for cleanup
    

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
        <NpcsPlacementTiles level={level} />
      </div>
      {/* top layer to be rendered */}
      <MapSpriteUpper level={level} />
    </div>
  )
}
