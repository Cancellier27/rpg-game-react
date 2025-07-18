import {useEffect} from "react"
import {useRecoilState} from "recoil"
import {
  spriteDemoRoomLowerImageAtom,
  spriteDemoRoomUpperImageAtom,
  spriteKitchenLowerImageAtom,
  spriteKitchenUpperImageAtom,
  spriteStreetLowerImageAtom,
  spriteStreetUpperImageAtom
} from "./atoms/mapLevelSpritesImageAtom"
import {
  spriteShadowImageAtom,
  spriteHeroImageAtom,
  spriteNpc1ImageAtom,
  spriteNpc2ImageAtom,
  spriteNpc3ImageAtom
} from "./atoms/npcLevelSpritesImageAtom"
import {spriteDemoBattleImageAtom} from "./atoms/battleMapsImageAtom"
import {SPRITE_SHEET_SRC} from "./helpers/consts"
import RenderLevel from "./components/general/RenderLevel"

function App() {
  // Maps
  // DemoRoom
  const [spriteDemoRoomLowerImage, setSpriteDemoRoomLowerImage] = useRecoilState(spriteDemoRoomLowerImageAtom)
  const [spriteDemoRoomUpperImage, setSpriteDemoRoomUpperImage] = useRecoilState(spriteDemoRoomUpperImageAtom)
  
  // Kitchen
  const [spriteKitchenLowerImage, setSpriteKitchenLowerImage] = useRecoilState(spriteKitchenLowerImageAtom)
  const [spriteKitchenUpperImage, setSpriteKitchenUpperImage] = useRecoilState(spriteKitchenUpperImageAtom)

  // Street
  const [spriteStreetLowerImage, setSpriteStreetLowerImage] = useRecoilState(spriteStreetLowerImageAtom)
  const [spriteStreetUpperImage, setSpriteStreetUpperImage] = useRecoilState(spriteStreetUpperImageAtom)

  // Battle Maps
  const [spriteDemoRoomBattleImage, setSpriteDemoRoomBattleImage] = useRecoilState(spriteDemoBattleImageAtom)

  // Npcs and shadow
  const [spriteShadowImage, setSpriteShadowImage] = useRecoilState(spriteShadowImageAtom)
  const [spriteHeroImage, setSpriteHeroImage] = useRecoilState(spriteHeroImageAtom)
  const [spriteNpc1Image, setSpriteNpc1Image] = useRecoilState(spriteNpc1ImageAtom)
  const [spriteNpc2Image, setSpriteNpc2Image] = useRecoilState(spriteNpc2ImageAtom)
  const [spriteNpc3Image, setSpriteNpc3Image] = useRecoilState(spriteNpc3ImageAtom)

  // Maps Lower
  useEffect(() => {
    // DemoRoom
    const demoRoomLowerImage = new Image()
    demoRoomLowerImage.src = SPRITE_SHEET_SRC.DemoRoomLower
    demoRoomLowerImage.onload = () => {
      setSpriteDemoRoomLowerImage(demoRoomLowerImage)
    }

    // Kitchen
    const kitchenLowerImage = new Image()
    kitchenLowerImage.src = SPRITE_SHEET_SRC.KitchenLower
    kitchenLowerImage.onload = () => {
      setSpriteKitchenLowerImage(kitchenLowerImage)
    }

    // Street
    const StreetLowerImage = new Image()
    StreetLowerImage.src = SPRITE_SHEET_SRC.StreetLower
    StreetLowerImage.onload = () => {
      setSpriteStreetLowerImage(StreetLowerImage)
    }
  }, [setSpriteDemoRoomLowerImage, setSpriteKitchenLowerImage, setSpriteStreetLowerImage])

  // Maps Upper
  useEffect(() => {
    // DemoRoom
    const demoRoomUpperImage = new Image()
    demoRoomUpperImage.src = SPRITE_SHEET_SRC.DemoRoomUpper
    demoRoomUpperImage.onload = () => {
      setSpriteDemoRoomUpperImage(demoRoomUpperImage)
    }

    // Kitchen
    const kitchenUpperImage = new Image()
    kitchenUpperImage.src = SPRITE_SHEET_SRC.KitchenUpper
    kitchenUpperImage.onload = () => {
      setSpriteKitchenUpperImage(kitchenUpperImage)
    }

    // Street
    const StreetUpperImage = new Image()
    StreetUpperImage.src = SPRITE_SHEET_SRC.StreetUpper
    StreetUpperImage.onload = () => {
      setSpriteStreetUpperImage(StreetUpperImage)
    }
  }, [setSpriteDemoRoomUpperImage, setSpriteKitchenUpperImage, setSpriteStreetUpperImage])

  // Battle Maps
  useEffect(() => {
    // DemoRoom
    const demoRoomBattleImg = new Image()
    demoRoomBattleImg.src = SPRITE_SHEET_SRC.DemoRoomBattle
    demoRoomBattleImg.onload = () => {
      setSpriteDemoRoomBattleImage(demoRoomBattleImg)
    }
  }, [setSpriteDemoRoomBattleImage])

  // NPCs and Shadow
  useEffect(() => {
    // Shadow
    const shadowImage = new Image()
    shadowImage.src = SPRITE_SHEET_SRC.NpcShadow
    shadowImage.onload = () => {
      setSpriteShadowImage(shadowImage)
    }

    // Hero
    const heroImage = new Image()
    heroImage.src = SPRITE_SHEET_SRC.Hero
    heroImage.onload = () => {
      setSpriteHeroImage(heroImage)
    }

    // Npc1
    const npc1Image = new Image()
    npc1Image.src = SPRITE_SHEET_SRC.Npc1
    npc1Image.onload = () => {
      setSpriteNpc1Image(npc1Image)
    }

    // Npc2
    const npc2Image = new Image()
    npc2Image.src = SPRITE_SHEET_SRC.Npc2
    npc2Image.onload = () => {
      setSpriteNpc2Image(npc2Image)
    }

    // Npc3
    const npc3Image = new Image()
    npc3Image.src = SPRITE_SHEET_SRC.Npc3
    npc3Image.onload = () => {
      setSpriteNpc3Image(npc3Image)
    }
  }, [setSpriteShadowImage, setSpriteHeroImage, setSpriteNpc1Image, setSpriteNpc2Image, setSpriteNpc3Image])

  // state load check
  if (
    !spriteDemoRoomUpperImage ||
    !spriteDemoRoomLowerImage ||
    !spriteKitchenUpperImage ||
    !spriteKitchenLowerImage ||
    !spriteStreetUpperImage ||
    !spriteStreetLowerImage ||
    !spriteShadowImage ||
    !spriteHeroImage ||
    !spriteNpc1Image ||
    !spriteNpc2Image ||
    !spriteNpc3Image ||
    !spriteDemoRoomBattleImage
  ) {
    return null
  }

  return <RenderLevel />
}

export default App
