import {
  START_GAME,
  NEXT_PLAYER,
  SET_GAME_USERS,
  DISTRIBUTE_RESOURCE,
  ROLL_DICE,
  TOGGLE_MODAL,
  UPDATE_SCORE,
  CHANGE_GAME_PHASE,
  CHANGE_PHASE,
  UPDATE_PLAYERS
} from '../actions'

const defaultState = {
  playerTurn: 1,
  modle: false,
  players: [
    // These objects are defined in case SET_GAME_USERS below
    // {id: 1, userProfile: {}, score:0}
  ],
  die1: 0,
  die2: 0,
  phase: null
}

/* eslint-disable complexity */
const gameState = (state = defaultState, action) => {
  switch (action.type) {
    case SET_GAME_USERS:
      console.log('SET_GAME_USERS', action.users)
      var players = []
      for (let i = 0; i < action.users.length; i++) {
        let user = {
          id: action.users[i].playerNumber,
          userProfile: action.users[i],
          resources: 0,
          responded: true,
          longestRoad: 0,
          score: 0,
          largestArmy: 0
        }
        console.log('PUSH_USERS', user)
        players.push(user)
      }
      return {...state, players}
    case START_GAME:
      return {...state, playerTurn: action.playerTurn, modle: action.modle}
    case NEXT_PLAYER:
      return {
        ...state,
        playerTurn:
          action.playerNumber + 1 <= state.players.length
            ? action.playerNumber + 1
            : 1
      }
    case TOGGLE_MODAL:
      return {...state, modle: action.modal}
    case DISTRIBUTE_RESOURCE:
      return {
        ...state,
        players: state.players.map(player => {
          return player.id === action.id
            ? {...player, resources: player.resources + action.quantity}
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
          return player.id === action.playerId
            ? {...player, score: action.updatedScore}
            : player
        })
      }
    case CHANGE_GAME_PHASE:
      return {
        ...state,
        phase: action.phase
      }
    case UPDATE_PLAYERS:
      return {...state, players: action.players}
    case CHANGE_PHASE:
      return {...state, phase: action.phase}
    default:
      return state
  }
}

export default gameState
