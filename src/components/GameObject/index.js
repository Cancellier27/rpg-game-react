import "./GameObject.css"

import Sprite from "../Sprite"
import {useState} from "react"

export default function GameObject(props) {
  const [coordinates, setCoordinates] = useState({
    x: props.x || 0,
    y: props.y || 0
  })

  return <Sprite coordinates={coordinates} src={props.src} />
}
