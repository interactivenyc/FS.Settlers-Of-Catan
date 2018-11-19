import React from 'react'

const Players = ({players, playerTurn}) => {
  return (
    <div className="player-container">
      {Object.keys(players).map(number => (
        <div
          key={number}
          className={`player player-${number} ${playerTurn == number &&
            `active-${number}`}`}
        >
          <div className="user" />
          <div className="score">
            <p>{`Score: ${players[number].score}`}</p>
            <p>{`Resources: ${Object.keys(players[number].resources).reduce(
              (acc, val) => acc + players[number].resources[val],
              0
            )}`}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Players
