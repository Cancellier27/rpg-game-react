import BattleMapSprite from "../battle/BattleMapSprite"
import BattleNpcSprite from "../battle/BattleNpcSprite"

export default function BattleScene({level}) {
  const combatants = []
  Object.values(level.battle.combatants).forEach((object) => {
    const sprite = object.sprite

    combatants.push(
      <BattleNpcSprite
        npc={sprite.npc}
        x={sprite.x}
        y={sprite.y}
        isShadow={true}
        frameCoord={sprite.frameCoord}
        key={`${sprite.npc},${sprite.x},${sprite.y}`}
      />
    )
  })

  return (
    <div className="battle-container">
      <BattleMapSprite level={level} />
      {[combatants]}
    </div>
  )
}
