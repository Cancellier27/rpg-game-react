import "./components.css"

export default function TextBaloom({text}) {
  return (
    <div className="text-message">
      <p className="text-message-p">{text}</p>
      <button className="text-message-button" >Next</button>
    </div>
  )
}

