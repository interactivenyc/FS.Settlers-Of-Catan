import React from 'react'
import Vertices from './Vertices'
import Edges from './Edges'

const Hexagon = props => {
  const {resource, vert, sides} = props.gameOptions
  const vertices = props.board.vertices
  const edges = props.board.edges

  return (
    <div className="hexagon-container" style={{...props.style}}>
      <Vertices {...props} vertices={vertices} vert={vert} />
      <div className="hexagon">
        <div
          id={resource}
          className={`inner-hexagon hexagon-image ${props.image}`}
        >
          <div className="resource-number">6</div>
        </div>
        <Edges sides={sides} edges={edges} />
      </div>
    </div>
  )
}

export default Hexagon
