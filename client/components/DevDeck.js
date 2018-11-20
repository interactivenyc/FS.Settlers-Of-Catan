import React from 'react'
import './DevDeck.css'

const DevDeck = props => {
  console.log(props, 'player hand')

  return <div>{props.playerHand}</div>
}

export default DevDeck
