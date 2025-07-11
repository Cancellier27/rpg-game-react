import {atom} from "recoil"

// DemoRoom
export const spriteDemoRoomLowerImageAtom = atom({
  key: "spriteDemoRoomLowerImageAtom",
  default: null
})

export const spriteDemoRoomUpperImageAtom = atom({
  key: "spriteDemoRoomUpperImageAtom",
  default: null
})

// Kitchen
export const spriteKitchenLowerImageAtom = atom({
  key: "spriteKitchenLowerImageAtom",
  default: null
})

export const spriteKitchenUpperImageAtom = atom({
  key: "spriteKitchenUpperImageAtom",
  default: null
})

export const spriteStreetUpperImageAtom = atom({
  key: "spriteStreetUpperImageAtom",
  default: null
})

export const spriteStreetLowerImageAtom = atom({
  key: "spriteStreetLowerImageAtom",
  default: null
})

export const lowerMapsImages = {
  DemoRoom: spriteDemoRoomLowerImageAtom,
  Kitchen: spriteKitchenLowerImageAtom,
  Street: spriteStreetLowerImageAtom
}

export const upperMapsImages = {
  DemoRoom: spriteDemoRoomUpperImageAtom,
  Kitchen: spriteKitchenUpperImageAtom,
  Street: spriteStreetUpperImageAtom
}
