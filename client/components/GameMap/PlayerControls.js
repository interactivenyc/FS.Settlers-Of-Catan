import React from 'react'

const PlayerControls = ({
  playerNumber,
  playerTurn,
  player,
  nextPlayerThunk
}) => {
  return (
    <div
      className={`game-controller player-${playerNumber} ${playerTurn ===
        playerNumber && `active-${playerNumber}`}`}
    >
      <div className="section-resources">
        {Object.keys(player.resources).map(resource => (
          <div key={resource} className="resource-container">
            <div className={`resource ${resource}`} />
            <div className="counter">{player.resources[resource]}</div>
          </div>
        ))}
        {playerTurn === playerNumber && (
          <div className="section-btns">
            <button className="btn">modle</button>
            <button className="btn">Roll</button>
            <button className="btn">Settlement</button>
            <button className="btn">City</button>
            <button className="btn">Development Cards</button>
            <button
              className="btn"
              onClick={() => nextPlayerThunk(playerNumber)}
            >
              Next Player
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PlayerControls
