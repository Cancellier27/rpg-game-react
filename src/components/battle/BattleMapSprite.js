// import "../spriteComponents/spritesComponents.css"
import {useEffect, useRef} from "react"
import {useRecoilValue} from "recoil"
import {battleMapsImages} from "../../atoms/battleMapsImageAtom"
import {CANVAS_SIZE} from "../../helpers/consts"

export default function MapSpriteLower({level}) {
  const canvasRef = useRef()

  const mapSpriteImage = useRecoilValue(battleMapsImages[level.battle.battleMap])

  useEffect(() => {
    /** @type {HTMLCanvasElement} */
    const canvasEl = canvasRef.current
    const ctx = canvasEl.getContext("2d")

    //Clear out anything in the canvas tag
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)

    ctx.drawImage(
      mapSpriteImage, // Image to pull from
      0,
      0,
      CANVAS_SIZE.X,
      CANVAS_SIZE.Y
    )

    // makes the image look sharp
    ctx.imageSmoothingEnabled = false
  }, [mapSpriteImage, level, canvasRef])

  return (
    <canvas
      ref={canvasRef}
      className="battle-map-canvas"
      width={CANVAS_SIZE.X}
      height={CANVAS_SIZE.Y}
    />
  )
}
