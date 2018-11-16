// User action Types
export const GET_USER = 'GET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USER_COLOR = 'SET_USER_COLOR'

export const getUser = user => ({type: GET_USER, user})
export const removeUser = () => ({type: REMOVE_USER})
export const setUserColor = color => ({type: SET_USER_COLOR, color})

// Board action Types
export const GET_BOARD = 'GET_BOARD'
export const CHANGE_VERTEX_COLOR = 'CHANGE_VERTEX_COLOR'

export const getBoard = board => ({type: GET_BOARD, board})
export const changeVertexColor = (id, color) => ({
  type: CHANGE_VERTEX_COLOR,
  color,
  id
})
