import React, {Fragment} from 'react'
import {
  getVerticeNeighbors,
  validateChangeVertice
} from '../../../store/actions/helpers'

class Vertices extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null
      },
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null
    }
  }

  handleMouseEnter = event => {
    const {vertices, player, playerTurn, phase} = this.props
    if (playerTurn === player.playerNumber) {
      const vertex = vertices[event.target.id]
      const targetVertId = event.target.getAttribute('stateid')

      if (phase === 'build city' && vertex.color === player.color) {
        this.setState({city: {...this.state.city, [targetVertId]: 'valid'}})
      } else if (phase === 'build settlement') {
        const neighbors = getVerticeNeighbors(vertex, this.props.board)
        if (validateChangeVertice(neighbors, player.color)) {
          this.setState({[targetVertId]: player.color})
        }
      }
    }
  }

  handleMouseLeave = event => {
    const targetVertId = event.target.getAttribute('stateid')
    this.setState({[targetVertId]: null})
    this.setState({city: {...this.state.city, [targetVertId]: null}})
  }

  render() {
    const {
      vert,
      anchor,
      vertices,
      bottomLeftAnchor,
      bottomRightAnchor,
      bottomAnchor,
      player,
      handleSettlementClassList
    } = this.props

    return (
      <div
        onMouseEnter={event => this.handleMouseEnter(event)}
        onMouseLeave={event => this.handleMouseLeave(event)}
      >
        <Fragment>
          <div
            id={vert[1]}
            className={`${handleSettlementClassList(1, vert[1], vertices)} ${
              vertices[vert[1]].locationType
            }-player-${vertices[vert[1]].player} ${this.state.city[1]}-city-${
              player.playerNumber
            }`}
            stateid={1}
            style={{backgroundColor: this.state[1]}}
          />
          <div
            id={vert[2]}
            className={`${handleSettlementClassList(2, vert[2], vertices)} ${
              vertices[vert[2]].locationType
            }-player-${vertices[vert[2]].player} ${this.state.city[2]}-city-${
              player.playerNumber
            }`}
            stateid={2}
            style={{backgroundColor: this.state[2]}}
          />
          {anchor && (
            <div
              id={vert[3]}
              className={`${handleSettlementClassList(3, vert[3], vertices)} ${
                vertices[vert[3]].locationType
              }-player-${vertices[vert[3]].player} ${this.state.city[3]}-city-${
                player.playerNumber
              }`}
              stateid={3}
              style={{backgroundColor: this.state[3]}}
            />
          )}
          {bottomLeftAnchor && (
            <div
              id={vert[4]}
              className={`${handleSettlementClassList(4, vert[4], vertices)} ${
                vertices[vert[4]].locationType
              }-player-${vertices[vert[4]].player} ${this.state.city[4]}-city-${
                player.playerNumber
              }`}
              stateid={4}
              style={{backgroundColor: this.state[4]}}
            />
          )}
          {bottomRightAnchor && (
            <div
              id={vert[6]}
              className={`${handleSettlementClassList(6, vert[6], vertices)} ${
                vertices[vert[6]].locationType
              }-player-${vertices[vert[6]].player} ${this.state.city[6]}-city-${
                player.playerNumber
              }`}
              stateid={6}
              style={{backgroundColor: this.state[6]}}
            />
          )}
          {bottomAnchor && (
            <div
              id={vert[5]}
              className={`${handleSettlementClassList(5, vert[5], vertices)} ${
                vertices[vert[5]].locationType
              }-player-${vertices[vert[5]].player} ${this.state.city[5]}-city-${
                player.playerNumber
              }`}
              stateid={5}
              style={{backgroundColor: this.state[5]}}
            />
          )}
        </Fragment>
      </div>
    )
  }
}

export default Vertices
