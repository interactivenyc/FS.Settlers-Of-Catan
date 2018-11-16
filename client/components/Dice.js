import React from 'react'
import './Dice.css'

const Dice = props => {
  return (
    <div className="die">
      {' '}
      <div>
        {' '}
        <img src={`/images/Dice/Dice-${props.die1}.png`} />{' '}
      </div>{' '}
      <div>
        {' '}
        <img src={`/images/Dice/Dice-${props.die2}.png`} />{' '}
      </div>{' '}
    </div>
  )
}

export default Dice
