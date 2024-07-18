export const Actions = {
  damage1: {
    name: "Whomp",
    success: [
      {type: "textMessage", text: "{CASTER} uses {ACTION}"},
      {type: "animation", animation: "tackle"},
      {type: "stateChange", damage: 10}
    ],
  },
  healingStatus: {
    name: "Healing",
    targetType: "friendly",
    success: [
      {type: "textMessage", text: "{CASTER} uses {ACTION}"},
      {type: "stateChange", status: {type: "heal", expiresIn: 3}}
    ],
  },
  negativeStatus: {
    name: "Sleeping dash",
    success: [
      {type: "textMessage", text: "{CASTER} uses {ACTION}"},
      {type: "stateChange", status: {type: "sleepy", expiresIn: 2}},
      {type: "textMessage", text: "{TARGET} fell to sleep"},
    ],
  },
  // items
  item_recoverStatusSmall: {
    name: "Small Potion",
    description: "Recovers 10 hp",
    targetType: "friendly",
    success: [
      {type: "textMessage", text: "{CASTER} uses a {ACTION}"},
      {type: "stateChange", recover: 10},
      {type: "textMessage", text: "HP recovered"},
    ],
  },
  item_recoverStatusBig: {
    name: "Big Potion",
    description: "Recovers 100 hp",
    targetType: "friendly",
    success: [
      {type: "textMessage", text: "{CASTER} uses a {ACTION}"},
      {type: "stateChange", recover: 100},
      {type: "textMessage", text: "{CASTER} HP recovered!"},
    ],
  }
}