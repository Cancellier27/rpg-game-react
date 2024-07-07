import {Actions} from "../../Content/Actions"
import {KeyPressListener} from "../../classes/KeyPressListener"
import { useEffect, useState } from "react"

export default function AttackOptions({level, setIsAttack}) {
  const [attackList, setAttackList] = useState([])

  useEffect(() => {
    let prevAttackFocus

    document.querySelectorAll(".attack-options").forEach((button) => {
      button.addEventListener("mouseenter", () => {
        button.focus()
      })
      button.addEventListener("focus", () => {
        prevAttackFocus = button
        // descriptionElementText.innerText = button.dataset.description;
      })
    })

    setTimeout(() => {
      document.querySelector(".attack-options").focus()
    }, 10)

    const keyPressUp = new KeyPressListener("ArrowUp", () => {
      const current = Number(prevAttackFocus.getAttribute("data-attack"))
      const nextButton = Array.from(
        document.querySelectorAll("button[data-attack]")
      ).find((el) => {
        return Number(el.dataset.attack) === current - 1
      })
      nextButton?.focus()
    })
    const keyPressDown = new KeyPressListener("ArrowDown", () => {
      const current = Number(prevAttackFocus.getAttribute("data-attack"))
      const nextButton = Array.from(
        document.querySelectorAll("button[data-attack]")
      ).find((el) => {
        return Number(el.dataset.attack) === current + 1
      })
      nextButton?.focus()
    })
    const keyPressLeft = new KeyPressListener("ArrowLeft", () => {
      const current = Number(prevAttackFocus.getAttribute("data-attack"))
      const nextButton = Array.from(
        document.querySelectorAll("button[data-attack]")
      ).find((el) => {
        return Number(el.dataset.attack) === current - 2
      })
      nextButton?.focus()
    })
    const keyPressRight = new KeyPressListener("ArrowRight", () => {
      const current = Number(prevAttackFocus.getAttribute("data-attack"))
      const nextButton = Array.from(
        document.querySelectorAll("button[data-attack]")
      ).find((el) => {
        return Number(el.dataset.attack) === current + 2
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
  }, [])


  const attacks = level.battle.combatants["player1"].actions.map(
    (attack, index) => {
      return (
        <button
          className="attack-options"
          key={Actions[attack].name}
          data-attack={index}
          onClick={() => {
            level.decideFn(attack)
            setIsAttack(false)
          }}
        >
          {Actions[attack].name}
        </button>
      )
    }
  )

  if (attacks.length < 8) {
    for (let i = 8 - attacks.length; i > 0; i--) {
      attacks.push(<button key={`placeholder-attack-${i}`}>-</button>)
    }
  }



  return (
    <div className="attack-list-container">
      <div
        className="attack-list-close-click"
        onClick={() => setIsAttack(false)}
      ></div>

      <div className="attack-list">{[attacks]}</div>
    </div>
  )
}
