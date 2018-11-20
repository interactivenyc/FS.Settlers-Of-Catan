import {ADD_CARD, REMOVE_CARD, ASSIGN_PLAYER} from '../actions'

const playerState = {
  playerHand: [],
  color: null,
  playerNumber: null,
  resources: {
    forest: 1,
    field: 1,
    hill: 1,
    mountain: 1,
    pasture: 1
  },
  score: 0
}

export default function(state = playerState, action) {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        playerHand: action.hand
      }
    case REMOVE_CARD:
      return {
        ...state,
        playerHand: action.hand
      }
    case ASSIGN_PLAYER:
      return {...state, color: action.color, playerNumber: action.number}
    default:
      return state
  }
}
