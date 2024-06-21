import "./components.css"
import {useEffect, useState} from "react"
import {useRecoilState} from "recoil"
import {currentLevelIdAtom} from "../../atoms/currentLevelIdAtom"
import {OverWorld} from "../../classes/OverWorld"

import MapSpriteLower from "../spriteComponents/MapSpriteLower"
import MapSpriteUpper from "../spriteComponents/MapSpriteUpper"
import NpcsPlacementTiles from "./NpcsPlacementTiles"
import TextBalloon from "../hud/TextBalloon"

export default function RenderLevel() {
  const [level, setLevel] = useState(null)
  const [currentLevelId, setCurrentLevelId] = useRecoilState(currentLevelIdAtom)

  let num = 0
  useEffect(() => {
    // Create and subscribe to state changes
    if (num === 1) {
      const levelState = new OverWorld(currentLevelId, (newState) => {
        setLevel(newState)
      })

      //Get initial state
      setLevel(levelState.getState())

      //Destroy method when this component unmounts for cleanup
      return () => {
        levelState.destroy()
      }
    }

    num += 1

    if (num === 2) {
      num = 0
    }
  }, [setCurrentLevelId])

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
      {/* text Message */}
      <TextBalloon level={level} />
    </div>
  )
}
