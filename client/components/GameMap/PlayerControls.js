import React from 'react'

const PlayerControls = ({playerTurn, player, nextPlayerThunk}) => {
  return (
    <div
      className={`game-controller player-${player.playerNumber} ${playerTurn ===
        player.playerNumber && `active-${player.playerNumber}`}`}
    >
      <div className="section-resources">
        {player.resources.map(({type, quantity}) => (
          <div key={type} className="resource-container">
            <div className={`resource ${type}`} />
            <div className="counter">{quantity}</div>
          </div>
        ))}
        {playerTurn === player.playerNumber && (
          <div className="section-btns">
            <button className="btn">modle</button>
            <button className="btn">Roll</button>
            <button className="btn">Settlement</button>
            <button className="btn">City</button>
            <button className="btn">Development Cards</button>
            <button
              className="btn"
              onClick={() => nextPlayerThunk(player.playerNumber)}
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
