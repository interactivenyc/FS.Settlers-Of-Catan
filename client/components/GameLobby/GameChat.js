import React from 'react'
import socket from '../../socket'

const GameChat = props => {
  let chatList = props.chatList.join('\n')
  // document.getElementById("textarea").scrollTop = document.getElementById("textarea").scrollHeight

  window.setTimeout(function() {
    document.getElementById('message').addEventListener('change', scroll)
  }, 1000)

  function onSubmit(e) {
    e.preventDefault()
    socket.emit('send-message', document.getElementById('message').value)
    document.getElementById('message').value = ''
  }

  function scroll() {
    var elem = document.getElementById('scrollText')
    elem.scrollTop = elem.scrollHeight
  }

  return (
    <table className="tableDisplay">
      <tbody>
        <tr>
          <th>Chat Window</th>
        </tr>
        <tr>
          <td>
            <div id="scrollText" className="scrollText">
              <pre>{chatList}</pre>
            </div>
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
