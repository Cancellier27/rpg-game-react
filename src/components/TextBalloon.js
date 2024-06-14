import "./components.css"

export default function TextBalloon({text, setIsMessageDisplayed, textMessageObj}) {

  function onClickHandler() {
    setIsMessageDisplayed(false)
    textMessageObj.onComplete()
  }

  return (
    <div className="text-message">
      <p className="text-message-p">{text}</p>
      <button className="text-message-button" onClick={onClickHandler} >Next</button>
    </div>
  )
}

