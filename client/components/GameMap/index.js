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
    const {assignPlayer} = actions

    socket.emit('assignPlayer')

    socket.on('dispatch', action => store.dispatch(action))

    socket.on('assignPlayer', ({number, color}) => {
      if (!this.props.user.color) store.dispatch(assignPlayer(number, color))
      if (number === 4) socket.emit('startGame')
    })
  }

  handleClick = e => {
    const {changeRoadThunk, changeVertexThunk, user, playerTurn} = this.props

    if (playerTurn === user.playerNumber) {
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
    const {players, visible, playerTurn, user, player} = this.props

    console.log(players)

    return (
      <div className="board-container">
        <Players players={players} playerTurn={playerTurn} />
        <Modle visible={visible} />
        <GameBoard
          adjust={-25}
          handleClick={this.handleClick}
          board={this.props.board}
        />
        {player && (
          <PlayerControls
            playerNumber={user.playerNumber}
            playerTurn={playerTurn}
            player={player}
            nextPlayerThunk={this.props.nextPlayerThunk}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  board: state.board,
  user: state.user,
  players: Object.keys(state.players).reduce((acc, val) => {
    if (Number(val) !== state.user.playerNumber) acc[val] = state.players[val]
    return acc
  }, {}),
  player: state.user.playerNumber && state.players[state.user.playerNumber],
  visible: state.playState.modle,
  playerTurn: state.playState.playerTurn
})

export default connect(mapStateToProps, {
  changeRoadThunk: actions.changeRoadThunk,
  changeVertexThunk: actions.changeVertexThunk,
  nextPlayerThunk: actions.nextPlayerThunk
})(GameMap)
