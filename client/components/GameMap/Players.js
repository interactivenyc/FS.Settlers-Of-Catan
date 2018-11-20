import React from 'react'

const Players = ({players, playerTurn}) => {
  return (
    <div className="player-container">
      {players.map(({id, resources, score}) => (
        <div
          key={id}
          className={`player player-${id} ${playerTurn == id &&
            `active-${id}`}`}
        >
          <div className="user" />
          <div className="score">
            <p>{`Score: ${score}`}</p>
            <p>{`Resources: ${resources}`}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Players
