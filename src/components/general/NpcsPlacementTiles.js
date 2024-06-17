import NpcSprite from "../spriteComponents/NpcSprite"

export default function NpcsPlacementTiles({level}) {
  // get all gameObjects created
  const gameObjects = level.gameObjects
  // canvas array
  const canvases = []

  // push to the canvases array NpcSprite components with the right data from the gameObjects
  Object.values(gameObjects).forEach((obj) => {
    canvases.push(
      <NpcSprite
        key={`${obj.x}_${obj.y}_${obj.id}`}
        npc={obj.id}
        x={obj.x}
        y={obj.y}
      />
    )
  })

  // render
  return <div>{canvases}</div>
}
