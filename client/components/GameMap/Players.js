import React from 'react'

const Players = ({players, playerTurn}) => {
  return (
    <div className="player-container">
      {players.map(({id, resources, score, longestRoad, largestArmy}) => (
        <div
          key={id}
          className={`player player-${id} ${playerTurn == id &&
            `active-${id}`}`}
        >
          <div className="user" />
          <div className="score">
            <p>{`Victory Points: ${score}`}</p>
            <p>{`Resources: ${resources}`}</p>
            <p>{`Longest Road: ${longestRoad}`}</p>
            <p>{`Largest Army: ${largestArmy}`}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Players
