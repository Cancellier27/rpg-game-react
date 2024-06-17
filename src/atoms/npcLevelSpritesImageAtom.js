import { atom } from "recoil";



export const spriteShadowImageAtom = atom({
  key: "spriteShadowImageAtom",
  default: null,
});

export const spriteHeroImageAtom = atom({
  key: "spriteHeroImageAtom",
  default: null,
});

export const spriteNpc1ImageAtom = atom({
  key: "spriteNpc1ImageAtom",
  default: null,
});

export const spriteNpc2ImageAtom = atom({
  key: "spriteNpc2ImageAtom",
  default: null,
});

export const spriteNpc3ImageAtom = atom({
  key: "spriteNpc3ImageAtom",
  default: null,
});

export const npcImages = {
  shadow: spriteShadowImageAtom,
  hero: spriteHeroImageAtom,
  npc1: spriteNpc1ImageAtom,
  npc2: spriteNpc2ImageAtom,
  npc3: spriteNpc3ImageAtom
}
