import { TextMessage } from "./TextMessage"
import {OverWorldMap} from "./OverWorldMap"
import { DirectionInput } from "./DirectionInput"
import {OVERWORLD_MAPS} from "../helpers/maps"

export const overWorldMap = new OverWorldMap({map: "DemoRoom"})

export const textMessageObj = new TextMessage({
  text: "",
  onComplete: null
})

export const directionInput =  new DirectionInput()

export const map = OVERWORLD_MAPS[overWorldMap.map]
