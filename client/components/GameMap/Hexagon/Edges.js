import React, {Fragment} from 'react'

const Edges = ({sides, edges}) => {
  return (
    <Fragment>
      <div className="row">
        <div id={sides[1]} className={`side side-1 ${edges[sides[1]].color}`} />
        <div id={sides[2]} className={`side side-2 ${edges[sides[2]].color}`} />
      </div>
      <div className="row row-middle">
        <div id={sides[3]} className={`side side-3 ${edges[sides[3]].color}`} />
        <div
          id={sides[4]}
          className={`side side-4 ${edges[sides[4]] && edges[sides[4]].color}`}
        />
      </div>
      <div className="row">
        <div
          id={sides[5]}
          className={`side side-5 ${edges[sides[5]] && edges[sides[5]].color}`}
        />
        <div
          id={sides[6]}
          className={`side side-6 ${edges[sides[6]] && edges[sides[6]].color}`}
        />
      </div>
    </Fragment>
  )
}

export default Edges
