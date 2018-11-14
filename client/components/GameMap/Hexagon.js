import React from 'react'

const Hexagon = props => {
  return (
    <div className="hexagon-container">
      <div
        style={{transform: `translate(${-50 + props.cityAdjust}%, -50%)`}}
        className="city city-1"
      />
      <div
        style={{transform: `translate(${-50 + props.cityAdjust}%, -50%)`}}
        className="city city-2"
      />
      {props.anchor && (
        <div
          className="city city-3"
          style={{transform: `translate(${50 + props.cityAdjust}%, -50%)`}}
        />
      )}
      {props.bottomLeftAnchor && (
        <div
          className="city city-4"
          style={{transform: `translate(${50 + props.cityAdjust}%, -50%)`}}
        />
      )}
      {props.bottomRightAnchor && (
        <div
          className="city city-6"
          style={{transform: `translate(${50 + props.cityAdjust}%, -50%)`}}
        />
      )}
      {props.bottomAnchor && (
        <div
          className="city city-5"
          style={{transform: `translate(${-50 + props.cityAdjust}%, -50%)`}}
        />
      )}
      <div style={{...props.style}} className="hexagon">
        <div className="inner-hexagon" />
        <div className="row">
          <div className="side side-1" />
          <div className="side side-2" />
        </div>
        <div className="row row-middle">
          <div className="side side-left side-3" />
          <div className="side side-right side-4" />
        </div>
        <div className="row">
          <div className="side side-5" />
          <div className="side side-6" />
        </div>
      </div>
    </div>
  )
}

export default Hexagon
