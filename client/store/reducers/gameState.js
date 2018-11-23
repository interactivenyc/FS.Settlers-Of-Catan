import {
  START_GAME,
  NEXT_PLAYER,
  DISTRIBUTE_RESOURCE,
  ROLL_DICE,
  TOGGLE_MODAL,
  UPDATE_SCORE
} from '../actions'

const defaultState = {
  playerTurn: 1,
  modle: false,
  players: [
    {id: 1, resources: 0, score: 0},
    {id: 2, resources: 0, score: 0},
    {id: 3, resources: 0, score: 0},
    {id: 4, resources: 0, score: 0}
  ],
  die1: 0,
  die2: 0
}

/* eslint-disable complexity */
const gameState = (state = defaultState, action) => {
  switch (action.type) {
    case START_GAME:
      return {...state, playerTurn: action.playerTurn, modle: action.modle}
    case NEXT_PLAYER:
      return {
        ...state,
        playerTurn: action.playerNumber + 1 < 5 ? action.playerNumber + 1 : 1
      }
    case TOGGLE_MODAL:
      return {...state, modle: action.modal}
    case DISTRIBUTE_RESOURCE:
      return {
        ...state,
        players: state.players.map(player => {
          return player.id === action.id
            ? {...player, resources: player.resources + 1}
            : player
        })
      }
    case ROLL_DICE:
      return {
        ...state,
        die1: action.dieRolls[0],
        die2: action.dieRolls[1]
      }

    case UPDATE_SCORE:
      return {
        ...state,
        players: state.players.map(player => {
          return player.id === action.id
            ? {...player, score: action.updatedScore}
            : player
        })
      }
    default:
      return state
  }
}

export default gameState
