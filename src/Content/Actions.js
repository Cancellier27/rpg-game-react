export const Actions = {
  damage1: {
    name: "Whomp!",
    success: [
      {type: "textMessage", text: "{CASTER} uses {ACTION}"},
      {type: "animation", animation: "tackle"},
      {type: "stateChange", damage: 10}
    ],
  }
}