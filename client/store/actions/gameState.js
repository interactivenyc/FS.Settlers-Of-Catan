import {nextPlayer, SET_GAME_USERS} from './actionTypes'
import socket from '../../socket'

export const setGameUsers = users => ({type: SET_GAME_USERS, users})

export const nextPlayerThunk = playerNumber => (dispatch, getState) => {
  dispatch(nextPlayer(playerNumber))
  socket.emit('dispatch', nextPlayer(playerNumber))
}
