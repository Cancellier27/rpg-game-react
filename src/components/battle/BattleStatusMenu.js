import "./battle.css"
import PlayerInfo from "./PlayerInfo"
import EnemyInfo from "./EnemyInfo"
import StatusBoard from "./StatusBoard"
import {useState} from "react"

export default function BattleStatusMenu({level}) {
  const [isStatusBoard, setIsStatusBoard] = useState(false)
  const [isAttack, setIsAttack] = useState(true)

  function onClickStatusHandler() {
    return isStatusBoard ? setIsStatusBoard(false) : setIsStatusBoard(true)
  }

  return (
    <div className="battle-status-menu">
      {isStatusBoard && (
        <StatusBoard setIsStatusBoard={setIsStatusBoard} level={level} />
      )}

      {isAttack && (
        <div className="attack-list-container">
          <div
            className="attack-list-close-click"
            onClick={() => setIsAttack(false)}
          ></div>
          <div className="attack-list">
            <div>Attack 1</div>
            <div>Attack 2</div>
            <div>Attack 3</div>
            <div>Attack 4</div>
            <div>Attack 5</div>
            <div>Attack 6</div>
            <div>Attack 7</div>
            <div>Attack 8</div>
          </div>
        </div>
      )}

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
        <div>
          <div className="menu-option" onClick={() => setIsAttack(true)}>
            Attack
          </div>
          <div className="menu-option">Items</div>
        </div>
        <div>
          <div className="menu-option" onClick={onClickStatusHandler}>
            Status
          </div>
          <div className="menu-option">Escape</div>
        </div>
      </div>
    </div>
  )
}
