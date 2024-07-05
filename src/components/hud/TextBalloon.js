import "./hud.css"
import {useEffect, useState} from "react"

export default function TextBalloon({level}) {
  const [messageText, setMessageText] = useState(null)
  const [isMessage, setIsMessage] = useState(null)

  useEffect(() => {
    setIsMessage(level.OWMap.isMessageDisplaying)
    setMessageText(level.OWMap.messageText)
  }, [level])

  if (!messageText) {
    return null
  }

  function onClickHandler() {
    level.messageOnComplete()
    level.OWMap.terminateMessage()
  }
  if (level.isBattle) {
    return (
      <div>
        {isMessage && (
          <div className="text-message-battle">
            <p className="text-message-p">{messageText}</p>
            <button className="text-message-button" onClick={onClickHandler}>
              Next
            </button>
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div>
        {isMessage && (
          <div className="text-message">
            <p className="text-message-p">{messageText}</p>
            <button className="text-message-button" onClick={onClickHandler}>
              Next
            </button>
          </div>
        )}
      </div>
    )
  }
}
