import React, {Fragment} from 'react'
import {
  getVerticeNeighbors,
  validateChangeVertice
} from '../../../store/actions/helpers'

class Vertices extends React.Component {
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
    const {vertices, player} = this.props
    const vertex = vertices[event.target.id]
    const neighbors = getVerticeNeighbors(vertex, this.props.board)
    if (validateChangeVertice(neighbors, player.color)) {
      const targetVertId = event.target.getAttribute('stateid')
      this.setState({[targetVertId]: player.color})
    }
  }

  handleMouseLeave = event => {
    const targetVertId = event.target.getAttribute('stateid')
    this.setState({[targetVertId]: null})
  }

  render() {
    const {
      vert,
      anchor,
      vertices,
      bottomLeftAnchor,
      bottomRightAnchor,
      bottomAnchor
    } = this.props

    return (
      <div
        onMouseEnter={event => this.handleMouseEnter(event)}
        onMouseLeave={event => this.handleMouseLeave(event)}
      >
        <Fragment>
          <div
            id={vert[1]}
            className={`city city-1 ${vertices[vert[1]].color}`}
            stateid={1}
            style={{backgroundColor: this.state[1]}}
          />
          <div
            id={vert[2]}
            className={`city city-2 ${vertices[vert[2]].color}`}
            stateid={2}
            style={{backgroundColor: this.state[2]}}
          />
          {anchor && (
            <div
              id={vert[3]}
              className={`city city-3 ${vertices[vert[3]].color}`}
              stateid={3}
              style={{backgroundColor: this.state[3]}}
            />
          )}
          {bottomLeftAnchor && (
            <div
              id={vert[4]}
              className={`city city-4 ${vertices[vert[4]].color}`}
              stateid={4}
              style={{backgroundColor: this.state[4]}}
            />
          )}
          {bottomRightAnchor && (
            <div
              id={vert[6]}
              className={`city city-6 ${vertices[vert[6]].color}`}
              stateid={6}
              style={{backgroundColor: this.state[6]}}
            />
          )}
          {bottomAnchor && (
            <div
              id={vert[5]}
              className={`city city-5 ${vertices[vert[5]].color}`}
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
