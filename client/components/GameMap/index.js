import React, {Component} from 'react'
import GameBoard from './GameBoard'
import PlayerControls from './PlayerControls'
import Players from './Players'
import './GameMap.css'
import Modle from './Modle'
import {connect} from 'react-redux'
import * as actions from '../../store/actions'
import socket from '../../socket'
import store from '../../store'

class GameMap extends Component {
  componentDidMount() {
    socket.on('dispatch', action => store.dispatch(action))
  }

  handleClick = e => {
    const {changeRoadThunk, changeVertexThunk, player, playerTurn} = this.props

    if (playerTurn === player.playerNumber) {
      if (e.target.classList.contains('inner-hexagon')) {
        console.log('clicked resource', e.target.id)
        // this.props.changeResourceThunk(e.target.id)
      } else if (e.target.classList.contains('side')) {
        console.log('clicked side', e.target.id)
        changeRoadThunk(e.target.id)
      } else if (e.target.classList.contains('city')) {
        console.log('clicked city', e.target.id)
        changeVertexThunk(e.target.id)
      }
    }
  }

  render() {
    const {players, visible, playerTurn, player} = this.props

    return (
      <div className="board-container">
        <Players players={players} playerTurn={playerTurn} />
        <Modle visible={visible} />
        <GameBoard
          adjust={-25}
          handleClick={this.handleClick}
          board={this.props.board}
        />
        <PlayerControls
          distributeResources={this.props.distributeResourcesThunk}
          playerTurn={playerTurn}
          player={player}
          nextPlayerThunk={this.props.nextPlayerThunk}
        />
        )
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {board, gameState, playerState} = state
  return {
    board,
    players: gameState.players.filter(
      player => player.id !== playerState.playerNumber
    ),
    player: playerState,
    visible: gameState.modle,
    playerTurn: gameState.playerTurn
  }
}

export default connect(mapStateToProps, {
  changeRoadThunk: actions.changeRoadThunk,
  changeVertexThunk: actions.changeVertexThunk,
  nextPlayerThunk: actions.nextPlayerThunk,
  distributeResourcesThunk: actions.distributeResourcesThunk
})(GameMap)
