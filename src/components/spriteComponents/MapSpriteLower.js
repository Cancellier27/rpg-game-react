import "./spritesComponents.css"
import {useEffect, useRef} from "react"
import {useRecoilValue} from "recoil"
import {lowerMapsImages} from "../../atoms/mapLevelSpritesImageAtom"
import {currentLevelIdAtom} from "../../atoms/currentLevelIdAtom"
import {utils} from "../../helpers/utils"
import {CANVAS_SIZE} from "../../helpers/consts"

export default function MapSpriteLower({level}) {
  const canvasRef = useRef()

  const mapId = level.currentLevel
  const mapSpriteImage = useRecoilValue(lowerMapsImages[mapId])

  useEffect(() => {
    /** @type {HTMLCanvasElement} */
    const canvasEl = canvasRef.current
    const ctx = canvasEl.getContext("2d")
    const cameraPerson = level.cameraPerson

    const coord_X = utils.withGrid(10.5) - cameraPerson.x
    const coord_Y = utils.withGrid(6) - cameraPerson.y

    //Clear out anything in the canvas tag
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)

    ctx.drawImage(
      mapSpriteImage, // Image to pull from
      coord_X,
      coord_Y
      // utils.withGrid(10.5) // Left X corner of frame
      // utils.withGrid(6) // Top Y corner of frame
    )
  }, [mapSpriteImage, level, canvasRef])

  return (
    <canvas
      ref={canvasRef}
      className="map-canvas"
      width={CANVAS_SIZE.X}
      height={CANVAS_SIZE.Y}
    />
  )
}
