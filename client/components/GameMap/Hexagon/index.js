import React from 'react'
import Vertices from './Vertices'
import Edges from './Edges'

const Hexagon = props => {
  const {resource, vert, sides} = props.gameOptions
  const vertices = props.board.vertices
  const edges = props.board.edges

  const number = props.board.resources[props.gameOptions.id].diceTarget

  return (
    <div className="hexagon-container" style={{...props.style}}>
      <Vertices {...props} vertices={vertices} vert={vert} />
      <div className="hexagon">
        <div
          id={resource}
          className={`inner-hexagon hexagon-image ${props.image}`}
        >
          <div className="resource-number">
            <h1>{number}</h1>
          </div>
        </div>
        <Edges sides={sides} edges={edges} />
      </div>
    </div>
  )
}

export default Hexagon
