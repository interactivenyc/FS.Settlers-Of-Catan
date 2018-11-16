import React from 'react'
import {connect} from 'react-redux'
import socket from '../socket'

export class GameLobby extends React.Component {
  constructor(props) {
    super(props)
    console.log('[ GameLobby ] constructor')

    this.state = {
      inLobby: false,
      userLobby: {},
      activeGames: {}
    }
    this.setupSocket()
    this.clickUser = this.clickUser.bind(this)
    this.clickGame = this.clickGame.bind(this)
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
  }

  componentDidUpdate() {
    if (this.props.user && this.state.inLobby === false) {
      console.log('[ GameLobby ] join-lobby')
      this.setState({
        inLobby: true
      })
      socket.emit('join-lobby', this.props.user)
    }
  }

  componentDidMount() {
    console.log('[ GameLobby ] componentDidMount', this.props)
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
    socket.emit('join-game', e.target.getAttribute('gameid'))
  }

  render() {
    return (
      <React.Fragment>
        <h1>Lobby</h1>
        <table id="userLobby" className="tableDisplay">
          <tbody>
            <tr>
              <th>Waiting For Game</th>
            </tr>
            {Object.keys(this.state.userLobby).map(key => {
              return (
                <tr key={key}>
                  <td onClick={this.clickUser}>
                    {this.state.userLobby[key].email}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <p />

        <table id="games" className="tableDisplay">
          <tbody>
            <tr>
              <th>Active Games Waiting For Players</th>
            </tr>
            {Object.keys(this.state.activeGames).map(key => {
              return (
                <tr key={key}>
                  <td gameid={key} onClick={this.clickGame}>{`${key} (${
                    Object.keys(this.state.activeGames[key]).length
                  })`}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <p />

        <table id="games" className="tableDisplay">
          <tbody>
            <tr>
              <th>User Lobby JSON</th>
            </tr>
            <tr>
              <td>
                <pre>{JSON.stringify(this.state.userLobby, null, 2)}</pre>
              </td>
            </tr>
          </tbody>
        </table>

        <p />

        <table id="games" className="tableDisplay">
          <tbody>
            <tr>
              <th>Active Games JSON</th>
            </tr>
            <tr>
              <td>
                <pre>{JSON.stringify(this.state.activeGames, null, 2)}</pre>
              </td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(GameLobby)
