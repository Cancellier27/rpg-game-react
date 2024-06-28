import {atom} from "recoil"

// DemoRoom - Battle
export const spriteDemoBattleImageAtom = atom({
  key: "spriteDemoBattleImageAtom",
  default: null
})

export const battleMapsImages = {
  DemoRoomBattle: spriteDemoBattleImageAtom,
}
