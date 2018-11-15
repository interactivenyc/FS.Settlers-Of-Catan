import React from 'react'

const MapRow = props => {
  return (
    <div style={{...props.style}} className={`board-row ${props.rowClass}`}>
      {props.children}
    </div>
  )
}

export default MapRow
