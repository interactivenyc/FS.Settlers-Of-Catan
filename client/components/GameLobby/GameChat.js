import React from 'react'

const GameChat = props => {
  let chatList = props.chatList.join('\n\n')
  return (
    <table className="tableDisplay">
      <tbody>
        <tr>
          <th>Chat Window</th>
        </tr>
        <tr>
          <td>{chatList}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default GameChat
