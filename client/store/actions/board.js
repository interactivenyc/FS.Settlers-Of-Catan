import {
  getEdgeNeighborsColor,
  validateChangeEdge,
  getVerticeNeighbors,
  validateChangeVertice,
  getRoadLength
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

export const deserializeBoard = boardData => dispatch => {
  const board = new Board(boardData)
  dispatch(getBoard(board))
}

export const changeVertexThunk = id => (dispatch, getState) => {
  const {board, playerState} = getState()
  const vertice = board.vertices[id]
  const neighbors = getVerticeNeighbors(vertice, board)

  if (validateChangeVertice(neighbors, playerState.color)) {
    dispatch(createSettlement(id, playerState.color, playerState.playerNumber))
    socket.emit(
      'dispatch',
      createSettlement(id, playerState.color, playerState.playerNumber)
    )
    dispatch(changeGamePhase(null))
    dispatch(useResources(['hill', 'field', 'forest', 'pasture']))
    socket.emit('dispatch', distributeResource(playerState.id, -4))
    dispatch(updateScorePlayer(playerState.score + 1))
    socket.emit(
      'dispatch',
      updateScore(playerState.playerNumber, playerState.score + 1)
    )
  }
}

export const buildCityThunk = id => (dispatch, getState) => {
  const {board, playerState} = getState()
  const vertex = board.vertices[id]

  if (vertex.color === playerState.color) {
    dispatch(buildCity(id))
    socket.emit('dispatch', buildCity(id))
    dispatch(changeGamePhase(null))
    dispatch(
      useResources(['field', 'field', 'mountain', 'mountain', 'mountain'])
    )
    socket.emit('dispatch', distributeResource(playerState.playerNumber, -5))
    dispatch(updateScorePlayer(playerState.score + 1))
    socket.emit(
      'dispatch',
      updateScore(playerState.playerNumber, playerState.score + 1)
    )
  }
}

export const longestRoad = (edge, board, id) => (dispatch, getState) => {
  const length = getRoadLength(edge, board)
  const {players} = getState().gameState

  const updatedPlayers = players.map(player => {
    return player.id === id && player.longestRoad < length
      ? {...player, longestRoad: length}
      : {...player}
  })

  dispatch(updatePlayers(updatedPlayers))
  socket.emit('dispatch', updatePlayers(updatedPlayers))
}

export const changeRoadThunk = id => (dispatch, getState) => {
  const {board, playerState} = getState()
  const edge = board.edges[id]
  const neighbors = getEdgeNeighborsColor(edge, board)

  if (validateChangeEdge(playerState, edge, neighbors, board)) {
    dispatch(createRoad(id, playerState.color, playerState.playerNumber))
    socket.emit(
      'dispatch',
      createRoad(id, playerState.color, playerState.playerNumber)
    )
    dispatch(changeGamePhase(null))
    dispatch(useResources(['hill', 'forest']))

    const newBoard = getState().board
    const newEdge = newBoard.edges[id]

    dispatch(longestRoad(newEdge, newBoard, playerState.playerNumber))
  }
}
