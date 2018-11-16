import Board from '../../board'
import {getBoard} from './actionTypes'

export const changeVertexThunk = id => (dispatch, getState) => {
  const {board} = getState()

  board.vertices = {
    ...board.vertices,
    [id]: {...board.vertices[id], color: 'green'}
  }

  dispatch(getBoard(board))
}
