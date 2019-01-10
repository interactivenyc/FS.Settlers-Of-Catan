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
import PlayerAlerts from './PlayerAlerts'
import Dice from '../Dice'
import {log} from 'util'

class GameMap extends Component {
  componentDidMount() {
    socket.on('dispatch', action => {
      // console.log('receiving dispatch via SocketIO', action)
      store.dispatch(action)
    })

    socket.on('dispatchThunk', ({action, args}) => {
      // console.log('receiving dispatchThunk via SocketIO', action, args)
      store.dispatch(actions[action].apply(this, args))
    })

    socket.on('send-card-to-user', card => {
      this.props.buyCard(card)
    })

    socket.on('set-game-users', users => {
      console.log('[ GameMap ] set-game-users users', users)
      this.props.initGame(users)
    })

    socket.on('log-server-message', msg => {
      console.log('[ GameMap ] ------------')
      console.log('[ GameMap ] serverMessage', msg)
      console.log('[ GameMap ] ------------')
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} was lost - rejoining`)
      this.rejoinGameAfterDisconnect()
    })
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

  rejoinGameAfterDisconnect() {
    console.log('[ GameMap ] ------------')
    console.log('[ GameMap ] rejoinGameAfterDisconnect', this.props.gameId)
    console.log('[ GameMap ] ------------')

    socket.emit('switch-room', this.props.gameId)
  }

  buyaCard = () => {
    console.log('[ GameMap ] buyaCard gameId: ', this.props.gameId)
    socket.emit('get-dev-card', this.props.gameId)
  }

  handlePlayCard = card => {
    this.props.playCard(card)
  }

  /* eslint-disable complexity */
  handleClick = e => {
    const {
      changeRoadThunk,
      changeVertexThunk,
      playerTurn,
      moveRobberThunk,
      phase,
      buildCityThunk,
      player
    } = this.props

    if (playerTurn === player.playerNumber) {
      if (phase === 'moveRobber') {
        this.handleMoveRobber(e)
      } else if (phase === 'rob') {
        this.handleRobPlayer(e)
      } else if (
        phase === 'build road' ||
        phase === 'build road dev' ||
        phase === 'build road dev 2'
      ) {
        if (e.target.classList.contains('side')) {
          changeRoadThunk(e.target.id)
        }
      } else if (e.target.classList.contains('city')) {
        if (phase === 'build city') {
          buildCityThunk(e.target.id)
        } else if (phase === 'build settlement') {
          changeVertexThunk(e.target.id)
        }
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
    const {
      players,
      visible,
      playerTurn,
      player,
      changeGamePhase,
      phase,
      diceTotal,
      die1,
      die2
    } = this.props

    return (
      <div className="board-container">
        <Players
          players={players.filter(p => p.id !== player.playerNumber)}
          playerTurn={playerTurn}
        />
        <PlayerAlerts
          playerTurn={playerTurn}
          phase={phase}
          changeGamePhase={changeGamePhase}
          player={player.color}
        />
        <Modle
          visible={visible}
          toggleModal={this.props.toggleModal}
          buyaCard={this.buyaCard}
          adjustScore={this.props.adjustScore}
          changeGamePhase={changeGamePhase}
          robberDiscardThunk={this.props.robberDiscardThunk}
          player={player}
          playerHand={this.props.playerHand}
          handlePlayCard={this.handlePlayCard}
          setResources={this.props.setResources}
          plentyThunk={this.props.plentyThunk}
          monopoly={this.props.monopoly}
        />
        <GameBoard
          adjust={-25}
          handleClick={this.handleClick}
          board={this.props.board}
          player={player}
          phase={phase}
          changeGamePhase={changeGamePhase}
          playerTurn={playerTurn}
          changeRoadThunk={this.props.changeRoadThunk}
          changeVertexThunk={this.props.changeVertexThunk}
          mode={this.props.mode}
        />
        <div>
          <PlayerControls
            distributeResources={this.props.distributeResourcesThunk}
            playerTurn={playerTurn}
            player={player}
            playerInfo={players.filter(p => p.id === player.playerNumber)[0]}
            nextPlayerThunk={this.props.nextPlayerThunk}
            toggleModal={this.props.toggleModal}
            newDiceRoll={this.props.newDiceRoll}
            changePhase={this.props.changePhase}
            changeGamePhase={changeGamePhase}
            diceTotal={diceTotal}
            die1={die1}
            die2={die2}
            phase={phase}
            mode={this.props.mode}
          />
        </div>
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
    playerHand: playerState.playerHand,
    diceTotal: gameState.die1 + gameState.die2,
    phase: gameState.phase,
    currentTrade: playerState.currentTrade,
    mode: gameState.mode,
    gameId: playerState.gameId
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
  changeGamePhase: actions.changeGamePhase,
  buildCityThunk: actions.buildCityThunk,
  robberDiscardThunk: actions.robberDiscardThunk,
  playCard: actions.playCard,
  changePhase: actions.changePhase,
  setResources: actions.setResources,
  plentyThunk: actions.plentyThunk,
  monopoly: actions.monopoly,
  initGame: actions.initGame
})(GameMap)
