import React, {Fragment} from 'react'

const Vertices = ({
  vert,
  anchor,
  vertices,
  bottomLeftAnchor,
  bottomRightAnchor,
  bottomAnchor
}) => {
  return (
    <Fragment>
      <div id={vert[1]} className={`city city-1 ${vertices[vert[1]].color}`} />
      <div id={vert[2]} className={`city city-2 ${vertices[vert[2]].color}`} />
      {anchor && (
        <div
          id={vert[3]}
          className={`city city-3 ${vertices[vert[3]].color}`}
        />
      )}
      {bottomLeftAnchor && (
        <div
          id={vert[4]}
          className={`city city-4 ${vertices[vert[4]].color}`}
        />
      )}
      {bottomRightAnchor && (
        <div
          id={vert[6]}
          className={`city city-6 ${vertices[vert[6]].color}`}
        />
      )}
      {bottomAnchor && (
        <div
          id={vert[5]}
          className={`city city-5 ${vertices[vert[5]].color}`}
        />
      )}
    </Fragment>
  )
}

export default Vertices
