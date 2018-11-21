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

  componentDidMount() {
    const {sides, edges, board, player} = this.props
    for (const side in sides) {
      const edge = edges[sides[side]]
      const neighbors = getEdgeNeighborsColor(edge, board)

      if (validateChangeEdge(player, edge, neighbors, board)) {
        this.setState({[side]: `build-player-${player.playerNumber}`})
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const {sides, edges, board, player} = this.props
      for (const side in sides) {
        const edge = edges[sides[side]]
        const neighbors = getEdgeNeighborsColor(edge, board)

        if (validateChangeEdge(player, edge, neighbors, board)) {
          this.setState({[side]: `build-player-${player.playerNumber}`})
        }
      }
    }
  }

  // handleMouseEnter = event => {
  //   //need to be able to access hidden divs
  //   const { edges, player, board } = this.props
  //   const edge = edges[event.target.id]
  //   const neighbors = getEdgeNeighborsColor(edge, board)

  //   if (validateChangeEdge(player, edge, neighbors, board)) {
  //     const targetEdgeId = event.target.getAttribute('stateid')
  //     this.setState({ [targetEdgeId]: `build-player-${player.playerNumber}` })
  //   }
  // }

  // handleMouseLeave = event => {
  //   const targetEdgeId = event.target.getAttribute('stateid')
  //   this.setState({ [targetEdgeId]: null })
  // }

  render() {
    const {sides, edges} = this.props

    return (
      <Fragment>
        <div className="row">
          <div
            id={sides[1]}
            className={`side side-1 ${edges[sides[1]].color} ${this.state[1]}`}
          />
          <div
            id={sides[2]}
            className={`side side-2 ${edges[sides[2]].color} ${this.state[2]}`}
          />
        </div>
        <div className="row row-middle">
          <div
            id={sides[3]}
            className={`side side-3 ${edges[sides[3]].color} ${this.state[3]}`}
          />
          <div
            id={sides[4]}
            className={`side side-4 ${edges[sides[4]] &&
              edges[sides[4]].color} ${this.state[4]}`}
          />
        </div>
        <div className="row">
          <div
            id={sides[5]}
            className={`side side-5 ${edges[sides[5]] &&
              edges[sides[5]].color} ${this.state[5]}`}
          />
          <div
            id={sides[6]}
            className={`side side-6 ${edges[sides[6]] &&
              edges[sides[6]].color} ${this.state[6]}`}
          />
        </div>
      </Fragment>
    )
  }
}

export default Edges
