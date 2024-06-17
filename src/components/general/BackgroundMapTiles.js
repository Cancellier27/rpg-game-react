import MapSpriteLower from "../spriteComponents/MapSpriteLower"
import MapSpriteUpper from "../spriteComponents/MapSpriteUpper"

export default function BackgroundMapTiles({level}) {
  return (
    <div>
      <MapSpriteLower className="map-lower" level={level} />
      <MapSpriteUpper className="map-upper" level={level} />
    </div>
  )
}
