import {
  nextPlayer,
  SET_GAME_USERS,
  distributeResource,
  distributeResourcePlayer
} from './actionTypes'
import socket from '../../socket'

export const setGameUsers = users => ({type: SET_GAME_USERS, users})

export const nextPlayerThunk = playerNumber => (dispatch, getState) => {
  dispatch(nextPlayer(playerNumber))
  socket.emit('dispatch', nextPlayer(playerNumber))
}

export const distributeResourcesThunk = num => (dispatch, getState) => {
  console.log('RESOURCES THUNK', num)

  const {resources, vertices} = getState().board

  const newResources = Object.keys(resources)
    .map(id => resources[id])
    .filter(resource => resource.diceTarget === num)

  newResources.forEach(resource => {
    resource.vertices.forEach(vertex => {
      if (vertices[vertex.id].player) {
        dispatch(distributeResource(vertices[vertex.id].player))
        socket.emit('dispatch', distributeResource(vertices[vertex.id].player))
        dispatch(
          distributeResourcePlayer(resource.type, vertices[vertex.id].player)
        )
        socket.emit(
          'dispatch',
          distributeResourcePlayer(resource.type, vertices[vertex.id].player)
        )
      }
    })
  })
}
