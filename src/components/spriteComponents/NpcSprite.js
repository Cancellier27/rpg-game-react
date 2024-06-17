import "./spritesComponents.css"

import {useRecoilValue} from "recoil"
import {npcImages} from "../../atoms/npcLevelSpritesImageAtom"
import {currentLevelIdAtom} from "../../atoms/currentLevelIdAtom"
import {useEffect, useRef} from "react"
import {
  CANVAS_SIZE,
  CELL_SIZE,
} from "../../helpers/consts"

export default function Sprite({level}) {
  // get the map id name used at the moment
  const mapId = useRecoilValue(currentLevelIdAtom)

  // get the shadow image
  const shadowSpriteImage = useRecoilValue(npcImages["shadow"])
  // get the hero image
  const npcSpriteImage = useRecoilValue(npcImages["hero"])

  const canvasRef = useRef()

  useEffect(() => {
    const canvasEl = canvasRef.current
    const ctx = canvasEl.getContext("2d")

    //Clear out anything in the canvas tag
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)

    const x = 5 * CELL_SIZE - 8
    const y = 6 * CELL_SIZE - 18

    //Draw shadow to the canvas
    ctx.drawImage(
      shadowSpriteImage,
      0, // Left X corner of frame
      0, // Top Y corner of frame
      CELL_SIZE * 2, // width of cut
      CELL_SIZE * 2, // height of cut
      x,
      y,
      CELL_SIZE * 2, // x scale
      CELL_SIZE * 2 // y scale
    )

    // Draw npc to the canvas
    ctx.drawImage(
      npcSpriteImage, // Image to pull from
      0, // Left X corner of frame
      0, // Top Y corner of frame
      CELL_SIZE * 2, // width of cut
      CELL_SIZE * 2, // height of cut
      x,
      y,
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
