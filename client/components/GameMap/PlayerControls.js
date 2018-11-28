import React from 'react'
import Dice from '../Dice'

const PlayerControls = ({
  playerTurn,
  player,
  nextPlayerThunk,
  toggleModal,
  newDiceRoll,
  changePhase,
  changeGamePhase,
  die1,
  die2,
  diceTotal,
  phase
}) => {
  return (
    <div className="game-controller-container">
      <div
        className={`game-controller player-${
          player.playerNumber
        } ${playerTurn === player.playerNumber &&
          `active-${player.playerNumber}`}`}
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
              <button onClick={newDiceRoll} className="btn" type="button">
                Roll
              </button>
              <button
                className="btn"
                disabled={!!phase}
                onClick={() => {
                  toggleModal('build')
                  changeGamePhase(null)
                }}
                type="button"
              >
                Build
              </button>
              <button
                className="btn"
                disabled={!!phase}
                onClick={() => {
                  toggleModal('trade')
                }}
                type="button"
              >
                Trade
              </button>
              <button
                className="btn"
                disabled={!!phase}
                onClick={() => {
                  toggleModal('showDevCards')
                }}
                type="button"
              >
                Development Cards
              </button>
              <button
                className="btn"
                disabled={!!phase}
                onClick={() => {
                  nextPlayerThunk(player.playerNumber)
                }}
                type="button"
              >
                Next Player
              </button>
            </div>
          )}
        </div>
      </div>
      <Dice die1={die1} die2={die2} diceTotal={diceTotal} />
    </div>
  )
}

export default PlayerControls
