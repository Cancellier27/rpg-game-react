export const Actions = {
  damage1: {
    name: "Whomp!",
    success: [
      {type: "textMessage", text: "{CASTER} uses Whomp!"},
      // {type: "animation", animation: "something happened"},
      // {type: "stateChange", damage: 10}
    ],
  }
}