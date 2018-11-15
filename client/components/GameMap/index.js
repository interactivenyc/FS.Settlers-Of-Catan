import React, {Component} from 'react'
import GameBoard from './GameBoard'
import './GameMap.css'

class GameMap extends Component {
  handleClick = e => {
    if (e.target.classList.contains('inner-hexagon')) {
      console.log('clicked resource')
    } else if (e.target.classList.contains('side')) {
      console.log('clicked side')
    } else if (e.target.classList.contains('city')) {
      console.log('clicked city')
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
