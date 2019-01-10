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
    console.log('[ GameLobby ] ---------------------------')
    console.log('[ GameLobby ] constructor')
    console.log('[ GameLobby ] ---------------------------')

    super(props)

    this.state = {
      lobbyInitialized: false,
      inGame: false,
      socketId: '',
      userLobby: {},
      activeGames: {
        Lobby: {chatList: [], users: {}},
        'Default Game': {chatList: [], users: {}}
      },
      chatList: [],
      rooms: {}
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
    console.log('[ GameLobby ] componentDidMount', this.props)

    // if returning to Lobby from a game
    if (this.props.gameId !== 'none') {
      this.tryJoinLobby()
    }
  }

  componentDidUpdate() {
    if (!this.state.lobbyInitialized) {
      this.tryJoinLobby()
    }
  }

  componentWillUnmount() {
    console.log('[ GameLobby ] ---------------------------')
    console.log('[ GameLobby ] componentWillUnmount')
    console.log('[ GameLobby ] ---------------------------')

    // socket.emit('leave-game', this.props.gameId)

    socket.removeAllListeners()
  }

  tryJoinLobby() {
    console.log('[ GameLobby ] ---------------------------')
    console.log('[ GameLobby ] tryJoinLobby')
    console.log('[ GameLobby ] ---------------------------')
    if (
      this.props.user.email &&
      this.state.lobbyInitialized === false &&
      this.state.inGame === false
    ) {
      this.setState({
        lobbyInitialized: true
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
    this.props.setGameId(e.target.getAttribute('gameid'))
    socket.emit('join-game', e.target.getAttribute('gameid'))
  }

  leaveGame(e) {
    console.log('[ GameLobby ] leaveGame', e.target.getAttribute('gameid'))
    socket.emit('leave-game', e.target.getAttribute('gameid'))
    this.props.setGameId('Lobby')
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
                  gameId={this.props.gameId}
                />

                {/* Disabled Testing Buttons */}
                {/* <p />
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
                </button> */}
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
    console.log('[ GameLobby ] setupSocket listeners')

    socket.on('connectToRoom', gameId => {
      console.log('[ GameLobby ] connectToRoom:', gameId)
      this.props.setGameId(gameId)
    })

    socket.on('update-lobby', (userLobby, activeGames, rooms) => {
      // console.log('[ GameLobby ] update-lobby', this.props.gameId)
      // console.log('[ GameLobby ] update-lobby rooms', rooms)

      if (!this.props.gameId) return

      let chatList = activeGames[this.props.gameId].chatList

      /**
       * If the user has lost their connection accidentally, reset
       * their socketId, and re-join a game if they had
       * previously selected one
       */

      if (this.state.socketId !== socket.id && this.state.socketId !== '') {
        if (this.props.gameId !== '') {
          console.log('[ GameLobby ] ---------------------------')
          console.log('[ GameLobby ] join-game on update-lobby')
          console.log('[ GameLobby ] ---------------------------')

          socket.emit('join-game', this.props.gameId)
        }
      }

      if (!chatList) chatList = this.state.chatList

      this.setState({
        socketId: socket.id,
        userLobby,
        activeGames,
        chatList,
        rooms
      })
    })

    socket.on('log-server-message', msg => {
      console.log('[ GameLobby ] ------------')
      console.log('[ GameLobby ] serverMessage', msg)
      console.log('[ GameLobby ] ------------')
    })

    socket.on('start-game', (board, user) => {
      console.log('[ GameLobby ] start-game user', user)

      this.props.setGameId(user.gameId)

      this.props.deserializeBoard(board)
      this.props.assignPlayer(user.playerNumber, user.color)
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
      if (this.props.gameId !== '') {
        socket.emit('delete-user-from-game', this.props.user, this.props.gameId)
      }
    })
  }
}

const mapState = state => {
  return {
    user: state.user,
    board: state.board,
    gameId: state.playerState.gameId
  }
}

const mapDispatch = dispatch => {
  return {
    deserializeBoard: board => dispatch(actions.deserializeBoard(board)),
    setGameUsers: user => dispatch(actions.setGameUsers(user)),
    assignPlayer: (number, color) =>
      dispatch(actions.assignPlayer(number, color)),
    initGame: users => dispatch(actions.initGame(users)),
    setGameId: gameId => dispatch(actions.setGameId(gameId))
  }
}

export default connect(mapState, mapDispatch)(GameLobby)
