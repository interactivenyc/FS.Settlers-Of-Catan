import React from 'react'
import MapRow from './MapRow'
import Hexagon from './Hexagon'
import {gameOptions} from './gameOptions'
import Dice from '../Dice'

const mapAdjust = 5

const GameBoard = ({adjust, handleClick, board, die1, die2}) => {
  return (
    <div className="board" onClick={e => handleClick(e)}>
      <MapRow style={{transform: 'translateY(60%)'}}>
        <Hexagon
          gameOptions={gameOptions.row1.hex1}
          image={board.resources[gameOptions.row1.hex1.id].type}
          board={board}
        />
        <Hexagon
          style={{transform: `translateX(-${mapAdjust}%)`}}
          gameOptions={gameOptions.row1.hex2}
          image={board.resources[gameOptions.row1.hex2.id].type}
          cityAdjust={adjust}
          board={board}
        />
        <Hexagon
          style={{transform: `translateX(-${mapAdjust * 2}%)`}}
          gameOptions={gameOptions.row1.hex3}
          image={board.resources[gameOptions.row1.hex3.id].type}
          cityAdjust={adjust * 2}
          anchor
          anchorAdjust={adjust}
          board={board}
        />
      </MapRow>
      <MapRow style={{transform: 'translateY(30%)'}}>
        <Hexagon
          gameOptions={gameOptions.row2.hex1}
          image={board.resources[gameOptions.row2.hex1.id].type}
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row2.hex2}
          image={board.resources[gameOptions.row2.hex2.id].type}
          style={{transform: `translateX(-${mapAdjust}%)`}}
          cityAdjust={adjust}
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row2.hex3}
          image={board.resources[gameOptions.row2.hex3.id].type}
          style={{transform: `translateX(-${mapAdjust * 2}%)`}}
          cityAdjust={adjust * 2}
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row2.hex4}
          image={board.resources[gameOptions.row2.hex4.id].type}
          style={{transform: `translateX(-${mapAdjust * 3}%)`}}
          cityAdjust={adjust * 3}
          anchor
          anchorAdjust={adjust * 2}
          board={board}
        />
      </MapRow>
      <MapRow>
        <Hexagon
          gameOptions={gameOptions.row3.hex1}
          image={board.resources[gameOptions.row3.hex1.id].type}
          bottomLeftAnchor
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row3.hex2}
          image={board.resources[gameOptions.row3.hex2.id].type}
          style={{transform: `translateX(-${mapAdjust}%)`}}
          cityAdjust={adjust}
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row3.hex3}
          image={board.resources[gameOptions.row3.hex3.id].type}
          style={{transform: `translateX(-${mapAdjust * 2}%)`}}
          cityAdjust={adjust * 2}
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row3.hex4}
          image={board.resources[gameOptions.row3.hex4.id].type}
          style={{transform: `translateX(-${mapAdjust * 3}%)`}}
          cityAdjust={adjust * 3}
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row3.hex5}
          image={board.resources[gameOptions.row3.hex5.id].type}
          style={{transform: `translateX(-${mapAdjust * 4}%)`}}
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
          image={board.resources[gameOptions.row4.hex1.id].type}
          bottomLeftAnchor
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row4.hex2}
          image={board.resources[gameOptions.row4.hex2.id].type}
          style={{transform: `translateX(-${mapAdjust}%)`}}
          cityAdjust={adjust}
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row4.hex3}
          image={board.resources[gameOptions.row4.hex3.id].type}
          style={{transform: `translateX(-${mapAdjust * 2}%)`}}
          cityAdjust={adjust * 2}
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row4.hex4}
          image={board.resources[gameOptions.row4.hex4.id].type}
          style={{transform: `translateX(-${mapAdjust * 3}%)`}}
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
          image={board.resources[gameOptions.row5.hex1.id].type}
          bottomLeftAnchor
          bottomRightAnchor
          bottomAnchor
          anchorAdjust={adjust * -1}
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row5.hex2}
          image={board.resources[gameOptions.row5.hex2.id].type}
          style={{transform: `translateX(-${mapAdjust}%)`}}
          cityAdjust={adjust}
          bottomAnchor
          board={board}
        />
        <Hexagon
          gameOptions={gameOptions.row5.hex3}
          image={board.resources[gameOptions.row5.hex3.id].type}
          style={{transform: `translateX(-${mapAdjust * 2}%)`}}
          cityAdjust={adjust * 2}
          anchor
          anchorAdjust={adjust}
          bottomLeftAnchor
          bottomRightAnchor
          bottomAnchor
          board={board}
        />
      </MapRow>
      <Dice die1={die1} die2={die2} />
    </div>
  )
}

export default GameBoard
