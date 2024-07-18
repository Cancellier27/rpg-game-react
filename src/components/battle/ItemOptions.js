import {Actions} from "../../Content/Actions"
import {KeyPressListener} from "../../classes/KeyPressListener"
import {useEffect} from "react"

export default function ItemOptions({level, setIsItem}) {
  useEffect(() => {
    // close the dialog if press escape button
    const keyEscape = new KeyPressListener("Escape", () => setIsItem(false))

    // remove event listener if components unmounts
    return () => {
      keyEscape.unbind()
    }
  }, [])

  
    let quantityMap = {}
    level.battle.combatants["player1"].items.forEach((item) => {
      
        let isExisting = quantityMap[item.actionId]

        if (isExisting) {
          isExisting.quantity += 1
        } else {
          quantityMap[item.actionId] = {
            actionId: item.actionId,
            quantity: 1,
            instanceId: item.instanceId
          }
        }
      
    })

  const itemsList = Object.values(quantityMap).map(
    (item, index) => {
      return (
        <button
          className="menu-arrow-selector"
          key={`${Actions[item.actionId].name}-${index}`}
          data-button={index}
          onClick={() => {
            level.decideFn(item.actionId, item.instanceId)
            setIsItem(false)
          }}
        >
          {`${Actions[item.actionId].name} x${item.quantity}`}
        </button>
      )
    }
  )

  // go back button
  itemsList.push(
    <button
      className="menu-arrow-selector"
      data-button={itemsList.length}
      key={`placeholder-attack-back`}
      onClick={() => setIsItem(false)}
    >
      Go Back
    </button>
  )

  if (itemsList.length < 8) {
    for (let i = 8 - itemsList.length; i > 0; i--) {
      itemsList.push(<button key={`placeholder-attack-${i}`}>-</button>)
    }
  }

  return (
    <div className="attack-list-container">
      <div
        className="attack-list-close-click"
        onClick={() => setIsItem(false)}
      ></div>

      <div className="attack-list">{[itemsList]}</div>
    </div>
  )
}
