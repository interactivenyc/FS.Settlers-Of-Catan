import React from 'react'

const PlayerControls = ({playerTurn, player, nextPlayerThunk, toggleModal}) => {
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
            <button
              className="btn"
              onClick={() => toggleModal('build')}
              type="button"
            >
              Build
            </button>
            <button
              className="btn"
              onClick={() => toggleModal('trade')}
              type="button"
            >
              Trade
            </button>
            <button
              className="btn"
              onClick={() => toggleModal('showDevCards')}
              type="button"
            >
              Development Cards
            </button>
            <button
              className="btn"
              onClick={() => nextPlayerThunk(player.playerNumber)}
              type="button"
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
