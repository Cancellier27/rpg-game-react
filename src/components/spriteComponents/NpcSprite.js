import "./spritesComponents.css"
import React from "react";
import {useRecoilValue} from "recoil"
import {npcImages} from "../../atoms/npcLevelSpritesImageAtom"
import {currentLevelIdAtom} from "../../atoms/currentLevelIdAtom"
import {useEffect, useRef} from "react"
import {CANVAS_SIZE, CELL_SIZE} from "../../helpers/consts"

function Sprite({npc, x, y, isShadow = true}) {
  // get the map id name used at the moment
  const mapId = useRecoilValue(currentLevelIdAtom)

  // get the shadow image
  const shadowSpriteImage = useRecoilValue(npcImages["shadow"])
  // get the hero image
  const npcSpriteImage = useRecoilValue(npcImages[npc])

  const canvasRef = useRef()

  const coord_X = x * CELL_SIZE - 8
  const coord_Y = y * CELL_SIZE - 18

  useEffect(() => {
     /** @type {HTMLCanvasElement} */
    const canvasEl = canvasRef.current
    const ctx = canvasEl.getContext("2d")

    //Clear out anything in the canvas tag
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)

    //Draw shadow to the canvas
    if(isShadow) {
      ctx.drawImage(shadowSpriteImage, coord_X, coord_Y)
    }

    // Draw npc to the canvas
    ctx.drawImage(
      npcSpriteImage, // Image to pull from
      0, // Left X corner of frame
      0, // Top Y corner of frame
      CELL_SIZE * 2, // width of cut
      CELL_SIZE * 2, // height of cut
      coord_X,
      coord_Y,
      CELL_SIZE * 2, // x scale
      CELL_SIZE * 2 // y scale
    )
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="sprite-canvas"
      width={CANVAS_SIZE.X}
      height={CANVAS_SIZE.Y}
    />
  )
}

const MemoizedSprite = React.memo(Sprite);
export default MemoizedSprite;
