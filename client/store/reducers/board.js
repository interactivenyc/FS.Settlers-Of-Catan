import {GET_BOARD} from '../actions'
export default function(state = {}, action) {
  switch (action.type) {
    case GET_BOARD:
      return action.board
    default:
      return state
  }
}
