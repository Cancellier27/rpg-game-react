import {Actions} from "../../Content/Actions"

export default function AttackOptions({level, setIsAttack}) {
  const attacks = level.battle.combatants["player1"].actions.map((attack) => {
    return <div key={Actions[attack].name} >{Actions[attack].name}</div>
  })

  if (attacks.length < 8) {
    for (let i = 8 - attacks.length; i > 0; i--) {
      attacks.push(<div key={`placeholder-attack-${i}`}>-</div>)
    }
  }

  return (
    <div className="attack-list-container">
      <div
        className="attack-list-close-click"
        onClick={() => setIsAttack(false)}
      ></div>

      <div className="attack-list">
        {[attacks]}
      </div>
      
    </div>
  )
}
