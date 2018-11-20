import React from 'react'

const GameList = props => {
  function getButtonText() {
    if (isInGame()) {
      console.log('button text LEAVE')
      return 'LEAVE'
    } else {
      console.log('button text JOIN')
      return 'JOIN'
    }
  }

  function getClickFunction() {
    if (isInGame()) {
      console.log('click function leaveGame')
      return props.leaveGame
    } else {
      console.log('click function clickGame')
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
              <td gameid={key} onClick={props.clickGame}>
                {`${key} (${Object.keys(props.activeGames[key]).length})`}
              </td>
              <td>
                <button type="button" gameid={key} onClick={getClickFunction()}>
                  {getButtonText()}
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default GameList
