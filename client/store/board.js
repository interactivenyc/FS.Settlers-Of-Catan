import Board from '../board'

/**
 * ACTION TYPES
 */
const GET_BOARD = 'GET_BOARD'

/**
 * INITIAL STATE
 */
// const defaultBoard = {...new Board()}

/**
 * ACTION CREATORS
 */
const getBoard = board => ({type: GET_BOARD, board})

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_BOARD:
      return action.board
    default:
      return state
  }
}
