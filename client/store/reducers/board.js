import {GET_BOARD} from '../actions'
import Board from '../../board'

const defaultBoard = new Board()

export default function(state = defaultBoard, action) {
  switch (action.type) {
    case GET_BOARD:
      return action.board
    default:
      return state
  }
}
