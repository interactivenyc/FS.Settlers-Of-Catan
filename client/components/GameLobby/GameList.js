import React from 'react'

const GameList = props => {
  return (
    <table id="games" className="tableDisplay">
      <tbody>
        <tr>
          <th>Active Games Waiting For Players</th>
        </tr>
        {Object.keys(props.activeGames).map(key => {
          return (
            <tr key={key}>
              <td gameid={key} onClick={props.clickGame}>{`${key} (${
                Object.keys(props.activeGames[key]).length
              })`}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default GameList
