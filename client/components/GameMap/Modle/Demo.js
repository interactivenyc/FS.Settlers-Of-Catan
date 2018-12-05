import React, {Component} from 'react'

export default class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <button
          type="button"
          onClick={() => this.props.toggleModal(false)}
          style={{float: 'right', fontSize: '10pt'}}
        >
          X
        </button>
        <div style={{margin: '5px'}}>
          Welcome to the Settlers of FullStack Demo Page!
        </div>
        <div>
          <h1 />
        </div>
        <div style={{margin: '5px'}}>
          In this Demo you can test out some of the features of our game, such
          as rolling the dice to gain resources and building settlements,
          without starting a full four-player game.
        </div>
        <div>
          <h1 />
        </div>
        <div style={{margin: '5px'}}>
          In Demo Mode move verification is turned off, so roads settlements and
          cities can be placed anywhere,
        </div>

        <div style={{margin: '5px'}}>
          but we still want to show off some game logic, so all moves still
          require the correct resources!
        </div>
        <div>
          <h1 />
        </div>
        <div style={{margin: '5px'}}>
          A full game requires four logged in users to join a game in the game
          lobby. If you would like to experience all our game has to offer,
          bring along some friends!
        </div>
      </div>
    )
  }
}
