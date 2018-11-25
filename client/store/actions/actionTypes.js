// User action Types
export const GET_USER = 'GET_USER'
export const REMOVE_USER = 'REMOVE_USER'

export const getUser = user => ({type: GET_USER, user})
export const removeUser = () => ({type: REMOVE_USER})

// Board action Types
export const GET_BOARD = 'GET_BOARD'
export const CREATE_ROAD = 'CREATE_ROAD'
export const CREATE_SETTLEMENT = 'CREATE_SETTLEMENT'
export const ROLL_DICE = 'ROLL_DICE'
export const MOVE_ROBBER = 'MOVE_ROBBER'

export const getBoard = board => ({type: GET_BOARD, board})
export const rollDice = dieRolls => ({type: ROLL_DICE, dieRolls})
export const moveRobber = resource => ({type: MOVE_ROBBER, resource})
export const createRoad = (id, color, number) => ({
  type: CREATE_ROAD,
  id,
  color,
  number
})
export const createSettlement = (id, color, number) => ({
  type: CREATE_SETTLEMENT,
  id,
  color,
  number
})

//Player State Action Types
export const ASSIGN_PLAYER = 'ASSIGN_PLAYER'
export const GET_HAND = 'GET_HAND'
export const ADD_CARD = 'ADD_CARD'
export const DELETE_CARD = 'DELETE_CARD'
export const UPDATE_SCORE_PLAYER = 'UPDATE_SCORE_PLAYER'
export const SET_RESOURCES = 'SET_RESOURCES'
export const ROB_PLAYER = 'ROB_PLAYER'

export const assignPlayer = (number, color) => ({
  type: ASSIGN_PLAYER,
  number,
  color
})
export const getHand = () => ({type: GET_HAND})
export const addCard = hand => ({type: ADD_CARD, hand})
export const deleteCard = hand => ({type: DELETE_CARD, hand})
export const updateScorePlayer = updatedScore => ({
  type: UPDATE_SCORE_PLAYER,
  updatedScore
})
export const setResources = resources => ({
  type: SET_RESOURCES,
  resources
})

// game State action types
export const START_GAME = 'START_GAME'
export const SET_GAME_USERS = 'SET_GAME_USERS'
export const NEXT_PLAYER = 'NEXT_PLAYER'
export const TOGGLE_MODAL = 'TOGGLE_MODAL'
export const DISTRIBUTE_RESOURCE = 'DISTRIBUTE_RESOURCE'
export const DISTRIBUTE_RESOURCE_PLAYER = 'DISTRIBUTE_RESOURCE_PLAYER'
export const MAKE_OFFER = 'MAKE_OFFER'
export const RECEIVE_OFFER = 'RECEIVE_OFFER'
export const ACCEPT_OFFER = 'ACCEPT_OFFER'
export const REJECT_OFFER = 'REJECT_OFFER'
export const UPDATE_SCORE = 'UPDATE_SCORE'
export const UPDATE_PLAYERS = 'UPDATE_PLAYERS'
export const CHANGE_PHASE = 'CHANGE_PHASE'

export const updatePlayers = players => ({type: UPDATE_PLAYERS, players})
export const startGame = () => ({
  type: START_GAME,
  modle: false,
  playerTurn: 1
})
export const toggleModal = view => ({
  type: TOGGLE_MODAL,
  modal: view
})
export const nextPlayer = playerNumber => ({type: NEXT_PLAYER, playerNumber})
export const distributeResourcePlayer = (resource, id) => ({
  type: DISTRIBUTE_RESOURCE_PLAYER,
  resource,
  id
})
export const distributeResource = id => ({type: DISTRIBUTE_RESOURCE, id})
export const updateScore = (playerId, updatedScore) => ({
  type: UPDATE_SCORE,
  playerId,
  updatedScore
})
export const changePhase = phase => ({type: CHANGE_PHASE, phase})
