import "./components.css"
import {useEffect, useState} from "react"
import {useRecoilState} from "recoil"
import {currentLevelIdAtom} from "../../atoms/currentLevelIdAtom"
import {OverWorld} from "../../classes/OverWorld"

import ExploringScene from "./ExploringScene"
import BattleScene from "./BattleScene"

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

  return <>
  {!level.isBattle && <ExploringScene level={level} />}
  {level.isBattle && <BattleScene level={level}/> }
  </>
}
