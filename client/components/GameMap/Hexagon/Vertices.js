import React, {Fragment} from 'react'

const Vertices = ({
  vert,
  anchor,
  vertices,
  bottomLeftAnchor,
  bottomRightAnchor,
  bottomAnchor,
  handleSettlementClassList
}) => {
  return (
    <Fragment>
      <div
        id={vert[1]}
        className={handleSettlementClassList(1, vert[1], vertices)}
      />
      <div
        id={vert[2]}
        className={handleSettlementClassList(2, vert[2], vertices)}
      />
      {anchor && (
        <div
          id={vert[3]}
          className={handleSettlementClassList(3, vert[3], vertices)}
        />
      )}
      {bottomLeftAnchor && (
        <div
          id={vert[4]}
          className={handleSettlementClassList(4, vert[4], vertices)}
        />
      )}
      {bottomRightAnchor && (
        <div
          id={vert[6]}
          className={handleSettlementClassList(6, vert[6], vertices)}
        />
      )}
      {bottomAnchor && (
        <div
          id={vert[5]}
          className={handleSettlementClassList(5, vert[5], vertices)}
        />
      )}
    </Fragment>
  )
}

export default Vertices
