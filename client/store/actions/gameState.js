import {nextPlayer} from './actionTypes'
import socket from '../../socket'

export const nextPlayerThunk = playerNumber => (dispatch, getState) => {
  dispatch(nextPlayer(playerNumber))
  socket.emit('dispatch', nextPlayer(playerNumber))
}
