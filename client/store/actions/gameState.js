import {nextPlayer, SET_GAME_USERS, rollDice} from './actionTypes'
import socket from '../../socket'
import rollDie from '../../client/components/HelperFunctions'

export const setGameUsers = users => ({type: SET_GAME_USERS, users})

export const nextPlayerThunk = playerNumber => (dispatch, getState) => {
  dispatch(nextPlayer(playerNumber))
  socket.emit('dispatch', nextPlayer(playerNumber))
}

export const newDiceRoll = () => {
  return dispatch => {
    let die1 = rollDie()
    let die2 = rollDie()
    dispatch(rollDice(die1, die2))
  }
}
