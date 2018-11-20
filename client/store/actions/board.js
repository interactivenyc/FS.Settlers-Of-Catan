import {
  getEdgeNeighborsColor,
  validateChangeEdge,
  getVerticeNeighbors,
  validateChangeVertice
} from './helpers'

import {createRoad, createSettlement} from './actionTypes'
import socket from '../../socket'

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
