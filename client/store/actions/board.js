import {getBoard} from './actionTypes'

export const changeVertexThunk = id => (dispatch, getState) => {
  const board = {...getState().board}

  board.vertices = {
    ...board.vertices,
    [id]: {...board.vertices[id], color: 'green'}
  }

  dispatch(getBoard(board))
}

export const changeRoadThunk = id => (dispatch, getState) => {
  const board = {...getState().board}

  board.edges = {
    ...board.edges,
    [id]: {...board.edges[id], color: 'red'}
  }

  dispatch(getBoard(board))
}
