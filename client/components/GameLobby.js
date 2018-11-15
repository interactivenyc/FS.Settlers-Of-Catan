import React from 'react'
import {connect} from 'react-redux'
import socket from '../socket'

export class GameLobby extends React.Component {
  constructor(props) {
    super(props)
    console.log('[ GameLobby ] constructor')

    this.state = {
      inLobby: false,
      userLobby: {}
    }
    this.setupSocket()
  }

  setupSocket() {
    console.log('[ GameLobby ] setupSocket', socket.id)

    socket.on('player-joined', () => {
      console.log('[ GameLobby ] player-joined')
    })

    socket.on('lobby-joined', userLobby => {
      console.log('[ GameLobby ] lobby-joined userLobby', userLobby)
      this.setState({
        userLobby
      })
    })

    socket.on('lobby-left', userLobby => {
      console.log('[ GameLobby ] lobby-left userLobby', userLobby)
      this.setState({
        userLobby
      })
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

  render() {
    return (
      <React.Fragment>
        <h1>Lobby</h1>
        {Object.keys(this.state.userLobby).map(key => {
          return <div key={key}>{this.state.userLobby[key].email}</div>
        })}
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
