import React from 'react'
import {connect} from 'react-redux'
import socket from '../../socket'
import './GameLobby.css'
import UserList from './UserList'
import GameList from './GameList'
import GameState from './GameState'
import GameChat from './GameChat'

export class GameLobby extends React.Component {
  constructor(props) {
    super(props)
    console.log('[ GameLobby ] constructor')

    this.state = {
      inLobby: false,
      socketId: '',
      gameId: '',
      userLobby: {},
      activeGames: {},
      chatList: ['line1', 'line2', 'line3']
    }
    this.setupSocket()
    this.tryJoinLobby = this.tryJoinLobby.bind(this)
    this.clickUser = this.clickUser.bind(this)
    this.clickGame = this.clickGame.bind(this)
    this.resetAllGames = this.resetAllGames.bind(this)
  }

  setupSocket() {
    console.log('[ GameLobby ] setupSocket', socket.id)

    socket.on('player-joined', () => {
      console.log('[ GameLobby ] player-joined')
    })

    socket.on('lobby-joined', (userLobby, activeGames) => {
      console.log(
        '[ GameLobby ] lobby-joined userLobby/activeGames',
        userLobby,
        activeGames
      )
      this.setState({
        userLobby,
        activeGames
      })
    })

    socket.on('game-joined', activeGames => {
      console.log('[ GameLobby ] game-joined')
      this.setState({
        activeGames
      })
    })

    socket.on('lobby-left', userLobby => {
      console.log('[ GameLobby ] lobby-left userLobby', userLobby)
      this.setState({
        userLobby
      })
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} was lost - rejoining`)
      socket.emit('join-lobby', this.props.user)
    })

    socket.on('send-card-to-user', () => {
      console.log('player received card')
      socket.emit('get-dev-card')
    })
  }

  componentDidMount() {
    console.log('[ GameLobby ] componentDidMount', this.props)
    this.tryJoinLobby()
  }

  componentDidUpdate() {
    this.tryJoinLobby()
  }

  tryJoinLobby() {
    if (this.props.user.email && this.state.inLobby === false) {
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
                  activeGames={this.state.activeGames}
                />
              </td>
            </tr>
            <tr>
              <td>
                <GameState state={this.state} />
              </td>
              <td>
                <GameChat chatList={this.state.chatList} />
              </td>
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

    socket.on('update-lobby', (userLobby, activeGames, userEmail) => {
      console.log('[ GameLobby ] update-lobby', userEmail)

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
        if (this.state.gameId != '') {
          socket.emit('join-game', this.state.gameId)
        }
      }

      this.setState({
        socketId: socket.id,
        userLobby,
        activeGames
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
      this.setState({
        userLobby
      })
    })

    socket.on('start-game', board => {
      console.log('[ GameLobby ] start-game')
      this.setState({
        gameId: ''
      })
      this.props.history.push('/game')
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
    user: state.user
  }
}

export default connect(mapState)(GameLobby)
