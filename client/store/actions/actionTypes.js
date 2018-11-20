// User action Types
export const GET_USER = 'GET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const ASSIGN_PLAYER = 'ASSIGN_PLAYER'

export const getUser = user => ({type: GET_USER, user})
export const removeUser = () => ({type: REMOVE_USER})
export const assignPlayer = (number, color) => ({
  type: ASSIGN_PLAYER,
  number,
  color
})

// Board action Types
export const GET_BOARD = 'GET_BOARD'
export const CREATE_ROAD = 'CREATE_ROAD'
export const CREATE_SETTLEMENT = 'CREATE_SETTLEMENT'

export const getBoard = board => ({type: GET_BOARD, board})
export const createRoad = (id, color) => ({type: CREATE_ROAD, id, color})
export const createSettlement = (id, color) => ({
  type: CREATE_SETTLEMENT,
  id,
  color
})

// play State action types
export const START_GAME = 'START_GAME'
export const NEXT_PLAYER = 'NEXT_PLAYER'

export const startGame = () => ({
  type: START_GAME,
  modle: false,
  playerTurn: 1
})
export const nextPlayer = playerNumber => ({type: NEXT_PLAYER, playerNumber})
