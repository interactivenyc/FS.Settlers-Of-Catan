import React, {Fragment} from 'react'
import {
  getEdgeNeighborsColor,
  validateChangeEdge
} from '../../../store/actions/helpers'

class Edges extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null
    }
  }

  handleMouseEnter = event => {
    //need to be able to access hidden divs
    console.log(event.target)
    const {edges, player, board} = this.props
    const edge = edges[event.target.id]
    const neighbors = getEdgeNeighborsColor(edge, board)

    if (validateChangeEdge(player, edge, neighbors, board)) {
      const targetEdgeId = event.target.getAttribute('stateid')
      this.setState({[targetEdgeId]: player.color})
    }
  }

  handleMouseLeave = event => {
    const targetEdgeId = event.target.getAttribute('stateid')
    this.setState({[targetEdgeId]: null})
  }

  render() {
    const {sides, edges} = this.props

    return (
      <Fragment>
        <div
          className="row"
          onMouseEnter={event => this.handleMouseEnter(event)}
          onMouseLeave={event => this.handleMouseLeave(event)}
        >
          <div
            id={sides[1]}
            className={`side side-1 ${edges[sides[1]].color}`}
            stateid={1}
            style={{backgroundColor: this.state[1]}}
          />
          <div
            id={sides[2]}
            className={`side side-2 ${edges[sides[2]].color}`}
            stateid={2}
            style={{backgroundColor: this.state[2]}}
          />
        </div>
        <div className="row row-middle">
          <div
            id={sides[3]}
            className={`side side-3 ${edges[sides[3]].color}`}
            stateid={3}
            style={{backgroundColor: this.state[3]}}
          />
          <div
            id={sides[4]}
            className={`side side-4 ${edges[sides[4]] &&
              edges[sides[4]].color}`}
            stateid={4}
            style={{backgroundColor: this.state[4]}}
          />
        </div>
        <div className="row">
          <div
            id={sides[5]}
            className={`side side-5 ${edges[sides[5]] &&
              edges[sides[5]].color}`}
            stateid={5}
            style={{backgroundColor: this.state[5]}}
          />
          <div
            id={sides[6]}
            className={`side side-6 ${edges[sides[6]] &&
              edges[sides[6]].color}`}
            stateid={6}
            style={{backgroundColor: this.state[6]}}
          />
        </div>
      </Fragment>
    )
  }
}

export default Edges
