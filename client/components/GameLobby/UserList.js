import React from 'react'

const UserList = props => {
  return (
    <table id="users" className="tableDisplay">
      <tbody>
        <tr>
          <th>Waiting For Game</th>
        </tr>
        {Object.keys(props.userLobby).map(key => {
          return (
            <tr key={key}>
              <td onClick={props.clickUser}>{props.userLobby[key].email}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default UserList
