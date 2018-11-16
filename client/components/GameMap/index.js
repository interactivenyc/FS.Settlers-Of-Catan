import React, {Component} from 'react'
import GameBoard from './GameBoard'
// import './GameMap.css'

class GameMap extends Component {
  handleClick = e => {
    if (e.target.classList.contains('inner-hexagon')) {
      console.log('clicked resource', e.target.id)
    } else if (e.target.classList.contains('side')) {
      console.log('clicked side', e.target.id)
    } else if (e.target.classList.contains('city')) {
      console.log('clicked city', e.target.id)
    }
  }
  render() {
    return (
      <div className="board-container">
        <GameBoard adjust={-25} handleClick={this.handleClick} />
      </div>
    )
  }
}

export default GameMap
