import React, {Component} from 'react'

export default class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <div>Welcome to the Settlers of FullStack Demo Page!</div>
        <div>
          <h1 />
        </div>
        <div>
          In this Demo you can test out some of the features of our game, such
          as rolling the dice to gain resources and building settlements,
          without starting a full four-player game.
        </div>
        <div>
          <h1 />
        </div>
        <div>
          In Demo Mode move verification is turned off, so roads settlements and
          cities can be placed anywhere,
        </div>

        <div>
          but we still want to show off some game logic, so all moves still
          require the correct resources!
        </div>
      </div>
    )
  }
}
