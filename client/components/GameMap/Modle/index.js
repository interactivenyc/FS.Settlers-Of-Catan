import React from 'react'

const Modle = ({visible}) => {
  return (
    <div className={`game-modle ${visible && 'game-modle-active'}`}>
      <h1>Waiting for players...</h1>
    </div>
  )
}

export default Modle
