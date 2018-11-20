import React from 'react'
import socket from '../../socket'

const GameChat = props => {
  let chatList = props.chatList.join('\n')

  function onSubmit(e) {
    e.preventDefault()
    console.log(
      '[ GameChat ] onSubmit',
      document.getElementById('message').value
    )
    socket.emit('send-message', document.getElementById('message').value)
  }
  return (
    <table className="tableDisplay">
      <tbody>
        <tr>
          <th>Chat Window</th>
        </tr>
        <tr>
          <td>
            <pre>{chatList}</pre>
          </td>
        </tr>
        <tr>
          <td>
            <form onSubmit={onSubmit}>
              <input id="message" type="text" />
              <button type="submit">Send</button>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default GameChat
