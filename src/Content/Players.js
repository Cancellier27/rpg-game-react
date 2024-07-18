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
    actions: ["negativeStatus" ,"healingStatus", "damage1"],
    items: [
      {actionId: "item_recoverStatusSmall", instanceId: "p1"},
      {actionId: "item_recoverStatusSmall", instanceId: "p2"},
      {actionId: "item_recoverStatusBig", instanceId: "p1"},
      {actionId: "item_recoverStatusBig", instanceId: "p2"},
      {actionId: "item_recoverStatusBig", instanceId: "p3"},
    ]
  }
}