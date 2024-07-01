export const Actions = {
  damage1: {
    name: "Whomp!",
    success: [
      {type: "textMessage", text: "{CASTER} uses {ACTION}"},
      // {type: "animation", animation: "something happened"},
      // {type: "stateChange", damage: 10}
    ],
  }
}