import "./OverWorld.css"

import baseImg from "./images/maps/DemoLower.png"
import heroPng from "./images/characters/people/hero.png"
import shadowPng from "./images/characters/shadow.png"

function OverWorld() {
  return (
    <div className="game-canvas" width={352} height={198}>
      <img
        src={baseImg}
        style={{
          position: "absolute",
          top: "0px",
          left: "0px"
        }}
      />

      <div
        style={{
          position: "absolute",
          height: "32px",
          width: "32px",
          top: "78px",
          left: "72px",
          overflow: "hidden",
        }}
      >
        <img
          src={shadowPng}
          style={{
            position: "absolute",
            top: "0px",
            left: "0px"
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          height: "32px",
          width: "32px",
          top: "78px",
          left: "72px",
          overflow: "hidden",
          // outline: "1px solid red"
        }}
      >
        <img
          src={heroPng}
          style={{
            position: "absolute",
            top: "0px",
            left: "0px"
          }}
        />
      </div>
    </div>
  )
}
export default OverWorld
