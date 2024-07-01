import "./battle.css"

export default function StatusBoard({level, setIsStatusBoard}) {
  return (
    <div className="status-board-container">
      <div>
        <p>Hero</p>
        <div>
          <p>Zz</p> <p>3</p>
        </div>
        <div>
          <p>Weak</p> <p>2</p>
        </div>
        <div>
          <p>Slow</p> <p>3</p>
        </div>
      </div>

      <button onClick={() => setIsStatusBoard(false)}>Back</button>
    </div>
  )
}
