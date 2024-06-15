import "./components.css"
import {KeyPressListener} from "../GameObjects/KeyPressListener"
import {useEffect, useState} from "react"

export default function TextBalloon({setIsMessageDisplayed, textMessageObj}) {
  useEffect(() => {
    return () => {
      const actionListener = new KeyPressListener("Enter", () => {
        actionListener.unbind()
        done()
      })
    }
  }, [])

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
