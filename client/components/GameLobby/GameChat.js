import React from 'react'
import socket from '../../socket'

export default class GameChat extends React.Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.scroll = this.scroll.bind(this)
  }

  componentDidMount() {
    this.scroll()
  }

  componentDidUpdate() {
    this.scroll()
  }

  onSubmit(e) {
    e.preventDefault()
    socket.emit(
      'send-message',
      document.getElementById('message').value,
      'Lobby'
    )
    document.getElementById('message').value = ''
  }

  scroll() {
    var elem = document.getElementById('scrollText')
    elem.scrollTop = elem.scrollHeight
  }

  render() {
    // console.log('[ GameChat ] render this.props.chatList', this.props.chatList)
    let keyIndex = 0
    return (
      <table className="tableDisplay">
        <tbody>
          <tr>
            <th>Chat Window</th>
          </tr>
          <tr>
            <td>
              <div id="scrollText" className="scrollText">
                {this.props.chatList.map(entry => {
                  return (
                    <React.Fragment key={keyIndex++}>
                      <p>
                        <b>{entry.username}</b> : {entry.message}
                      </p>
                    </React.Fragment>
                  )
                })}
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <form onSubmit={this.onSubmit}>
                <input id="message" type="text" />
                <button type="submit">Send</button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}
