import { atom } from "recoil";

// start map of the game!
export const currentLevelIdAtom = atom({
  key: "currentLevelIdAtom",
  default: "Street",
});
