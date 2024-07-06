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
}