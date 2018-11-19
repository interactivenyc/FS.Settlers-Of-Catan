import {START_GAME, NEXT_PLAYER} from '../actions'

const defaultState = {
  playerTurn: null,
  modle: true
}

const playState = (state = defaultState, action) => {
  switch (action.type) {
    case START_GAME:
      return {...state, playerTurn: action.playerTurn, modle: action.modle}
    case NEXT_PLAYER:
      return {
        ...state,
        playerTurn: action.playerNumber + 1 < 5 ? action.playerNumber + 1 : 1
      }
    default:
      return state
  }
}

export default playState
