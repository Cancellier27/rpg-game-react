import "./battle.css"

export default function BattleStatusMenu() {
  return (
    <div className="battle-status-menu">
      <div className="player-status">
        <div className="player-title">
          <p className="player-title-name">PARTY</p>
          <p className="player-title-hp">HP</p>
          <p className="player-title-mp">MP</p>
        </div>

        <div className="player-info">
          <p className="player-info-name">HERO</p>

          <div className="player-info-hp">
            <p className="hp-text">50/50</p>
            <div className="hp-bar-total"></div>
            <div className="hp-bar-used" style={{width: "80%"}}></div>
          </div>

          <div className="player-info-mp">
            <p className="mp-text">100</p>
            <div className="mp-bar-total"></div>
            <div className="mp-bar-used" style={{width: "50%"}}></div>
          </div>
        </div>
      </div>
      <div className="enemy-status">
        <div className="enemy-title">
          <p className="enemy-title-name">ENEMY</p>
          <p className="enemy-title-hp">HP</p>
        </div>

        <div className="enemy-info">
          <div className="enemy-info-name">NpcA</div>
          <div className="enemy-info-hp">
            <p className="hp-text">50/50</p>
            <div className="hp-bar-total"></div>
            <div className="hp-bar-used" style={{width: "30%"}}></div>
          </div>
        </div>
      </div>
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
