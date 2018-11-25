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
    socket.on('dispatchThunk', ({action, args}) =>
      store.dispatch(actions[action].apply(this, args))
    )
  }

  componentDidUpdate() {
    try {
      if (this.props.currentTrade) {
        console.log('[ GameMap ] UPDATE display trade being offered')
        if (this.props.visible) {
          console.log(
            '[ GameMap ] UPDATE if visible, this is person making offer'
          )
        } else {
          console.log(
            '[ GameMap ] UPDATE if not visible, this is person receiving offer'
          )
          this.props.toggleModal('offer')
        }
      }
    } catch (error) {
      console.log(
        '[ GameMap ] componentDidUpdate something went wrong with check state'
      )
      console.log(error)
    }
  }

  buyaCard() {
    socket.emit('get-dev-card', 'defaultGame')
  }

  handleClick = e => {
    const {
      changeRoadThunk,
      changeVertexThunk,
      player,
      playerTurn,
      moveRobberThunk
    } = this.props

    if (playerTurn === player.playerNumber) {
      if (e.target.classList.contains('inner-hexagon')) {
        moveRobberThunk(e.target.dataset.resourceId)
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
          adjustScore={this.props.adjustScore}
          playerHand={this.props.playerHand}
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
    die2: gameState.die2,
    playerHand: playerState.playerHand,
    diceTotal: gameState.die1 + gameState.die2,
    currentTrade: playerState.currentTrade
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
  adjustScore: actions.adjustScore
})(GameMap)
