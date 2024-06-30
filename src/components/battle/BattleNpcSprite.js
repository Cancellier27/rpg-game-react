// import "./spritesComponents.css"
import React from "react"
import {useRecoilValue} from "recoil"
import {npcImages} from "../../atoms/npcLevelSpritesImageAtom"
import {useEffect, useRef} from "react"
import {
  CANVAS_SIZE,
  CELL_SIZE,
  X_ADJUSTMENT,
  Y_ADJUSTMENT
} from "../../helpers/consts"
import {utils} from "../../helpers/utils"

function Sprite({level, npc, x, y, isShadow, frameCoord}) {
  // get the shadow image
  const shadowSpriteImage = useRecoilValue(npcImages["shadow"])
  // get the hero image
  const npcSpriteImage = useRecoilValue(npcImages[npc])

  const canvasRef = useRef()

  useEffect(() => {
    /** @type {HTMLCanvasElement} */
    // Sprite frame coordinate
    const frame_X = Number(frameCoord[0])
    const frame_Y = Number(frameCoord[1])

    // screen position, to make the screen centralized
    const coord_X = utils.withGridBattle(x) - 16
    const coord_Y = utils.withGridBattle(y)

    const canvasEl = canvasRef.current
    const ctx = canvasEl.getContext("2d")

    //Clear out anything in the canvas tag
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)

    //Draw shadow to the canvas
    if (isShadow) {
      ctx.drawImage(
        shadowSpriteImage,
        coord_X,
        coord_Y,
        CELL_SIZE * 4,
        CELL_SIZE * 4
      )
    }

    // Draw npc to the canvas
    ctx.drawImage(
      npcSpriteImage, // Image to pull from
      frame_X * CELL_SIZE * 2, // Left X corner of frame
      frame_Y * CELL_SIZE * 2, // Top Y corner of frame
      CELL_SIZE * 2, // width of cut
      CELL_SIZE * 2, // height of cut
      coord_X,
      coord_Y,
      CELL_SIZE * 4, // x scale
      CELL_SIZE * 4 // y scale
    )
    // makes the image look sharp
    ctx.imageSmoothingEnabled = false
  }, [npcSpriteImage, frameCoord, x, y])

  return (
    <canvas
      ref={canvasRef}
      className="sprite-canvas"
      width={CANVAS_SIZE.X}
      height={CANVAS_SIZE.Y}
    />
  )
}

const MemoizedSprite = React.memo(Sprite)
export default MemoizedSprite
