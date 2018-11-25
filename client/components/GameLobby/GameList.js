import React from 'react'

const GameList = props => {
  function getButtonText() {
    if (isInGame()) {
      return 'LEAVE'
    } else {
      return 'JOIN'
    }
  }

  function getClickFunction() {
    if (isInGame()) {
      return props.leaveGame
    } else {
      return props.clickGame
    }
  }

  function isInGame() {
    const keys = Object.keys(props.activeGames['Default Game'])
    if (keys.includes(props.socketId)) {
      return true
    } else {
      return false
    }
  }

  return (
    <table id="games" className="tableDisplay">
      <tbody>
        <tr>
          <th colSpan="2">Active Games Waiting For Players</th>
        </tr>
        {Object.keys(props.activeGames).map(key => {
          return (
            <tr key={key}>
              <td gameid={key}>
                <button type="button" gameid={key} onClick={getClickFunction()}>
                  {getButtonText()}
                </button>
                <span
                  className="gameText"
                  onClick={props.clickGame}
                >{`${key} [ ${
                  Object.keys(props.activeGames[key]).length
                } ]`}</span>
              </td>
              <td />
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default GameList
