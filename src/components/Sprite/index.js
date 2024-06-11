import {useState} from "react"
import "./Sprite.css"

export default function Sprite(props) {
  const [animations, setAnimations] = useState(
    props.animations || {idleDown: [[0, 0]]}
  )
  const [currentAnimation, setCurrentAnimation] = useState(
    props.currentAnimation || "idleDown"
  )
  const [currentAnimationFrame, setCurrentAnimationFrame] = useState(0)
  const [coordinates, setCoordinates] = useState({
    x: props.coordinates.x * 16 - 8,
    y: props.coordinates.y * 16 - 18
  })

  return (
    <div
      className="npc-container"
      // location of the characters on screen
      style={{
        left: `${coordinates.x}px`,
        top: `${coordinates.y}px`
      }}
    >
      {/* Shadow image */}
      <img
        className="shadow-img"
        // to move the image
        src={require("../../images/characters/shadow.png")}
        // style={{
        //   top: "0px",
        //   left: "0px"
        // }}
      />

      {/* Character image */}
      <img
        className="npc-img"
        src={props.src}
        // to move the character
        // style={{
        //   top: "0px",
        //   left: "0px"
        // }}
      />
    </div>
  )
}
