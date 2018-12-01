import React from 'react'

const GameList = props => {
  console.log('[ GameList ] props', props)

  let keyIndex = 0

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
    // console.log('[ GameList ] isInGame', props.gameId)

    const keys = Object.keys(props.activeGames[props.gameId].users)
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
        {Object.keys(props.activeGames).map(gameId => {
          return (
            <tr key={keyIndex++}>
              <td gameid={gameId}>
                <button
                  type="button"
                  gameid={gameId}
                  onClick={getClickFunction()}
                >
                  {getButtonText()}
                </button>
                <span
                  className="gameText"
                  onClick={props.clickGame}
                >{`${gameId} [ ${
                  Object.keys(props.activeGames[gameId].users).length
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
