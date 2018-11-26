import React from 'react'

export default class PlayerAlerts extends React.Component {
  render() {
    const {phase, changeGamePhase} = this.props
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
      </div>
    )
  }
}
