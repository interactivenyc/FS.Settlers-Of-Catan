import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import GameMap from '../GameMap'
import Dice from '../Dice'
import socket from '../../socket'
import DevDeck from '../DevDeck'
import * as actions from '../../store/actions'

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

  rollDice = () => {
    const rollOne = Math.floor(Math.random() * 6) + 1
    const rollTwo = Math.floor(Math.random() * 6) + 1
    this.setState({die1: rollOne, die2: rollTwo, diceTotal: rollOne + rollTwo})
  }

  render() {
    return (
      <Fragment>
        <button onClick={this.buyaCard}>getDevCard</button>
        <Dice
          die1={this.state.die1}
          die2={this.state.die2}
          diceTotal={this.state.diceTotal}
          visible={this.state.visible}
        />
        <DevDeck playerHand={this.props.playerHand} />
        {/* <GameMap /> */}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  playerHand: state.playerState.playerHand,
  players: state.gameState.players
})

const mapDispatchToProps = dispatch => {
  return {
    buyCard: card => dispatch(actions.buyCard(card))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameController)
