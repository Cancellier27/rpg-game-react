import {utils} from "../helpers/utils"
import {updateState} from "../helpers/updateState"

export class TurnCycle {
  constructor({battle, onNewEvent}) {
    this.battle = battle
    this.onNewEvent = onNewEvent
    this.currentTeam = "player" // or enemy
  }

  async turn() {
    // get the caster
    const casterId = this.battle.activeCombatants[this.currentTeam]
    const caster = this.battle.combatants[casterId]
    const enemyId = this.battle.activeCombatants[caster.team === "player" ? "enemy" : "player"]
    const enemy = this.battle.combatants[enemyId]
    // const initialPlayerLvl = caster.level

    const submission = await this.onNewEvent({
      type: "submissionMenu",
      caster,
      enemy
    })

    // check if any items were used and filters them
    if (submission.instanceId) {
      caster.items = caster.items.filter((i) => i.instanceId !== submission.instanceId)
    }

    const resultingEvents = caster.getReplacedEvents(submission.action.success)

    for (let i = 0; i < resultingEvents.length; i++) {
      const event = {
        ...resultingEvents[i],
        submission,
        action: submission.action,
        caster,
        target: submission.target
      }

      await this.onNewEvent(event)
    }

    // check for post events
    // do things after our original turn submission
    const postEvents = caster.getPostEvents()
    for (let i = 0; i < postEvents.length; i++) {
      const event = {
        ...postEvents[i],
        submission,
        action: submission.action,
        caster,
        target: submission.target
      }

      await this.onNewEvent(event)
    }

    // did target die?
    const targetDead = submission.target.hp <= 0

    if (targetDead) {
      await this.onNewEvent({
        type: "textMessage",
        text: `${submission.target.name} was defeated!`
      })

      document.querySelector(`.${submission.target.classId}`).classList.add("fade-out")

      if (submission.target.team === "enemy") {
        const playerActiveId = this.battle.activeCombatants.player
        const xp = submission.target.givesXp
        const maxXp = this.battle.combatants[playerActiveId].maxXp
        let playerXP = this.battle.combatants[playerActiveId].xp

        // check if player will level up
        if (maxXp <= playerXP + xp) {
          const extraXP = (playerXP + xp) % maxXp
          const xpTimes = Math.floor((playerXP + xp) / maxXp)
          await this.onNewEvent({type: "textMessage", text: `Gained ${xp}xp points`})

          // check if the player will lvl up more than once
          for (let i = 1; i <= xpTimes; i++) {
            await this.onNewEvent({type: "lvlUp", xp: xp, combatant: this.battle.combatants[playerActiveId]})
          }

          await this.onNewEvent({type: "giveXp", xp: extraXP, combatant: this.battle.combatants[playerActiveId]})
          await this.onNewEvent({
            type: "textMessage",
            text: `Reached level ${this.battle.combatants[playerActiveId].level}!`
          })
        } else {
          await this.onNewEvent({type: "giveXp", xp: xp, combatant: this.battle.combatants[playerActiveId]})
          await this.onNewEvent({type: "textMessage", text: `Gained ${xp}xp points`})
        }

        // update hero Status in overWorld
        updateState.updateHeroState(
          this.battle.map.overWorld.saveGameState.save_01.party.hero,
          this.battle.combatants[playerActiveId]
        )
      }

      // complete the battle animation after 1 sec
      await utils.wait(1000)
      console.log("battle Completed!")
      this.battle.onComplete()

      return
    }

    // check for status expired
    const expiredEvent = caster.decrementStatus()
    if (expiredEvent) {
      await this.onNewEvent(expiredEvent)
    }

    this.resumeTurn()
  }

  resumeTurn() {
    this.currentTeam = this.currentTeam === "player" ? "enemy" : "player"
    this.turn()
  }

  async init() {
    // start the first turn
    this.turn()
  }
}
