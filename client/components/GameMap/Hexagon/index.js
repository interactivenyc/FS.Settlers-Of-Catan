import React, {Component} from 'react'
import {connect} from 'react-redux'
import Vertices from './Vertices'
import Edges from './Edges'

class Hexagon extends Component {
  handleResourceClassList = () => {
    const {moveRobber, board, gameOptions} = this.props
    const {robberLocation} = board
    const {resource} = gameOptions

    return `resource-number ${robberLocation.id === resource &&
      'robber'} ${moveRobber && 'robber-hover'}`
  }

  handleSettlementClassList = (pos, id, vertices) => {
    const color = vertices[id].color
    const {board, playerNumber, robPlayer} = this.props
    const robber = board.robberLocation
    let isSettled

    if (robber.vertices && robPlayer) {
      isSettled = robber.vertices
        .filter(vertex => vertex.color && vertex.player !== playerNumber)
        .map(vertex => vertex.id)
        .includes(id)
    }

    return `city city-${pos} ${color} ${isSettled && 'settlement-hover'}`
  }

  render() {
    const {board, style, gameOptions, image} = this.props
    const {resource, vert, sides} = gameOptions
    const {vertices, edges, robberLocation} = this.props.board

    const number = board.resources[gameOptions.id].diceTarget

    return (
      <div className="hexagon-container" style={{...style}}>
        <Vertices
          {...this.props}
          handleSettlementClassList={this.handleSettlementClassList}
          vertices={vertices}
          vert={vert}
        />
        <div
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          className="hexagon"
        >
          <div
            id={resource}
            data-resource-id={gameOptions.id}
            className={`inner-hexagon hexagon-image ${image}`}
          >
            <div
              data-resource-id={gameOptions.id}
              className={this.handleResourceClassList()}
            >
              <h1>{!!number && robberLocation.id !== resource && number}</h1>
            </div>
          </div>
          <Edges sides={sides} edges={edges} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {gameState: {phase, playerTurn}, playerState: {playerNumber}} = state
  const isPlayerTurn = playerNumber === playerTurn
  return {
    moveRobber: phase === 'moveRobber' && isPlayerTurn,
    robPlayer: phase === 'rob' && isPlayerTurn,
    playerNumber,
    phase
  }
}

export default connect(mapStateToProps, null)(Hexagon)
