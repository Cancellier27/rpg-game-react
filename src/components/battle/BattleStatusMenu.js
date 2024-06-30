import "./battle.css"
import PlayerInfo from "./PlayerInfo"
import EnemyInfo from "./EnemyInfo"

export default function BattleStatusMenu({level}) {
  return (
    <div className="battle-status-menu">
      {/* Player */}
      <div className="player-status">
        <div className="player-title">
          <p className="player-title-name">PARTY</p>
          <p className="player-title-hp">HP</p>
          <p className="player-title-mp">MP</p>
        </div>
        <div className="player-info">
          <PlayerInfo level={level} />
        </div>
      </div>

      {/* Enemies */}
      <div className="enemy-status">
        <div className="enemy-title">
          <p className="enemy-title-name">ENEMY</p>
          <p className="enemy-title-hp">HP</p>
        </div>

        <div className="enemy-info">
          <EnemyInfo level={level} />
        </div>
      </div>

      {/* Menu */}
      <div className="menu">
        <div>
          <div className="menu-option">Attack</div>
          <div className="menu-option">Magic</div>
        </div>
        <div>
          <div className="menu-option">Items</div>
          <div className="menu-option">Escape</div>
        </div>
      </div>
    </div>
  )
}
