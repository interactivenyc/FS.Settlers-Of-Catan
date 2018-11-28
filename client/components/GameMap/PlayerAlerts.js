import React from 'react'

export default class PlayerAlerts extends React.Component {
  render() {
    const {phase, changeGamePhase, playerTurn} = this.props
    return (
      <div>
        {phase === 'build road' && (
          <div>
            <div className="player-alert">
              Click on an edge to build a road!
            </div>
            <button
              className="player-alert-button"
              onClick={() => changeGamePhase(null)}
            >
              Cancel Build
            </button>
          </div>
        )}
        {phase === 'build settlement' && (
          <div>
            <div className="player-alert">
              Click on a node to build a settlement!
            </div>
            <button
              className="player-alert-button"
              onClick={() => changeGamePhase(null)}
            >
              Cancel Build
            </button>
          </div>
        )}
        {phase === 'build city' && (
          <div>
            <div className="player-alert">
              Click on an existing settlement to upgrade to a city!
            </div>
            <button
              className="player-alert-button"
              onClick={() => changeGamePhase(null)}
            >
              Cancel Build
            </button>
          </div>
        )}
        {phase === 'build road dev' && (
          <div>
            <div className="player-alert">Click to build a road!</div>
          </div>
        )}
        {phase === 'build road dev 2' && (
          <div>
            <div className="player-alert">Click to build a second road!</div>
          </div>
        )}
        {phase === 'moveRobber' && (
          <div>
            <div className="player-alert">{`player-${playerTurn} move the robber`}</div>
          </div>
        )}
        {phase === 'rob' && (
          <div>
            <div className="player-alert">{`player-${playerTurn} select a city or settlement to rob`}</div>
          </div>
        )}
        {phase === 'responding' && (
          <div>
            <div className="player-alert">
              Waiting for players to discard...
            </div>
          </div>
        )}
      </div>
    )
  }
}
