import React from 'react'
import {connect} from 'react-redux'
import socket from '../../socket'
import './GameLobby.css'
import {deserializeBoard} from '../../store/actions'
import UserList from './UserList'
import GameList from './GameList'
import GameState from './GameState'
import GameChat from './GameChat'
import * as actions from '../../store/actions'

export class GameLobby extends React.Component {
  constructor(props) {
    super(props)
    console.log('[ GameLobby ] constructor')

    this.state = {
      inLobby: false,
      inGame: false,
      socketId: '',
      gameId: '',
      userLobby: {},
      activeGames: {},
      chatList: ['chat', 'feature', 'coming', 'soon']
    }
    this.setupSocket()
    this.tryJoinLobby = this.tryJoinLobby.bind(this)
    this.clickUser = this.clickUser.bind(this)
    this.clickGame = this.clickGame.bind(this)
    this.leaveGame = this.leaveGame.bind(this)
    this.resetAllGames = this.resetAllGames.bind(this)
  }

  componentDidMount() {
    console.log('BOARD', JSON.stringify(this.props.board))
    console.log('[ GameLobby ] componentDidMount', this.props)
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
      console.log('[ GameLobby ] join-lobby')
      this.setState({
        inLobby: true
      })
      socket.emit('join-lobby', this.props.user)
    }
  }

  resetAllGames() {
    socket.emit('reset-all-games')
  }

  clickUser(e) {
    console.log('[ GameLobby ] clickUser', e.target.innerHTML)
  }

  clickGame(e) {
    console.log(
      '[ GameLobby ] clickGame',
      e.target.getAttribute('gameid'),
      this.state.activeGames
    )
    this.setState({
      gameId: e.target.getAttribute('gameid')
    })
    socket.emit('join-game', e.target.getAttribute('gameid'))
  }

  leaveGame(e) {
    console.log('[ GameLobby ] leaveGame', e.target.getAttribute('gameid'))
    this.setState({
      gameId: ''
    })
    socket.emit('leave-game', e.target.getAttribute('gameid'))
  }

  render() {
    return (
      <React.Fragment>
        <h1>Lobby</h1>

        <table>
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
                  clickGame={this.clickGame}
                  leaveGame={this.leaveGame}
                  activeGames={this.state.activeGames}
                  socketId={this.state.socketId}
                  gameId={this.state.gameId}
                />
              </td>
            </tr>
            <tr>
              <td>
                <GameChat
                  updateChat={this.updateChat}
                  chatList={this.state.chatList}
                />
              </td>
              <td>{/* <GameState state={this.state} /> */}</td>
            </tr>
          </tbody>
        </table>

        <p />

        <button type="button" onClick={this.resetAllGames}>
          Reset All Games
        </button>
      </React.Fragment>
    )
  }

  setupSocket() {
    // console.log('[ GameLobby ] setupSocket', socket.id)

    socket.on('player-joined', () => {
      console.log('[ GameLobby ] player-joined')
    })

    socket.on('update-lobby', (userLobby, activeGames, chatList) => {
      console.log('[ GameLobby ] update-lobby', this.state)

      if (!this.state.inLobby) return
      if (this.state.inGame) return

      /**
       * If the user has lost their connection accidentally, reset
       * their socketId, and re-join a game if they had
       * previously selected one
       */
      if (this.state.socketId !== socket.id && this.state.socketId !== '') {
        console.log(
          '[ GameLobby ] SOCKET ID HAS CHANGED',
          this.state.socketId,
          socket.id
        )
        if (this.state.gameId !== '') {
          socket.emit('join-game', this.state.gameId)
        }
      }

      this.setState({
        socketId: socket.id,
        userLobby,
        activeGames,
        chatList
      })
    })

    socket.on('game-joined', activeGames => {
      console.log('[ GameLobby ] game-joined')
      this.setState({
        activeGames
      })
    })

    socket.on('games-reset', activeGames => {
      console.log('[ GameLobby ] games-reset')
      this.setState({
        activeGames
      })
    })

    socket.on('lobby-left', userLobby => {
      console.log('[ GameLobby ] lobby-left')
      if (!this.state.inGame) {
        this.setState({
          userLobby
        })
      }
    })

    socket.on('start-game', (board, user) => {
      console.log('[ GameLobby ] start-game - setting inLobby false')
      this.setState({
        gameId: '',
        inGame: true
      })
      this.props.deserializeBoard(board)
      this.props.assignPlayer(user.number, user.color)
      this.props.history.push('/map')
    })

    socket.on('update-chat', chatList => {
      this.setState({
        chatList
      })
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} was lost - rejoining`)

      /**
       * If the user's connection is lost accidentally,
       * rejoin the lobby, and tell the server to delete
       * the user from the active game. Game will be rejoined
       * automatically if this.state.gameId exists.
       */
      socket.emit('join-lobby', this.props.user)
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
    deserializeBoard: board => dispatch(deserializeBoard(board)),
    setGameUsers: users => dispatch(actions.setGameUsers(users)),
    assignPlayer: (number, color) =>
      dispatch(actions.assignPlayer(number, color))
  }
}

export default connect(mapState, mapDispatch)(GameLobby)
