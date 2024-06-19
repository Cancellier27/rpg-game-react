import "./components.css"
import NpcSprite from "../spriteComponents/NpcSprite"

export default function NpcsPlacementTiles({level}) {
  // get all gameObjects (npcs) created
  const gameObjects = level.gameObjects
  // canvas array
  const canvases = []

  // push to the canvases array NpcSprite components with the right data from the gameObjects
  Object.values(gameObjects).forEach((obj) => {
    const [frameX, frameY] = obj.walking.frame
    const cameraPerson = level.cameraPerson

    canvases.push(
      <NpcSprite
        className="sprite-canvas"
        key={`${obj.x}_${obj.y}_${obj.id}`}
        npc={obj.id}
        x={obj.x}
        y={obj.y}
        frameCoord={[frameX, frameY]}
        isShadow={obj.isShadow}
        cameraPerson={cameraPerson}
        level={level}
      />
    )
  })

  // render
  return <div>{canvases}</div>
}
