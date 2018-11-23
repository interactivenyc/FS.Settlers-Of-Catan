import {
  GET_BOARD,
  CREATE_ROAD,
  CREATE_SETTLEMENT,
  MOVE_ROBBER
} from '../actions'
import Board from '../../board'

const defaultBoard = {}
let newBoard

export default function(state = defaultBoard, action) {
  switch (action.type) {
    case GET_BOARD:
      return action.board
    case CREATE_ROAD:
      newBoard = new Board(JSON.stringify(state))
      newBoard.edges[action.id].color = action.color
      newBoard.edges[action.id].player = action.number
      return newBoard
    case CREATE_SETTLEMENT:
      newBoard = new Board(JSON.stringify(state))
      newBoard.vertices[action.id].color = action.color
      newBoard.vertices[action.id].player = action.number
      return newBoard
    case MOVE_ROBBER:
      return {...state, robberLocation: action.resource}
    default:
      return state
  }
}
