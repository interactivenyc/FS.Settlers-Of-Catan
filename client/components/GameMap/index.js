import React, {Component} from 'react'
import GameBoard from './GameBoard'
import './GameMap.css'
import {connect} from 'react-redux'
import {changeVertexThunk} from '../../store/actions'

class GameMap extends Component {
  handleClick = e => {
    if (e.target.classList.contains('inner-hexagon')) {
      console.log('clicked resource', e.target.id)
    } else if (e.target.classList.contains('side')) {
      console.log('clicked side', e.target.id)
    } else if (e.target.classList.contains('city')) {
      console.log('clicked city', e.target.id)
      this.props.changeVertexThunk(e.target.id)
    }
  }
  render() {
    return (
      <div className="board-container">
        <GameBoard
          adjust={-25}
          handleClick={this.handleClick}
          board={this.props.board}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({board: state.board})

export default connect(mapStateToProps, {changeVertexThunk})(GameMap)
