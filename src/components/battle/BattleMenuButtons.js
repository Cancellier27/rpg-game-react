export default function BattleMenuButtons({
  level,
  setIsAttack,
  setIsItem,
  onClickStatusHandler,
  onEscapeHandler
}) {
  if (level.OWMap.isPlayerChoosing) {
    return (
      <div>
        <button
          className="menu-arrow-selector menu-option"
          data-button={0}
          onClick={() => setIsAttack(true)}
        >
          Attack
        </button>
        <button
          className="menu-arrow-selector menu-option"
          data-button={4}
          onClick={() => setIsItem(true)}
        >
          Items
        </button>
        <button
          className="menu-arrow-selector menu-option"
          data-button={1}
          onClick={onClickStatusHandler}
        >
          Status
        </button>
        <button 
        className="menu-arrow-selector menu-option" 
        data-button={5}
        onClick={onEscapeHandler}
        >
          Escape
        </button>
      </div>
    )
  } else {
    return (
      <div>
        <button className="menu-option-blocked">Attack</button>
        <button className="menu-option-blocked">Items</button>
        <button className="menu-option-blocked">Status</button>
        <button className="menu-option-blocked">Escape</button>
      </div>
    )
  }
}
