import { Combatant } from "./Combatant";
import {Enemies} from "../Content/Enemies"
import {Players} from "../Content/Players"

export class Battle {
  constructor() {
    this.battleMap = "DemoRoomBattle"
    this.combatants = {
      "player1" : new Combatant({
        ...Players.hero,
        team:"player",
        hp: 80,
        maxHp: 100,
        mp:20,
        maxMp: 20,
        xp: 0,
        level: 1,
        status: null
      }, this),
      "enemy1" : new Combatant({
        ...Enemies.n001,
        team:"enemy",
        hp: 50,
        maxHp: 50,
        mp:20,
        maxMp: 20,
        xp: 20,
        level: 1,
        status: null
      }, this),
      // "enemy2" : new Combatant({
      //   ...Enemies.e001,
      //   team:"enemy",
      //   hp: 50,
      //   maxHp: 50,
      //   xp: 50,
      //   level: 1,
      //   status: null
      // }, this),
    }
  }

  
}