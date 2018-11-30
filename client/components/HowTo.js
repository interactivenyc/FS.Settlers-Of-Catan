import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export default class HowTo extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div style={{margin: '10px'}}>
        <div>
          Settlers of Fullstack, is a fully browser-based port of the popular
          board game settlers of Catan, a turn based strategy board game for
          four players. In Catan, you play the role of a pioneer trying to
          establish a civilization on the fictional island of Catan. You will:
        </div>
        <div>
          <h1 />
        </div>
        <div>
          1. Gather resources by rolling the dice while avoiding the mischievous
          robber, who will be activated when a 7 is rolled.
        </div>

        <div>2: Use them to build roads, settlements and cities.</div>
        <div>
          3: Trade with other players to get the right mix of wood, clay, wheat,
          stone, and wool
        </div>

        <div>
          4: Purchase development cards to bolster your army, obtain special
          ability cards, or even find a victory point!
        </div>
        <div>
          <h1 />
        </div>
        <div>
          If your civilization comes to dominate catan by obtaining 10 victory
          points, you win! Each settlement or city you build is worth 1 victory
          point, and the players with the Longest Road or Largest Army will add
          2 bonus points to their score
        </div>
        <div>
          <h1 />
        </div>
        <div>
          Click below to test out a single-player demo version of our game!
          (Demo not yet implemented)
        </div>
        <div>
          <Link to="/demo" className="navItem link">
            Launch Demo
          </Link>
        </div>
      </div>
    )
  }
}
