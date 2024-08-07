export default function PlayerInfo({level}) {
  let players = []

  Object.values(level.battle.combatants).forEach((combatant) => {
    if (combatant.team === "player") {
      let xpBar = (combatant.xp / combatant.maxXp) * 100
      let hpBar = (combatant.hp / combatant.maxHp) * 100
      let mpBar = (combatant.mp / combatant.maxMp) * 100

      players.push(
        <div
          className="player-info"
          key={`${combatant.name},${combatant.maxHp}`}
        >
          <div className="player-info-name">
            <p>{`${combatant.name}`.toUpperCase()}</p>
            <div className="xp-bar-total">
              <div className="xp-bar-used" style={{width: `${xpBar}%`}}></div>
            </div>
          </div>

          <div className="player-info-hp">
            <p className="hp-text">{`${combatant.hp}/${combatant.maxHp}`}</p>
            <div className="hp-bar-total"></div>
            <div className="hp-bar-used" style={{width: `${hpBar}%`}}></div>
          </div>

          <div className="player-info-mp">
            <p className="mp-text">{`${combatant.mp}`}</p>
            <div className="mp-bar-total"></div>
            <div className="mp-bar-used" style={{width: `${mpBar}%`}}></div>
          </div>
        </div>
      )
    }
  })

  return [players]
}
