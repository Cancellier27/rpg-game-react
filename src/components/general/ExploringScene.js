import FadeIn from "../hud/FadeIn"
import FadeOut from "../hud/FadeOut"
import MapSpriteLower from "../spriteComponents/MapSpriteLower"
import MapSpriteUpper from "../spriteComponents/MapSpriteUpper"
import NpcsPlacementTiles from "./NpcsPlacementTiles"
import TextBalloon from "../hud/TextBalloon"

export default function ExploringScene({level}) {
  return (
    <div className="overWorld-container">
      {/* fades the screen when the map changes */}
      {level.isFadeIn && <FadeIn />}
      {level.isFadeOut && <FadeOut />}
      {/* Lower layer to be rendered */}
      <MapSpriteLower level={level} />
      <div>
        {/* mid layer */}
        <NpcsPlacementTiles level={level} />
      </div>
      {/* top layer to be rendered */}
      <MapSpriteUpper level={level} />
      {/* text Message */}
      <TextBalloon level={level} />
    </div>
  )
}
