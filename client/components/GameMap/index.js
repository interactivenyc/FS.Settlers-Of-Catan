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

    socket.on('send-card-to-user', card => {
      this.props.buyCard(card)
    })
  }

  buyaCard() {
    socket.emit('get-dev-card', 'defaultGame')
  }

  handleClick = e => {
    const {
      changeRoadThunk,
      changeVertexThunk,
      playerTurn,
      player,
      phase
    } = this.props

    if (playerTurn === player.playerNumber) {
      if (phase === 'moveRobber') {
        this.handleMoveRobber(e)
      } else if (phase === 'rob') {
        this.handleRobPlayer(e)
      } else if (e.target.classList.contains('side')) {
        changeRoadThunk(e.target.id)
      } else if (e.target.classList.contains('city')) {
        changeVertexThunk(e.target.id)
      }
    }
  }

  handleMoveRobber = e => {
    const {moveRobberThunk} = this.props
    const id = e.target.dataset.resourceId
    const elem = e.target.classList
    if (elem.contains('robber-hover')) {
      moveRobberThunk(id)
    }
  }

  handleRobPlayer = e => {
    const id = e.target.id
    const elem = e.target.classList
    const {vertices} = this.props.board
    const {playerNumber} = this.props.player

    if (elem.contains('settlement-hover')) {
      socket.emit('dispatchThunk', {
        action: 'robPlayer',
        args: [vertices[id].player, playerNumber]
      })
    }
  }

  render() {
    const {players, visible, playerTurn, player} = this.props

    return (
      <div className="board-container">
        <Players
          players={players.filter(p => p.id !== player.playerNumber)}
          playerTurn={playerTurn}
        />
        <Modle
          visible={visible}
          toggleModal={this.props.toggleModal}
          buyaCard={this.buyaCard}
          adjustScore={this.props.adjustScore}
          robberDiscardThunk={this.props.robberDiscardThunk}
          player={player}
        />
        <GameBoard
          adjust={-25}
          handleClick={this.handleClick}
          board={this.props.board}
          die1={this.props.die1}
          die2={this.props.die2}
        />
        <PlayerControls
          distributeResources={this.props.distributeResourcesThunk}
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
    players: gameState.players,
    player: playerState,
    visible: gameState.modle,
    playerTurn: gameState.playerTurn,
    die1: gameState.die1,
    die2: gameState.die2,
    diceTotal: gameState.die1 + gameState.die2,
    phase: gameState.phase
  }
}

export default connect(mapStateToProps, {
  changeRoadThunk: actions.changeRoadThunk,
  moveRobberThunk: actions.moveRobberThunk,
  changeVertexThunk: actions.changeVertexThunk,
  nextPlayerThunk: actions.nextPlayerThunk,
  toggleModal: actions.toggleModal,
  distributeResourcesThunk: actions.distributeResourcesThunk,
  newDiceRoll: actions.newDiceRoll,
  buyCard: actions.buyCard,
  adjustScore: actions.adjustScore,
  robberDiscardThunk: actions.robberDiscardThunk
})(GameMap)
