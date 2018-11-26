import React from 'react'

const GameState = props => {
  return (
    <table className="tableDisplay">
      <tbody>
        <tr>
          <th>this.state JSON</th>
        </tr>
        <tr>
          <td>
            <div className="scrollTextJSON">
              <pre>{JSON.stringify(props.state, null, 2)}</pre>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default GameState
