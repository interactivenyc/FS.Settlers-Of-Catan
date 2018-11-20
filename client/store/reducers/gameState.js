import {START_GAME, NEXT_PLAYER, SET_GAME_USERS} from '../actions'
import {ROLL_DICE} from '../actions/actionTypes'

const defaultState = {
  playerTurn: 1,
  modle: false,
  players: [
    {id: 1, resources: 1, score: 0},
    {id: 2, resources: 2, score: 0},
    {id: 3, resources: 3, score: 0},
    {id: 4, resources: 4, score: 0}
  ],
  die1: 0,
  die2: 0
}

const gameState = (state = defaultState, action) => {
  switch (action.type) {
    case SET_GAME_USERS:
      return {...state, players: action.users}
    case START_GAME:
      return {...state, playerTurn: action.playerTurn, modle: action.modle}
    case NEXT_PLAYER:
      return {
        ...state,
        playerTurn: action.playerNumber + 1 < 5 ? action.playerNumber + 1 : 1
      }
    case ROLL_DICE:
      return {
        ...state,
        die1: action.dieRolls[0],
        die2: action.dieRolls[1]
      }
    default:
      return state
  }
}

export default gameState
