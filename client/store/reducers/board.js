import {GET_BOARD, CHANGE_VERTEX_COLOR} from '../actions'
import Board from '../../board'

const defaultBoard = new Board()

export default function(state = defaultBoard, action) {
  switch (action.type) {
    case GET_BOARD:
      return action.board
    case CHANGE_VERTEX_COLOR:
      return action.board
    default:
      return state
  }
}
