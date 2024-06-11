import "./OverWorld.css"

import baseImg from "./images/maps/DemoLower.png"
import GameObject from "./components/GameObject"

function OverWorld() {
  return (
    // "canvas" zone
    <div className="game-canvas" width={352} height={198}>
      {/* static map image */}
      <img className="base-img" src={baseImg} />

      {/* Hero png */}
      <GameObject
        x={5}
        y={6}
        src={require("./images/characters/people/hero.png")}
      />

      {/* npc1 png */}
      <GameObject
        x={7}
        y={9}
        src={require("./images/characters/people/npc1.png")}
      />
    </div>
  )
}
export default OverWorld
