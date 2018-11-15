import React from 'react'
import MapRow from './MapRow'
import Hexagon from './Hexagon.js'

const GameBoard = ({adjust, handleClick}) => {
  return (
    <div className="board" onClick={e => handleClick(e)}>
      <MapRow style={{transform: 'translateY(60%)'}}>
        <Hexagon image="mountain" />
        <Hexagon
          image="pasture"
          style={{transform: 'translateX(-5%)'}}
          cityAdjust={adjust}
        />
        <Hexagon
          image="forest"
          style={{transform: 'translateX(-10%)'}}
          cityAdjust={adjust * 2}
          anchor
          anchorAdjust={adjust}
        />
      </MapRow>
      <MapRow style={{transform: 'translateY(30%)'}}>
        <Hexagon image="field" />
        <Hexagon
          image="hill"
          style={{transform: 'translateX(-5%)'}}
          cityAdjust={adjust}
        />
        <Hexagon
          image="field"
          style={{transform: 'translateX(-10%)'}}
          cityAdjust={adjust * 2}
        />
        <Hexagon
          image="hill"
          style={{transform: 'translateX(-15%)'}}
          cityAdjust={adjust * 3}
          anchor
          anchorAdjust={adjust * 2}
        />
      </MapRow>
      <MapRow>
        <Hexagon image="field" bottomLeftAnchor />
        <Hexagon
          image="forest"
          style={{transform: 'translateX(-5%)'}}
          cityAdjust={adjust}
        />
        <Hexagon
          image="desert"
          style={{transform: 'translateX(-10%)'}}
          cityAdjust={adjust * 2}
        />
        <Hexagon
          image="forest"
          style={{transform: 'translateX(-15%)'}}
          cityAdjust={adjust * 3}
        />
        <Hexagon
          image="mountain"
          style={{transform: 'translateX(-20%)'}}
          cityAdjust={adjust * 4}
          anchor
          anchorAdjust={adjust * 3}
          bottomRightAnchor
        />
      </MapRow>
      <MapRow style={{transform: 'translateY(-30%)'}}>
        <Hexagon image="forest" bottomLeftAnchor />
        <Hexagon
          image="mountain"
          style={{transform: 'translateX(-5%)'}}
          cityAdjust={adjust}
        />
        <Hexagon
          image="pasture"
          style={{transform: 'translateX(-10%)'}}
          cityAdjust={adjust * 2}
        />
        <Hexagon
          image="field"
          style={{transform: 'translateX(-15%)'}}
          cityAdjust={adjust * 3}
          anchor
          anchorAdjust={adjust * 2}
          bottomRightAnchor
        />
      </MapRow>
      <MapRow style={{transform: 'translateY(-60%)'}}>
        <Hexagon
          image="hill"
          bottomLeftAnchor
          bottomRightAnchor
          bottomAnchor
          anchorAdjust={adjust * -1}
        />
        <Hexagon
          image="field"
          style={{transform: 'translateX(-5%)'}}
          cityAdjust={adjust}
          bottomRightAnchor
          bottomAnchor
        />
        <Hexagon
          image="pasture"
          style={{transform: 'translateX(-10%)'}}
          cityAdjust={adjust * 2}
          anchor
          anchorAdjust={adjust}
          bottomRightAnchor
          bottomAnchor
        />
      </MapRow>
    </div>
  )
}

export default GameBoard
