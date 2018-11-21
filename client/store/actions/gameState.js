import {
  nextPlayer,
  SET_GAME_USERS,
  MAKE_OFFER,
  distributeResource,
  distributeResourcePlayer,
  rollDice
} from './actionTypes'
import socket from '../../socket'
import {rollDie} from '../../../client/components/GameMap/HelperFunctions'

export const setGameUsers = users => ({type: SET_GAME_USERS, users})

export const nextPlayerThunk = playerNumber => dispatch => {
  dispatch(nextPlayer(playerNumber))
  socket.emit('dispatch', nextPlayer(playerNumber))
}

export const distributeResourcesThunk = num => (dispatch, getState) => {
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

export const newDiceRoll = () => {
  return (dispatch, getState) => {
    let die1 = rollDie()
    let die2 = rollDie()
    let dieRolls = []
    dieRolls.push(die1)
    dieRolls.push(die2)

    dispatch(rollDice(dieRolls))
    socket.emit('dispatch', rollDice(dieRolls))

    const newState = getState().gameState

    console.log('====================')
    console.log(newState.die1, newState.die2)
    console.log('====================')

    dispatch(distributeResourcesThunk(newState.die1 + newState.die2))
  }
}

export const makeOffer = currentTrade => ({type: MAKE_OFFER, currentTrade})
