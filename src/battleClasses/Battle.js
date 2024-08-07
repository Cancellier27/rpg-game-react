import { Combatant } from "./Combatant";
import {Enemies} from "../Content/Enemies"
import {Players} from "../Content/Players"
import { TurnCycle } from "./TurnCycle";
import { BattleEvent } from "./BattleEvent";

export class Battle {
  constructor({map, onComplete}) {
    this.onComplete = onComplete
    this.map = map
    this.battleMap = "DemoRoomBattle"
    this.combatants = {
      "player1" : new Combatant({
        ...Players.hero,
        team:"player",
        hp: 10,
        maxHp: 100,
        mp:20,
        maxMp: 20,
        xp: 95,
        maxXp: 100,
        level: 1,
        status: null,
        isPlayerControlled: true
      }, this),
      "enemy1" : new Combatant({
        ...Enemies.n001,
        team:"enemy",
        hp: 5,
        maxHp: 50,
        mp:20,
        maxMp: 20,
        xp: 20,
        maxXp: 100,
        level: 1,
        status: null
      }, this),
    }

    this.activeCombatants = {
      player: "player1",
      enemy: "enemy1"
    }

    this.init()
  }


  init() {
    this.turCycle = new TurnCycle({
      battle: this,
      onNewEvent: event => {
        return new Promise(resolve => {
          const battleEvent = new BattleEvent(event, this, this.map)
          battleEvent.init(resolve)
        })
      }
    })

    this.turCycle.init()
  }
  
}