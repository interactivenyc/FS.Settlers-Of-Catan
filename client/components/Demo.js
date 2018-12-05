import React, {Component} from 'react'
import {connect} from 'react-redux'
import GameMap from './GameMap'
import * as actions from '../store/actions'

class Demo extends Component {
  componentDidMount() {
    this.props.setGameMode('demo')
    this.props.assignPlayer(1, 'red')
    this.props.setResources([
      {type: 'forest', quantity: 3},
      {type: 'field', quantity: 3},
      {type: 'hill', quantity: 3},
      {type: 'mountain', quantity: 3},
      {type: 'pasture', quantity: 3}
    ])
    this.props.setGameUsers([{playerNumber: 1, resources: 15}])
    this.props.toggleModal('demo')
  }

  render() {
    return <GameMap />
  }
}

const mapState = state => {
  return {
    playerState: state.playerState,
    gameState: state.gameState
  }
}

export default connect(mapState, {
  assignPlayer: actions.assignPlayer,
  setResources: actions.setResources,
  setGameMode: actions.setGameMode,
  setGameUsers: actions.setGameUsers,
  toggleModal: actions.toggleModal
})(Demo)
