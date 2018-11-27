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

  if (validateChangeVertice(neighbors)) {
    dispatch(createSettlement(id, playerState.color, playerState.playerNumber))
    socket.emit(
      'dispatch',
      createSettlement(id, playerState.color, playerState.playerNumber)
    )
  }
}

export const longestRoad = (edge, board, id) => (dispatch, getState) => {
  const length = getRoadLength(edge, board)
  const {players} = getState().gameState

  const updatedPlayers = players.map(player => {
    return player.id === id && player.longestRoad < length
      ? {...player, longestRoad: length}
      : player
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

    const newBoard = getState().board
    const newEdge = newBoard.edges[id]

    dispatch(longestRoad(newEdge, newBoard, playerState.playerNumber))
  }
}
