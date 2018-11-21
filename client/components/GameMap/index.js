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
    socket.on('dispatchThunk', ({action, args}) =>
      store.dispatch(actions[action].apply(this, args))
    )
  }

  handleClick = e => {
    const {changeRoadThunk, changeVertexThunk, player, playerTurn} = this.props

    if (playerTurn === player.playerNumber) {
      if (e.target.classList.contains('inner-hexagon')) {
        console.log(e.target.id)
        // this.props.moveRobber(e.target.id)
      } else if (e.target.classList.contains('side')) {
        changeRoadThunk(e.target.id)
      } else if (e.target.classList.contains('city')) {
        changeVertexThunk(e.target.id)
      }
    }
  }

  render() {
    const {players, visible, playerTurn, player} = this.props

    return (
      <div className="board-container">
        <Players
          players={players.filter(user => user.id !== player.playerNumber)}
          playerTurn={playerTurn}
        />
        <Modle visible={visible} toggleModal={this.props.toggleModal} />
        <GameBoard
          adjust={-25}
          handleClick={this.handleClick}
          board={this.props.board}
          die1={this.props.die1}
          die2={this.props.die2}
        />
        <PlayerControls
          playerTurn={playerTurn}
          player={player}
          nextPlayerThunk={this.props.nextPlayerThunk}
          toggleModal={this.props.toggleModal}
          newDiceRoll={this.props.newDiceRoll}
        />
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
    playerTurn: gameState.playerTurn,
    die1: gameState.die1,
    die2: gameState.die2,
    diceTotal: gameState.die1 + gameState.die2
  }
}

export default connect(mapStateToProps, {
  changeRoadThunk: actions.changeRoadThunk,
  moveRobber: actions.maveRobber,
  changeVertexThunk: actions.changeVertexThunk,
  nextPlayerThunk: actions.nextPlayerThunk,
  toggleModal: actions.toggleModal,
  distributeResourcesThunk: actions.distributeResourcesThunk,
  newDiceRoll: actions.newDiceRoll
})(GameMap)
