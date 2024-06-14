import "./components.css"

import {useEffect, useRef, useState} from "react"
import {CANVAS_SIZE} from "../helpers/consts"
import {utils} from "../helpers/utils"

export default function MapSprite({requireImageUrl, cameraPerson}) {
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
        utils.withGrid(10.5) - cameraPerson.x, // Left X corner of frame
        utils.withGrid(6) - cameraPerson.y // Top Y corner of frame
      )
    }

    image.src = requireImageUrl
  })

  return (
    <canvas
      className="map-canvas"
      width={CANVAS_SIZE.X}
      height={CANVAS_SIZE.Y}
      ref={canvasRef}
    />
  )
}
