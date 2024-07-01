export default function PlayerInfo({level}) {
  let enemies = []

  Object.values(level.battle.combatants).forEach((combatant) => {
    if (combatant.team === "enemy") {
      let hpBar = (combatant.hp / combatant.maxHp) * 100

      enemies.push(
        <div
          className="enemy-info"
          key={`${combatant.name},${combatant.maxHp}`}
        >
          <p className="enemy-info-name">{`${combatant.name}`.toUpperCase()}</p>

          <div className="enemy-info-hp">
            <p className="hp-text">{`${combatant.hp}/${combatant.maxHp}`}</p>
            <div className="hp-bar-total"></div>
            <div className="hp-bar-used" style={{width: `${hpBar}%`}}></div>
          </div>
        </div>
      )
    }
  })

  return [enemies]
}
