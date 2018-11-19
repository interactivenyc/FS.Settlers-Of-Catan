import {GET_USER, REMOVE_USER, ASSIGN_PLAYER} from '../actions'

const defaultUser = {}

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case ASSIGN_PLAYER:
      return {...state, color: action.color, playerNumber: action.number}
    default:
      return state
  }
}
