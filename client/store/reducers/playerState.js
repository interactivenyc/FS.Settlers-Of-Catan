import {
  ADD_CARD,
  REMOVE_CARD,
  ASSIGN_PLAYER,
  DISTRIBUTE_RESOURCE_PLAYER
} from '../actions'

const playerState = {
  playerHand: [],
  color: null,
  playerNumber: null,
  resources: [
    {type: 'forest', quantity: 0},
    {type: 'field', quantity: 0},
    {type: 'hill', quantity: 0},
    {type: 'mountain', quantity: 0},
    {type: 'pasture', quantity: 0}
  ],
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
    case DISTRIBUTE_RESOURCE_PLAYER:
      return action.id === state.playerNumber
        ? {
            ...state,
            resources: state.resources.map(
              resource =>
                resource.type === action.resource
                  ? {...resource, quantity: resource.quantity + 1}
                  : resource
            )
          }
        : state
    default:
      return state
  }
}
