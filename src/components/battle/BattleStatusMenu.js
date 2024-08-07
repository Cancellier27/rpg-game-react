import "./battle.css"
import PlayerInfo from "./PlayerInfo"
import EnemyInfo from "./EnemyInfo"
import StatusBoard from "./StatusBoard"
import {useEffect, useState} from "react"
import {KeyPressListener} from "../../classes/KeyPressListener"
import AttackOptions from "./AttackOptions"
import ItemOptions from "./ItemOptions"
import BattleMenuButtons from "./BattleMenuButtons"

export default function BattleStatusMenu({level}) {
  const [isStatusBoard, setIsStatusBoard] = useState(false)
  const [isAttack, setIsAttack] = useState(false)
  const [isItem, setIsItem] = useState(false)

  function onClickStatusHandler() {
    return isStatusBoard ? setIsStatusBoard(false) : setIsStatusBoard(true)
  }

  function onEscapeHandler() {
    level.battle.onComplete()
  }

  useEffect(() => {
    let prevFocus
 
    document.querySelectorAll(".menu-arrow-selector").forEach((button) => {
      button.addEventListener("mouseenter", () => {
        button.focus()
      })
      button.addEventListener("focus", () => {
        prevFocus = button
        // descriptionElementText.innerText = button.dataset.description;
      })
    })

    setTimeout(() => {
      document.querySelector(".menu-arrow-selector")?.focus()
    }, 10)

    const keyPressUp = new KeyPressListener("ArrowUp", () => {
      const current = Number(prevFocus.getAttribute("data-button"))
      const prevButton = Array.from(
        document.querySelectorAll("button[data-button]")
      ).find((el) => {
        return Number(el.dataset.button) === current - 1
      })
      prevButton?.focus()
    })
    const keyPressDown = new KeyPressListener("ArrowDown", () => {
      const current = Number(prevFocus.getAttribute("data-button"))
      const nextButton = Array.from(
        document.querySelectorAll("button[data-button]")
      ).find((el) => {
        return Number(el.dataset.button) === current + 1
      })
      nextButton?.focus()
    })
    const keyPressLeft = new KeyPressListener("ArrowLeft", () => {
      const current = Number(prevFocus.getAttribute("data-button"))
      const nextButton = Array.from(
        document.querySelectorAll("button[data-button]")
      ).find((el) => {
        return Number(el.dataset.button) === current - 4
      })
      nextButton?.focus()
    })
    const keyPressRight = new KeyPressListener("ArrowRight", () => {
      const current = Number(prevFocus.getAttribute("data-button"))
      const nextButton = Array.from(
        document.querySelectorAll("button[data-button]")
      ).find((el) => {
        return Number(el.dataset.button) === current + 4
      })
      nextButton?.focus()
    })

    // remove event listener if components unmounts
    return () => {
      keyPressUp.unbind()
      keyPressDown.unbind()
      keyPressLeft.unbind()
      keyPressRight.unbind()
    }
  }, [isAttack, isItem, level.OWMap.isPlayerChoosing ])

  return (
    <div className="battle-status-menu">
      {isStatusBoard && (
        <StatusBoard setIsStatusBoard={setIsStatusBoard} level={level} />
      )}

      {isAttack && <AttackOptions level={level} setIsAttack={setIsAttack} />}
      {isItem && <ItemOptions level={level} setIsItem={setIsItem} />}

      {/* Player */}
      <div className="player-status">
        <div className="player-title">
          <p className="player-title-name">PARTY</p>
          <p className="player-title-hp">HP</p>
          <p className="player-title-mp">MP</p>
        </div>
        <PlayerInfo level={level} />
      </div>

      {/* Enemies */}
      <div className="enemy-status">
        <div className="enemy-title">
          <p className="enemy-title-name">ENEMY</p>
          <p className="enemy-title-hp">HP</p>
        </div>
        <EnemyInfo level={level} />
      </div>

      {/* Menu */}
      <div className="menu">
      {!isAttack && !isItem && (
          <BattleMenuButtons
            level={level}
            setIsAttack={setIsAttack}
            setIsItem={setIsItem}
            onClickStatusHandler={onClickStatusHandler}
            onEscapeHandler={onEscapeHandler}
          />
        )}
        </div>
    </div>
  )
}
