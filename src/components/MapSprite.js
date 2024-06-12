import "./components.css"

import {useEffect, useRef, useState} from "react"
import {CANVAS_SIZE} from "../helpers/consts"

export default function MapSprite({requireImageUrl}) {
  const canvasRef = useRef()

  useEffect(() => {
    const canvasEl = canvasRef.current
    const ctx = canvasEl.getContext("2d")

    //Clear out anything in the canvas tag
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)

    const image = new Image()

    image.onload = () => {
      ctx.drawImage(
        image, // Image to pull from
        0, // Left X corner of frame
        0 // Top Y corner of frame
      )
    }

    image.src = requireImageUrl
  }, [])

  return (
    <canvas
      className="game-canvas"
      width={CANVAS_SIZE.X}
      height={CANVAS_SIZE.Y}
      ref={canvasRef}
    />
  )
}
