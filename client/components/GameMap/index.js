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
  constructor(props) {
    super(props)
    socket.on('send-card-to-user', card => {
      this.props.buyCard(card)
    })
  }

  componentDidMount() {
    socket.on('dispatch', action => store.dispatch(action))
    console.log(typeof this.buyaCard)
  }

  buyaCard() {
    socket.emit('get-dev-card', 'defaultGame')
  }

  handleClick = e => {
    const {changeRoadThunk, changeVertexThunk, player, playerTurn} = this.props

    if (playerTurn === player.playerNumber) {
      if (e.target.classList.contains('inner-hexagon')) {
        // this.props.changeResourceThunk(e.target.id)
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
        <Players players={players} playerTurn={playerTurn} />
        <Modle
          visible={visible}
          toggleModal={this.props.toggleModal}
          buyaCard={this.buyaCard}
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
    players: gameState.players.filter(
      player => player.id !== playerState.playerNumber
    ),
    player: playerState,
    visible: gameState.modle,
    playerTurn: gameState.playerTurn,
    die1: gameState.die1,
    die2: gameState.die2
  }
}

export default connect(mapStateToProps, {
  changeRoadThunk: actions.changeRoadThunk,
  changeVertexThunk: actions.changeVertexThunk,
  nextPlayerThunk: actions.nextPlayerThunk,
  toggleModal: actions.toggleModal,
  distributeResourcesThunk: actions.distributeResourcesThunk,
  newDiceRoll: actions.newDiceRoll,
  buyCard: actions.buyCard
})(GameMap)
