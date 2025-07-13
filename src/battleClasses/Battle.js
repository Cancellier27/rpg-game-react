import {Combatant} from "./Combatant"
import {Enemies} from "../Content/Enemies"
import {Players} from "../Content/Players"
import {TurnCycle} from "./TurnCycle"
import {BattleEvent} from "./BattleEvent"

export class Battle {
  constructor({map, onComplete, enemy}) {
    this.onComplete = onComplete
    this.map = map
    this.saveGame = this.map.overWorld.saveGameState.save_01
    this.battleMap = "DemoRoomBattle"
    this.combatants = {
      player1: new Combatant(
        {
          ...this.saveGame.hero
        },
        this
      ),
      enemy1: new Combatant(
        {
          ...Enemies[enemy],
          team: "enemy",
          hp: 10,
          maxHp: 100,
          mp: 20,
          maxMp: 20,
          xp: 100,
          maxXp: 100,
          level: 1,
          status: null
        },
        this
      )
    }

    this.activeCombatants = {
      player: "player1",
      enemy: "enemy1"
    }

    this.init()
  }

  init() {
    console.log(this.map.overWorld.saveGameState.save_01)
    this.turCycle = new TurnCycle({
      battle: this,
      onNewEvent: (event) => {
        return new Promise((resolve) => {
          const battleEvent = new BattleEvent(event, this, this.map)
          battleEvent.init(resolve)
        })
      }
    })

    this.turCycle.init()
  }
}
