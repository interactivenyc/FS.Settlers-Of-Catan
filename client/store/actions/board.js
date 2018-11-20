import {
  getEdgeNeighborsColor,
  validateChangeEdge,
  getVerticeNeighbors,
  validateChangeVertice
} from './helpers'
import Board from '../../board'

import {createRoad, createSettlement, getBoard} from './actionTypes'
import socket from '../../socket'

export const deserializeBoard = boardData => dispatch => {
  const board = new Board(boardData)
  dispatch(getBoard(board))
}

export const changeVertexThunk = id => (dispatch, getState) => {
  const {board, user} = getState()
  const vertice = board.vertices[id]
  const neighbors = getVerticeNeighbors(vertice, board)

  if (validateChangeVertice(user, vertice, neighbors)) {
    dispatch(createSettlement(id, user.color))
    socket.emit('dispatch', createSettlement(id, user.color))
  }
}

export const changeRoadThunk = id => (dispatch, getState) => {
  const {board, user} = getState()
  const edge = board.edges[id]
  const neighbors = getEdgeNeighborsColor(edge, board)

  if (validateChangeEdge(user, edge, neighbors, board)) {
    dispatch(createRoad(id, user.color))
    socket.emit('dispatch', createRoad(id, user.color))
  }
}
