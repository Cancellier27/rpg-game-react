export const PlayerType = {
  main: "main",
  partyMember: "partyMember"
}

export const Players = {
  hero: {
    name: "Hero",
    classId: "hero-player",
    type: PlayerType.main,
    icon: null,
    sprite: {
      npc: "hero",
      x: 1,
      y: 2,
      frameCoord: [0, 1]
    },
    actions: ["damage1"]
  }
}