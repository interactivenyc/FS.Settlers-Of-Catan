import React from 'react'
import socket from '../../socket'

export default class GameChat extends React.Component {
  constructor(props) {
    // console.log('[ GameChat ] constructor', props)

    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.scroll = this.scroll.bind(this)
  }

  componentDidMount() {
    // console.log('[ GameChat ] this.props.chatList', this.props.chatList)
    this.scroll()
  }

  componentDidUpdate() {
    // console.log('[ GameChat ] this.props.chatList', this.props.chatList)
    this.scroll()
  }

  onSubmit(e) {
    e.preventDefault()
    socket.emit('send-message', document.getElementById('message').value)
    document.getElementById('message').value = ''
  }

  scroll() {
    var elem = document.getElementById('scrollText')
    elem.scrollTop = elem.scrollHeight
  }

  render() {
    return (
      <table className="tableDisplay">
        <tbody>
          <tr>
            <th>Chat Window</th>
          </tr>
          <tr>
            <td>
              <div id="scrollText" className="scrollText">
                <pre>{this.props.chatList.join('\n\r')}</pre>
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
