import React from 'react'

const Hexagon = props => {
  const {resource, vert, sides} = props.gameOptions

  return (
    <div className="hexagon-container">
      <div
        id={vert[1]}
        style={{transform: `translate(${-50 + props.cityAdjust}%, -50%)`}}
        className="city city-1"
      />
      <div
        id={vert[2]}
        style={{transform: `translate(${-50 + props.cityAdjust}%, -50%)`}}
        className="city city-2"
      />
      {props.anchor && (
        <div
          id={vert[3]}
          className="city city-3"
          style={{transform: `translate(${props.anchorAdjust}%, -50%)`}}
        />
      )}
      {props.bottomLeftAnchor && (
        <div
          id={vert[4]}
          className="city city-4"
          style={{transform: `translate(${-50 + props.cityAdjust}%, -50%)`}}
        />
      )}
      {props.bottomRightAnchor && (
        <div
          id={vert[6]}
          className="city city-6"
          style={{transform: `translate(${props.anchorAdjust || 0}%, -50%)`}}
        />
      )}
      {props.bottomAnchor && (
        <div
          id={vert[5]}
          className="city city-5"
          style={{transform: `translate(${-50 + props.cityAdjust}%, -50%)`}}
        />
      )}
      <div style={{...props.style}} className="hexagon">
        <div
          id={resource}
          className={`inner-hexagon hexagon-image ${props.image}`}
        />
        <div className="row">
          <div id={sides[1]} className="side side-1" />
          <div id={sides[2]} className="side side-2" />
        </div>
        <div className="row row-middle">
          <div id={sides[3]} className="side side-left side-3" />
          <div id={sides[4]} className="side side-right side-4" />
        </div>
        <div className="row">
          <div id={sides[5]} className="side side-5" />
          <div id={sides[6]} className="side side-6" />
        </div>
      </div>
    </div>
  )
}

export default Hexagon
