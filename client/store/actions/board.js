import {
  getEdgeNeighborsColor,
  validateChangeEdge,
  getVerticeNeighbors,
  validateChangeVertice,
  getLongestRoad
} from './helpers'
import Board from '../../board'

import {
  createRoad,
  createSettlement,
  getBoard,
  changeGamePhase,
  useResources,
  buildCity,
  updateScorePlayer,
  distributeResource,
  updateScore,
  updatePlayers
} from './actionTypes'
import socket from '../../socket'
import {adjustScore} from '../actions'

export const deserializeBoard = boardData => dispatch => {
  const board = new Board(boardData)
  dispatch(getBoard(board))
}

export const changeVertexThunk = id => (dispatch, getState) => {
  const {board, playerState, gameState} = getState()
  const vertice = board.vertices[id]
  const neighbors = getVerticeNeighbors(vertice, board)

  if (
    validateChangeVertice(neighbors, playerState.color) ||
    gameState.mode === 'demo'
  ) {
    dispatch(createSettlement(id, playerState.color, playerState.playerNumber))
    socket.emit(
      'dispatch',
      createSettlement(id, playerState.color, playerState.playerNumber)
    )
    dispatch(changeGamePhase(null))
    dispatch(useResources(['hill', 'field', 'forest', 'pasture']))
    dispatch(distributeResource(playerState.playerNumber, -4))
    socket.emit('dispatch', distributeResource(playerState.playerNumber, -4))
    dispatch(adjustScore(1))
  }
}

export const buildCityThunk = id => (dispatch, getState) => {
  const {board, playerState, gameState} = getState()
  const vertex = board.vertices[id]

  if (
    (vertex.color === playerState.color &&
      vertex.locationType === 'settlement') ||
    gameState.mode === 'demo'
  ) {
    dispatch(buildCity(id))
    socket.emit('dispatch', buildCity(id))
    dispatch(changeGamePhase(null))
    dispatch(
      useResources(['field', 'field', 'mountain', 'mountain', 'mountain'])
    )
    dispatch(distributeResource(playerState.playerNumber, -5))
    socket.emit('dispatch', distributeResource(playerState.playerNumber, -5))
    dispatch(adjustScore(1))
  }
}

export const changeRoadThunk = id => (dispatch, getState) => {
  const {board, playerState, gameState} = getState()
  const edge = board.edges[id]

  const neighbors = getEdgeNeighborsColor(edge, board)

  if (
    validateChangeEdge(playerState, edge, neighbors, board) ||
    gameState.mode === 'demo'
  ) {
    dispatch(createRoad(id, playerState.color, playerState.playerNumber))
    socket.emit(
      'dispatch',
      createRoad(id, playerState.color, playerState.playerNumber)
    )
    if (gameState.phase === 'build road') {
      dispatch(changeGamePhase(null))
      dispatch(useResources(['hill', 'forest']))
      dispatch(distributeResource(playerState.playerNumber, -2))
      socket.emit('dispatch', distributeResource(playerState.playerNumber, -2))
    } else if (gameState.phase === 'build road dev') {
      dispatch(changeGamePhase('build road dev 2'))
    } else if (gameState.phase === 'build road dev 2') {
      dispatch(changeGamePhase(null))
    }
    const newBoard = getState().board
    const newEdge = newBoard.edges[id]

    dispatch(longestRoad(newEdge, newBoard, playerState.playerNumber))
  }
}

export const longestRoad = (edge, board, id) => (dispatch, getState) => {
  const length = getLongestRoad(edge, board)
  const {players} = getState().gameState

  const updatedPlayers = players.map(player => {
    return player.id === id && player.longestRoad < length
      ? {...player, longestRoad: length}
      : player
  })

  dispatch(updatePlayers(updatedPlayers))
  socket.emit('dispatch', updatePlayers(updatedPlayers))
}
