import "./spritesComponents.css"
import {utils} from "../../helpers/utils"
import {useEffect, useRef} from "react"
import {useRecoilValue} from "recoil"
import {lowerMapsImages} from "../../atoms/mapLevelSpritesImageAtom"
import {currentLevelIdAtom} from "../../atoms/currentLevelIdAtom"
import {CANVAS_SIZE} from "../../helpers/consts"

export default function MapSprite({level}) {
  // get the map id name used at the moment
  const mapId = useRecoilValue(currentLevelIdAtom)

  // get the map image based on the map id
  const mapSpriteImage = useRecoilValue(lowerMapsImages[mapId])

  const canvasRef = useRef()

  useEffect(() => {
    /** @type {HTMLCanvasElement} */
    const canvasEl = canvasRef.current
    const ctx = canvasEl.getContext("2d")
    // const cameraPerson = level.gameObjects.hero

    //Clear out anything in the canvas tag
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)

    ctx.drawImage(
      mapSpriteImage, // Image to pull from
      0,
      0
      // utils.withGrid(10.5) // Left X corner of frame
      // utils.withGrid(6) // Top Y corner of frame
    )
  }, [mapSpriteImage])

  return (
    <canvas
      ref={canvasRef}
      className="map-canvas"
      width={CANVAS_SIZE.X}
      height={CANVAS_SIZE.Y}
    />
  )
}
