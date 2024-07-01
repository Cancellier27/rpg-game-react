export const EnemyType = {
  normal: "normal",
  elite: "elite",
  boss: "boss"
}

export const Enemies = {
  n001: {
    name: "Hailey",
    classId: "hailey-enemy",
    type: EnemyType.normal,
    icon: null,
    sprite: {
      npc: "npcA",
      x: 8,
      y: 2,
      frameCoord: [0, 3]
    },
    actions: ["damage1"]
  },
  e001: {
    name: "Filipe",
    classId: "filipe-enemy",
    type: EnemyType.elite,
    icon: null,
    sprite: {
      npc: "npcC",
      x: 9,
      y: 1,
      frameCoord: [0, 3]
    },
    actions: ["damage1"]
  }
}
