import {
  START_GAME,
  NEXT_PLAYER,
  SET_GAME_USERS,
  DISTRIBUTE_RESOURCE
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
  die1: 3,
  die2: 5
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
    case DISTRIBUTE_RESOURCE:
      return {
        ...state,
        players: state.players.map(player => {
          return player.id === action.id
            ? {...player, resources: player.resources + 1}
            : player
        })
      }
    default:
      return state
  }
}

export default gameState
