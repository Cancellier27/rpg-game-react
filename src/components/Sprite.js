import "./components.css"

import {useEffect, useRef, useState} from "react"
import {
  CANVAS_SIZE,
  CELL_SIZE,
  X_ADJUSTMENT,
  Y_ADJUSTMENT
} from "../helpers/consts"

export default function Sprite({frameCoord, size, requireImageUrl}) {
  const canvasRef = useRef()

  useEffect(() => {
    const canvasEl = canvasRef.current
    const ctx = canvasEl.getContext("2d")

    //Clear out anything in the canvas tag
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)

    //Draw a graphic to the canvas tag
    const tileSheetX = frameCoord[0]
    const tileSheetY = frameCoord[1]

    const image = new Image()

    image.onload = () => {
      ctx.drawImage(
        image, // Image to pull from
        0, // Left X corner of frame
        0, // Top Y corner of frame
        size, //How much to crop from the sprite sheet (X)
        size, //How much to crop from the sprite sheet (Y)
        tileSheetX * CELL_SIZE - X_ADJUSTMENT, //Where to place this on canvas tag X (0)
        tileSheetY * CELL_SIZE - Y_ADJUSTMENT, //Where to place this on canvas tag Y (0)
        size, //How large to scale it (X)
        size //How large to scale it (Y)
      )
    }

    image.src = requireImageUrl
  }, [frameCoord, size])

  return (
    <canvas
      className="game-canvas"
      width={CANVAS_SIZE.X}
      height={CANVAS_SIZE.Y}
      ref={canvasRef}
    />
  )
}
