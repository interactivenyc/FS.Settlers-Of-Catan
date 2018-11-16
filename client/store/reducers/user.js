import {GET_USER, REMOVE_USER, SET_USER_COLOR} from '../actions'

const defaultUser = {}

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case SET_USER_COLOR:
      return {...state, color: action.color}
    default:
      return state
  }
}
