import { Combatant } from "./Combatant";
import {Enemies} from "../Content/Enemies"
import {Players} from "../Content/Players"
import { TurnCycle } from "./TurnCycle";
import { BattleEvent } from "./BattleEvent";

export class Battle {
  constructor({map}) {
    this.map = map
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
        maxXp: 100,
        level: 1,
        status: {
          type: "sleepy",
          expiresIn: 3
        }
      }, this),
      "enemy1" : new Combatant({
        ...Enemies.n001,
        team:"enemy",
        hp: 50,
        maxHp: 50,
        mp:20,
        maxMp: 20,
        xp: 20,
        maxXp: 100,
        level: 1,
        status: null
      }, this),
      // "enemy2" : new Combatant({
      //   ...Enemies.e001,
      //   team:"enemy",
      //   hp: 50,
      //   maxHp: 50,
      //   mp:20,
      //   maxMp: 20,
      //   xp: 50,
      //   maxXp: 100,
      //   level: 1,
      //   status: null
      // }, this),
    }

    this.activeCombatants = {
      player: "player1",
      enemy: "enemy1"
    }

    // this.init()
  }


  init() {
    this.turCycle = new TurnCycle({
      battle: this,
      onNewEvent: event => {
        return new Promise(resolve => {
          const battleEvent = new BattleEvent(event, this)
          battleEvent.init(resolve)
        })
      }
    })

    this.turCycle.init()
  }
  
}