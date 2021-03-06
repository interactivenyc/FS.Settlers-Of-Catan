import React from 'react'
import MapRow from './MapRow'
import Hexagon from './Hexagon'
import {gameOptions} from './gameOptions'

const GameBoard = ({
  adjust,
  handleClick,
  board,
  player,
  phase,
  changeGamePhase,
  playerTurn,
  mode
}) => {
  const mapAdjust = 4

  return (
    <div className="board" onClick={e => handleClick(e)}>
      <div className="port mountain" />
      <div className="port hill" />
      <div className="port forest" />
      <div className="port pasture" />
      <div className="port field" />
      <div className="port question one">
        <h3>?</h3>
        <h3>3:1</h3>
      </div>
      <div className="port question two">
        <h3>?</h3>
        <h3>3:1</h3>
      </div>
      <div className="port question three">
        <h3>?</h3>
        <h3>3:1</h3>
      </div>
      <div className="port question four">
        <h3>?</h3>
        <h3>3:1</h3>
      </div>
      <MapRow style={{transform: `translateY(${mapAdjust * 10}%)`}}>
        <Hexagon
          gameOptions={gameOptions.row1.hex1}
          image={board.resources[gameOptions.row1.hex1.id].type}
          board={board}
          player={player}
          phase={phase}
          changeGamePhase={changeGamePhase}
          playerTurn={playerTurn}
          mode={mode}
        />
        <Hexagon
          style={{transform: `translate(-${mapAdjust}%)`}}
          gameOptions={gameOptions.row1.hex2}
          image={board.resources[gameOptions.row1.hex2.id].type}
          board={board}
          player={player}
          phase={phase}
          changeGamePhase={changeGamePhase}
          playerTurn={playerTurn}
          mode={mode}
        />
        <Hexagon
          style={{transform: `translate(-${mapAdjust * 2}%)`}}
          gameOptions={gameOptions.row1.hex3}
          image={board.resources[gameOptions.row1.hex3.id].type}
          anchor
          board={board}
          player={player}
          phase={phase}
          changeGamePhase={changeGamePhase}
          playerTurn={playerTurn}
          mode={mode}
        />
      </MapRow>
      <MapRow style={{transform: `translateY(${mapAdjust * 5}%)`}}>
        <Hexagon
          gameOptions={gameOptions.row2.hex1}
          image={board.resources[gameOptions.row2.hex1.id].type}
          board={board}
          player={player}
          phase={phase}
          changeGamePhase={changeGamePhase}
          playerTurn={playerTurn}
          mode={mode}
        />
        <Hexagon
          style={{transform: `translate(-${mapAdjust}%)`}}
          gameOptions={gameOptions.row2.hex2}
          image={board.resources[gameOptions.row2.hex2.id].type}
          board={board}
          player={player}
          phase={phase}
          changeGamePhase={changeGamePhase}
          playerTurn={playerTurn}
          mode={mode}
        />
        <Hexagon
          style={{transform: `translate(-${mapAdjust * 2}%)`}}
          gameOptions={gameOptions.row2.hex3}
          image={board.resources[gameOptions.row2.hex3.id].type}
          board={board}
          player={player}
          phase={phase}
          changeGamePhase={changeGamePhase}
          playerTurn={playerTurn}
          mode={mode}
        />
        <Hexagon
          style={{transform: `translate(-${mapAdjust * 3}%)`}}
          gameOptions={gameOptions.row2.hex4}
          image={board.resources[gameOptions.row2.hex4.id].type}
          anchor
          board={board}
          player={player}
          phase={phase}
          changeGamePhase={changeGamePhase}
          playerTurn={playerTurn}
          mode={mode}
        />
      </MapRow>
      <MapRow>
        <Hexagon
          gameOptions={gameOptions.row3.hex1}
          image={board.resources[gameOptions.row3.hex1.id].type}
          bottomLeftAnchor
          board={board}
          player={player}
          phase={phase}
          changeGamePhase={changeGamePhase}
          playerTurn={playerTurn}
          mode={mode}
        />
        <Hexagon
          style={{transform: `translate(-${mapAdjust}%)`}}
          gameOptions={gameOptions.row3.hex2}
          image={board.resources[gameOptions.row3.hex2.id].type}
          cityAdjust={adjust}
          board={board}
          player={player}
          phase={phase}
          changeGamePhase={changeGamePhase}
          playerTurn={playerTurn}
          mode={mode}
        />
        <Hexagon
          style={{transform: `translate(-${mapAdjust * 2}%)`}}
          gameOptions={gameOptions.row3.hex3}
          image={board.resources[gameOptions.row3.hex3.id].type}
          board={board}
          player={player}
          phase={phase}
          changeGamePhase={changeGamePhase}
          playerTurn={playerTurn}
          mode={mode}
        />
        <Hexagon
          style={{transform: `translate(-${mapAdjust * 3}%)`}}
          gameOptions={gameOptions.row3.hex4}
          image={board.resources[gameOptions.row3.hex4.id].type}
          board={board}
          player={player}
          phase={phase}
          changeGamePhase={changeGamePhase}
          playerTurn={playerTurn}
          mode={mode}
        />
        <Hexagon
          style={{transform: `translate(-${mapAdjust * 4}%)`}}
          gameOptions={gameOptions.row3.hex5}
          image={board.resources[gameOptions.row3.hex5.id].type}
          anchor
          bottomRightAnchor
          board={board}
          player={player}
          phase={phase}
          changeGamePhase={changeGamePhase}
          playerTurn={playerTurn}
          mode={mode}
        />
      </MapRow>
      <MapRow style={{transform: `translateY(-${mapAdjust * 5}%)`}}>
        <Hexagon
          gameOptions={gameOptions.row4.hex1}
          image={board.resources[gameOptions.row4.hex1.id].type}
          bottomLeftAnchor
          board={board}
          player={player}
          phase={phase}
          changeGamePhase={changeGamePhase}
          playerTurn={playerTurn}
          mode={mode}
        />
        <Hexagon
          style={{transform: `translate(-${mapAdjust}%)`}}
          gameOptions={gameOptions.row4.hex2}
          image={board.resources[gameOptions.row4.hex2.id].type}
          board={board}
          player={player}
          phase={phase}
          changeGamePhase={changeGamePhase}
          playerTurn={playerTurn}
          mode={mode}
        />
        <Hexagon
          style={{transform: `translate(-${mapAdjust * 2}%)`}}
          gameOptions={gameOptions.row4.hex3}
          image={board.resources[gameOptions.row4.hex3.id].type}
          board={board}
          player={player}
          phase={phase}
          changeGamePhase={changeGamePhase}
          playerTurn={playerTurn}
          mode={mode}
        />
        <Hexagon
          style={{transform: `translate(-${mapAdjust * 3}%)`}}
          gameOptions={gameOptions.row4.hex4}
          image={board.resources[gameOptions.row4.hex4.id].type}
          anchor
          bottomRightAnchor
          board={board}
          player={player}
          phase={phase}
          changeGamePhase={changeGamePhase}
          playerTurn={playerTurn}
          mode={mode}
        />
      </MapRow>
      <MapRow style={{transform: `translateY(-${mapAdjust * 10}%)`}}>
        <Hexagon
          gameOptions={gameOptions.row5.hex1}
          image={board.resources[gameOptions.row5.hex1.id].type}
          bottomLeftAnchor
          bottomRightAnchor
          bottomAnchor
          board={board}
          player={player}
          phase={phase}
          changeGamePhase={changeGamePhase}
          playerTurn={playerTurn}
          mode={mode}
        />
        <Hexagon
          style={{transform: `translate(-${mapAdjust}%)`}}
          gameOptions={gameOptions.row5.hex2}
          image={board.resources[gameOptions.row5.hex2.id].type}
          bottomAnchor
          board={board}
          player={player}
          phase={phase}
          changeGamePhase={changeGamePhase}
          playerTurn={playerTurn}
          mode={mode}
        />
        <Hexagon
          style={{transform: `translate(-${mapAdjust * 2}%)`}}
          gameOptions={gameOptions.row5.hex3}
          image={board.resources[gameOptions.row5.hex3.id].type}
          anchor
          bottomLeftAnchor
          bottomRightAnchor
          bottomAnchor
          board={board}
          player={player}
          phase={phase}
          changeGamePhase={changeGamePhase}
          playerTurn={playerTurn}
          mode={mode}
        />
      </MapRow>
    </div>
  )
}

export default GameBoard
