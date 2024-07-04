import "./battle.css"

export default function StatusBoard({level, setIsStatusBoard}) {
  const playerStatus = []
  const enemyStatus = []

  Object.values(level.battle.combatants).forEach((combatant) => {
    if (combatant.team === "player" && combatant.status) {
      playerStatus.push(
        <div className="status-board-player" key={combatant.name}>
          <h3 className="status-board-player-name">{combatant.name}</h3>

          <div className="status-board-player-status">
            <h4>{combatant.status.type}</h4>{" "}
            <h3>{combatant.status.expiresIn}</h3>
          </div>
        </div>
      )
    } else if (combatant.team === "enemy" && combatant.status) {
      enemyStatus.push(
        <div className="status-board-player" key={combatant.name}>
          <h3 className="status-board-player-name">{combatant.name}</h3>

          <div className="status-board-player-status">
            <h4>{combatant.status.type}</h4>{" "}
            <h3>{combatant.status.expiresIn}</h3>
          </div>
        </div>
      )
    }
  })

  if (playerStatus.length > 0) {
    playerStatus.push(
      <div
        style={{
          width: "90%",
          height: "1px",
          background: "var(--menu-border-color)"
        }}
        key={"separator-bar-status-board"}
      ></div>
    )
  }

  return (
    <div className="status-board-container">
      <div className="status-board-title">
        <h3 className="status-board-title-name">Name</h3>
        <h3 className="status-board-title-status">Status</h3>
      </div>

      {[playerStatus]}
      {[enemyStatus]}

      <button
        onClick={() => setIsStatusBoard(false)}
        className="status-board-button"
      >
        Back
      </button>
    </div>
  )
}
