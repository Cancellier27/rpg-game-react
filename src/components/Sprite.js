import "./components.css"

import {useEffect, useRef, useState} from "react"
import {
  CANVAS_SIZE,
  CELL_SIZE,
  X_ADJUSTMENT,
  Y_ADJUSTMENT
} from "../helpers/consts"

export default function Sprite({frameCoord, size, requireImageUrl, isShadow}) {
  const canvasRef = useRef()

  useEffect(() => {
    const canvasEl = canvasRef.current
    const ctx = canvasEl.getContext("2d")

    //Clear out anything in the canvas tag
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)

    //Draw a graphic to the canvas tag
    const x = frameCoord[0] * CELL_SIZE - X_ADJUSTMENT
    const y = frameCoord[1] * CELL_SIZE - Y_ADJUSTMENT

    const image = new Image()
    const shadow = new Image()

    image.onload = () => {
      isShadow && ctx.drawImage(shadow, x, y)

      ctx.drawImage(
        image, // Image to pull from
        0, // Left X corner of frame
        0, // Top Y corner of frame
        size, //How much to crop from the sprite sheet (X)
        size, //How much to crop from the sprite sheet (Y)
        x, //Where to place this on canvas tag X (0)
        y, //Where to place this on canvas tag Y (0)
        size, //How large to scale it (X)
        size //How large to scale it (Y)
      )
    }

    shadow.src = require("../images/characters/shadow.png")
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
