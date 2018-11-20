import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import GameMap from '../GameMap'
import Dice from '../Dice'
import socket from '../../socket'
import DevDeck from '../DevDeck'
import * as actions from '../../store/actions'
import {newDiceRoll} from '../../store/actions'

class GameController extends Component {
  constructor(props) {
    super(props)
    this.state = {
      die1: 0,
      die2: 0,
      diceTotal: 0,
      visible: false
    }
    socket.on('send-card-to-user', card => {
      this.props.buyCard(card)
    })
  }

  componentDidMount() {
    this.rollDice()
    this.setState({visible: true})
    console.log(this.props)
  }

  buyaCard() {
    socket.emit('get-dev-card', 'defaultGame')
  }

  render() {
    return (
      <Fragment>
        <button onClick={this.buyaCard}>getDevCard</button>
        <Dice />
        <DevDeck playerHand={this.props.playerHand} />
        <GameMap die1={this.props.die1} die2={this.props.die2} />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  playerHand: state.playerState.playerHand,
  players: state.gameState.players,
  die1: state.gameState.die1,
  die2: state.gameState.die2
})

const mapDispatchToProps = dispatch => {
  return {
    buyCard: card => dispatch(actions.buyCard(card)),
    newDiceRoll: () => dispatch(actions.newDiceRoll())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameController)
