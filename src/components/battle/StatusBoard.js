import {useEffect} from "react"
import "./battle.css"

function player(combatant) {
  return (
    <div>
      <p>{combatant.combatant.name}</p>
      <div>
        <p>{combatant.combatant.status.type}</p>{" "}
        <p>{combatant.combatant.status.expiresIn}</p>
      </div>
    </div>
  )
}

export default function StatusBoard({level, setIsStatusBoard}) {
  // const status = []

  // useEffect(() => {
  //   const players = level.battle.combatants

  //   Object.values(players).forEach((combatant) => {
  //     if (combatant.team === "player") {
  //       status.push(<Test combatant={combatant} />)
  //     }
  //   })
  // }, [level])

  return (
    <div className="status-board-container">
      {/* {[status]}
      <Test combatant={level.battle.combatants["player1"]} /> */}
      <div className="status-board-title">
        <h3 className="status-board-title-name">Name</h3>
        <h3 className="status-board-title-status">Status</h3>
      </div>


      <div className="status-board-player">
        <h3 className="status-board-player-name" >Hero</h3>

        <div className="status-board-player-status">
          <h4>Sleepy</h4>{" "}
          <h3>3</h3>
        </div>

      </div>

      <button onClick={() => setIsStatusBoard(false)} className="status-board-button">Back</button>
    </div>
  )
}
