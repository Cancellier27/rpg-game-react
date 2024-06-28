import FadeIn from "../hud/FadeIn"
import FadeOut from "../hud/FadeOut"
import MapSpriteLower from "../spriteComponents/MapSpriteLower"
import MapSpriteUpper from "../spriteComponents/MapSpriteUpper"
import NpcsPlacementTiles from "./NpcsPlacementTiles"
import TextBalloon from "../hud/TextBalloon"
import BattleMapSprite from "../battle/BattleMapSprite"
import BattleNpcSprite from "../battle/BattleNpcSprite"

export default function BattleScene({level}) {
  return (
    <div className="battle-container">
      <BattleMapSprite level={level} />
      <BattleNpcSprite
        npc={"hero"}
        x={0}
        y={0}
        isShadow={true}
        frameCoord={[0, 2]}
      />
      <BattleNpcSprite
        npc={"npcC"}
        x={4}
        y={0}
        isShadow={true}
        frameCoord={[0, 0]}
      />
    </div>
  )
}
