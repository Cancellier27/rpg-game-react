import {useEffect, useRef, useState} from "react"
import "./OverWorld.css"

// import baseImg from "./images/maps/DemoLower.png"

export default function OverWorld() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    const image = new Image()

    image.onload = () => {
      context.drawImage(image, 0, 0)
    }

    image.src = require("./images/maps/DemoLower.png")
  }, [])

  return <canvas ref={canvasRef} width={352} height={198}></canvas>
}
