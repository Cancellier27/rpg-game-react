import "./hud.css"
import {KeyPressListener} from "../GameObjects/KeyPressListener"
import {textMessageObj} from "../GameObjects/classes"
import {useEffect} from "react"
 
export default function TextBalloon({setIsMessageDisplayed}) {
  
  useEffect (() => {
    console.log("rendering")
    return () => {
      const actionListener = new KeyPressListener("Enter", () => {
        actionListener.unbind()
        done()
        console.log("enter")
      })
    }
  }, [setIsMessageDisplayed])

    
  function onClickHandler() {
    done()
  }

  function done() {
    setIsMessageDisplayed(false)
    textMessageObj.onComplete()
  }
  
  

  return (
    <div className="text-message">
      <p className="text-message-p">{textMessageObj.getState()}</p>
      <button className="text-message-button" onClick={onClickHandler}>
        Next
      </button>
    </div>
  )
}
