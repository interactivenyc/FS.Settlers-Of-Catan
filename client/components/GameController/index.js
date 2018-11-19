import React, {Component} from 'react'
import {connect} from 'react-redux'
import GameMap from '../GameMap'
import Dice from '../Dice'

class GameController extends Component {
  constructor(props) {
    super(props)
    this.state = {
      die1: 0,
      die2: 0,
      diceTotal: 0,
      trading: true
    }
  }

  componentDidMount() {
    this.rollDice()
    this.setState({
      trading: true
    })
  }

  rollDice = () => {
    const rollOne = Math.floor(Math.random() * 6) + 1
    const rollTwo = Math.floor(Math.random() * 6) + 1
    this.setState({die1: rollOne, die2: rollTwo, diceTotal: rollOne + rollTwo})
  }

  render() {
    return (
      <div>
        <h1> Game Controller </h1>
        <Dice
          die1={this.state.die1}
          die2={this.state.die2}
          diceTotal={this.state.diceTotal}
        />
        <GameMap />
      </div>
    )
  }
}

export default GameController
