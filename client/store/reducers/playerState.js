import {
  ADD_CARD,
  REMOVE_CARD,
  ASSIGN_PLAYER,
  DISTRIBUTE_RESOURCE_PLAYER,
  UPDATE_SCORE_PLAYER,
  MAKE_OFFER,
  RECEIVE_OFFER,
  ACCEPT_OFFER,
  REJECT_OFFER
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
  currentTrade: null,
  score: 0
}

/* eslint-disable complexity */
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
    case UPDATE_SCORE_PLAYER:
      return {
        ...state,
        score: action.updatedScore
      }
    case MAKE_OFFER:
      return {
        ...state,
        currentTrade: action.currentTrade
      }
    case RECEIVE_OFFER:
      console.log('RECEIVE_OFFER', action.currentTrade)
      return {
        ...state,
        currentTrade: action.currentTrade
      }
    case ACCEPT_OFFER:
      console.log('ACCEPT_OFFER', state.playerNumber, action)
      if (state.currentTrade.playerNumber === state.playerNumber) {
        console.log('Your offer has been accepted')
      } else if (action.playerNumber === state.playerNumber) {
        console.log('finalize transfer for the person who accepted')
      } else {
        console.log('ignore this transaction')
      }
      return {...state, currentTrade: null}
    case REJECT_OFFER:
      console.log('REJECT_OFFER', action)
      return {...state, currentTrade: null}
    default:
      return state
  }
}
