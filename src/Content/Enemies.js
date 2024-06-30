export const EnemyType = {
  normal: "normal",
  elite: "elite",
  boss: "boss"
}

export const Enemies = {
  n001: {
    name: "Hailey",
    type: EnemyType.normal,
    icon: null,
    sprite: {
      npc: "npcA",
      x: 8,
      y: 2,
      frameCoord: [0, 3]
    }
  },
  e001: {
    name: "Filipe",
    type: EnemyType.elite,
    icon: null,
    sprite: {
      npc: "npcC",
      x: 9,
      y: 1,
      frameCoord: [0, 3]
    }
  }
}