import {Combatant} from "./Combatant"
// import {Enemies} from "../Content/Enemies"
// import {Players} from "../Content/Players"
import {TurnCycle} from "./TurnCycle"
import {BattleEvent} from "./BattleEvent"

export class Battle {
  constructor({map, onComplete, enemy, enemies}) {
    this.onComplete = onComplete
    this.map = map
    this.saveGame = this.map.overWorld.saveGameState.save_01
    this.battleMap = "DemoRoomBattle"
    this.combatants = {}
    // populate player into combatants
    this.party = Object.keys(this.saveGame.party).forEach((key) => {
      let combatantsLength = Object.keys(this.combatants).length + 1
      return (this.combatants[`player${combatantsLength}`] = new Combatant(this.saveGame.party[key]))
    })
    // populate enemies into combatants
    this.enemies = Object.keys(enemies).forEach((key) => {
      let combatantsLength = Object.keys(this.combatants).length + 1
      return (this.combatants[`enemy${combatantsLength}`] = new Combatant(enemies[key]))
    })

    // this.activeCombatants = Object.fromEntries(Object.keys(this.combatants).map((key) => [key, key]))

    this.activeCombatants = {
      player: "player1",
      enemy: "enemy2"
    }

    this.init()
  }

  init() {
    console.log(this.activeCombatants)
    console.log(this.combatants)
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
