import React from 'react'
import './Dice.css'

const Dice = props => {
  // console.log(props)
  return (
    <div className={`die-container ${props.diceTotal && 'active'}`}>
      <div className={`die die-${props.die1}`} />

      <div className={`die die-${props.die2}`} />
    </div>
  )
}

export default Dice
