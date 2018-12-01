import React from 'react'
import {connect} from 'react-redux'
import socket from '../../socket'
import './GameLobby.css'
import UserList from './UserList'
import GameList from './GameList'
import GameState from './GameState'
import GameChat from './GameChat'
import * as actions from '../../store/actions'

export class GameLobby extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inLobby: false,
      inGame: false,
      socketId: '',
      gameId: 'Lobby',
      userLobby: {},
      activeGames: {
        Lobby: {chatList: [], users: {}},
        'Default Game': {chatList: [], users: {}}
      },
      chatList: []
    }
    this.setupSocket()
    this.tryJoinLobby = this.tryJoinLobby.bind(this)
    this.clickUser = this.clickUser.bind(this)
    this.joinGame = this.joinGame.bind(this)
    this.leaveGame = this.leaveGame.bind(this)
    this.resetAllGames = this.resetAllGames.bind(this)
    this.switchRoom = this.switchRoom.bind(this)
  }

  componentDidMount() {
    this.tryJoinLobby()
  }
  componentDidUpdate() {
    this.tryJoinLobby()
  }

  componentWillUnmount() {
    socket.emit('leave-game', this.state.gameId)
  }

  tryJoinLobby() {
    if (
      this.props.user.email &&
      this.state.inLobby === false &&
      this.state.inGame === false
    ) {
      this.setState({
        inLobby: true
      })
      socket.emit('join-lobby', this.props.user)
    }
  }

  resetAllGames() {
    socket.emit('reset-all-games')
  }

  switchRoom(room) {
    console.log('[ GameLobby ] switchRoom', room)
    socket.emit('switch-room', room)
  }

  serverTrace() {
    socket.emit('server-trace')
  }

  clickUser(e) {
    console.log('[ GameLobby ] clickUser', e.target.innerHTML)
  }

  joinGame(e) {
    console.log('[ GameLobby ] joinGame', e.target.getAttribute('gameid'))

    this.setState({
      gameId: e.target.getAttribute('gameid')
    })
    socket.emit('join-game', e.target.getAttribute('gameid'))
  }

  leaveGame(e) {
    console.log('[ GameLobby ] leaveGame', e.target.getAttribute('gameid'))
    socket.emit('leave-game', e.target.getAttribute('gameid'))
  }

  render() {
    // console.log('[ GameLobby ] render', this.props, this.state)

    return (
      <React.Fragment>
        <h3>
          Lobby - {this.props.user.email} - {this.state.socketId}
        </h3>

        <table className="tableContainer">
          <tbody>
            <tr>
              <td>
                <UserList
                  clickUser={this.clickUser}
                  userLobby={this.state.userLobby}
                />
              </td>
              <td>
                <GameList
                  joinGame={this.joinGame}
                  leaveGame={this.leaveGame}
                  activeGames={this.state.activeGames}
                  // chatList={this.state.chatList}
                  socketId={this.state.socketId}
                  gameId={this.state.gameId}
                />
                <p />
                <button type="button" onClick={this.resetAllGames}>
                  Reset All Games
                </button>
                <button
                  type="button"
                  onClick={() => this.switchRoom('Default Game')}
                >
                  Join Game
                </button>
                <button type="button" onClick={() => this.switchRoom('Lobby')}>
                  Join Lobby
                </button>
                <button type="button" onClick={this.serverTrace}>
                  Server Trace
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <GameChat chatList={this.state.chatList} />
              </td>
              <td>
                <GameState state={this.state} />
              </td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    )
  }

  setupSocket() {
    socket.on('connectToRoom', gameId => {
      console.log('[ GameLobby ] connectToRoom:', gameId)
      this.setState({
        gameId
      })
    })

    socket.on('update-lobby', (userLobby, activeGames) => {
      let chatList = activeGames[this.state.gameId].chatList
      console.log('[ GameLobby ] update-lobby chatList', chatList, activeGames)

      // if (!this.state.inLobby) return
      // if (this.state.inGame) return

      /**
       * If the user has lost their connection accidentally, reset
       * their socketId, and re-join a game if they had
       * previously selected one
       */

      if (this.state.socketId !== socket.id && this.state.socketId !== '') {
        if (this.state.gameId !== '') {
          console.log('[ GameLobby ] join-game on update-lobby')

          socket.emit('join-game', this.state.gameId)
        }
      }

      if (!chatList) chatList = this.state.chatList

      this.setState({
        socketId: socket.id,
        userLobby,
        activeGames,
        chatList
      })
    })

    socket.on('log-server-message', msg => {
      console.log('[ GameLobby ] log-server-message', msg)
    })

    socket.on('set-game-users', users => {
      console.log('[ GameLobby ] set-game-users users', users)
      this.props.initGame(users)
    })

    socket.on('start-game', (board, user) => {
      console.log('[ GameLobby ] start-game user', user)

      this.setState({
        gameId: '',
        inGame: true
      })

      this.props.deserializeBoard(board)
      this.props.assignPlayer(user.number, user.color)
      this.props.history.push('/map')
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} was lost - rejoining`)

      /**
       * If the user's connection is lost accidentally,
       * rejoin the lobby, and tell the server to delete
       * the user from the active game. Game will be rejoined
       * automatically if this.state.gameId exists.
       */
      this.tryJoinLobby()
      if (this.state.gameId !== '') {
        socket.emit(
          'delete-user-from-game',
          this.props.user.email,
          this.state.gameId
        )
      }
    })
  }
}

const mapState = state => {
  return {
    user: state.user,
    board: state.board
  }
}

const mapDispatch = dispatch => {
  return {
    deserializeBoard: board => dispatch(actions.deserializeBoard(board)),
    setGameUsers: user => dispatch(actions.setGameUsers(user)),
    assignPlayer: (number, color) =>
      dispatch(actions.assignPlayer(number, color)),
    initGame: users => dispatch(actions.initGame(users))
  }
}

export default connect(mapState, mapDispatch)(GameLobby)
