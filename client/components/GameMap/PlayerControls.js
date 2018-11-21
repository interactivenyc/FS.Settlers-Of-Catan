import React from 'react'

const PlayerControls = ({
  playerTurn,
  player,
  nextPlayerThunk,
  distributeResources,
  toggleModal,
  newDiceRoll
}) => {
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
            <button onClick={newDiceRoll} className="btn">
              Roll
            </button>
            <button className="btn" onClick={() => toggleModal('build')}>
              Build
            </button>
            <button className="btn" onClick={() => toggleModal('showDevCards')}>
              Development Cards
            </button>
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
