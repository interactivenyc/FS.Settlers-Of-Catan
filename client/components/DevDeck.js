import React from 'react'
import './DevDeck.css'

const DevDeck = props => {
  return <div className="hand-container">{props.playerHand}</div>
}

export default DevDeck
