import {Actions} from "../../Content/Actions"
import {KeyPressListener} from "../../classes/KeyPressListener"
import {useEffect} from "react"

export default function AttackOptions({level, setIsAttack}) {
  useEffect(() => {
    // close the dialog if press escape button
    const keyEscape = new KeyPressListener("Escape", () => setIsAttack(false))

    // remove event listener if components unmounts
    return () => {
      keyEscape.unbind()
    }
  }, [])

  const attacks = level.battle.combatants["player1"].actions.map(
    (attack, index) => {
      return (
        <button
          className="menu-arrow-selector"
          key={Actions[attack].name}
          data-button={index}
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
