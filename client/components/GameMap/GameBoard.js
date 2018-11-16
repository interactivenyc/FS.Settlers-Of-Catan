import React from 'react'
import MapRow from './MapRow'
import Hexagon from './Hexagon.js'
import {gameOptions} from './gameOptions'

const GameBoard = ({adjust, handleClick, board}) => {
  return (
    <div className="board" onClick={e => handleClick(e)}>
      <MapRow style={{transform: 'translateY(60%)'}}>
        <Hexagon
          gameOptions={gameOptions.row1.hex1}
          image="mountain"
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row1.hex2}
          image="pasture"
          style={{transform: 'translateX(-5%)'}}
          cityAdjust={adjust}
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row1.hex3}
          image="forest"
          style={{transform: 'translateX(-10%)'}}
          cityAdjust={adjust * 2}
          anchor
          anchorAdjust={adjust}
          board={board}
        />
      </MapRow>
      <MapRow style={{transform: 'translateY(30%)'}}>
        <Hexagon
          gameOptions={gameOptions.row2.hex1}
          image="field"
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row2.hex2}
          image="hill"
          style={{transform: 'translateX(-5%)'}}
          cityAdjust={adjust}
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row2.hex3}
          image="field"
          style={{transform: 'translateX(-10%)'}}
          cityAdjust={adjust * 2}
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row2.hex4}
          image="hill"
          style={{transform: 'translateX(-15%)'}}
          cityAdjust={adjust * 3}
          anchor
          anchorAdjust={adjust * 2}
          board={board}
        />
      </MapRow>
      <MapRow>
        <Hexagon
          gameOptions={gameOptions.row3.hex1}
          image="field"
          bottomLeftAnchor
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row3.hex2}
          image="forest"
          style={{transform: 'translateX(-5%)'}}
          cityAdjust={adjust}
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row3.hex3}
          image="desert"
          style={{transform: 'translateX(-10%)'}}
          cityAdjust={adjust * 2}
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row3.hex4}
          image="forest"
          style={{transform: 'translateX(-15%)'}}
          cityAdjust={adjust * 3}
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row3.hex5}
          image="mountain"
          style={{transform: 'translateX(-20%)'}}
          cityAdjust={adjust * 4}
          anchor
          anchorAdjust={adjust * 3}
          bottomRightAnchor
          board={board}
        />
      </MapRow>
      <MapRow style={{transform: 'translateY(-30%)'}}>
        <Hexagon
          gameOptions={gameOptions.row4.hex1}
          image="forest"
          bottomLeftAnchor
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row4.hex2}
          image="mountain"
          style={{transform: 'translateX(-5%)'}}
          cityAdjust={adjust}
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row4.hex3}
          image="pasture"
          style={{transform: 'translateX(-10%)'}}
          cityAdjust={adjust * 2}
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row4.hex4}
          image="field"
          style={{transform: 'translateX(-15%)'}}
          cityAdjust={adjust * 3}
          anchor
          anchorAdjust={adjust * 2}
          bottomRightAnchor
          board={board}
        />
      </MapRow>
      <MapRow style={{transform: 'translateY(-60%)'}}>
        <Hexagon
          gameOptions={gameOptions.row5.hex1}
          image="hill"
          bottomLeftAnchor
          bottomRightAnchor
          bottomAnchor
          anchorAdjust={adjust * -1}
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row5.hex2}
          image="field"
          style={{transform: 'translateX(-5%)'}}
          cityAdjust={adjust}
          bottomRightAnchor
          bottomAnchor
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row5.hex3}
          image="pasture"
          style={{transform: 'translateX(-10%)'}}
          cityAdjust={adjust * 2}
          anchor
          anchorAdjust={adjust}
          bottomRightAnchor
          bottomAnchor
          board={board}
        />
      </MapRow>
    </div>
  )
}

export default GameBoard
