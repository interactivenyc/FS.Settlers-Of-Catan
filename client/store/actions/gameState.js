import {
  nextPlayer,
  SET_GAME_USERS,
  distributeResource,
  distributeResourcePlayer,
  rollDice,
  toggleModal,
  moveRobber,
  updateScore,
  updateScorePlayer
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
        if (vertices[vertex.id].locationType === 'city') {
          dispatch(distributeResource(vertices[vertex.id].player, 2))
          socket.emit(
            'dispatch',
            distributeResource(vertices[vertex.id].player, 2)
          )
          dispatch(
            distributeResourcePlayer(
              resource.type,
              vertices[vertex.id].player,
              2
            )
          )
          socket.emit(
            'dispatch',
            distributeResourcePlayer(
              resource.type,
              vertices[vertex.id].player,
              2
            )
          )
        } else {
          dispatch(distributeResource(vertices[vertex.id].player))
          socket.emit(
            'dispatch',
            distributeResource(vertices[vertex.id].player)
          )
          dispatch(
            distributeResourcePlayer(resource.type, vertices[vertex.id].player)
          )
          socket.emit(
            'dispatch',
            distributeResourcePlayer(resource.type, vertices[vertex.id].player)
          )
        }
      }
    })
  })
}

export const robberThunk = id => (dispatch, getState) => {
  const {playerState, gameState} = getState()
  const resources = gameState.players.filter(
    player => player.id === playerState.playerNumber
  )[0].resources

  if (resources > 7) dispatch(toggleModal('robber'))
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
    const newDiceTotal = newState.die1 + newState.die2

    dispatch(distributeResourcesThunk(newState.die1 + newState.die2))

    if (newDiceTotal === 7) {
      dispatch(robberThunk())
      socket.emit('dispatchThunk', {action: 'robberThunk'})
    }
  }
}

export const moveRobberThunk = id => (dispatch, getState) => {
  const resource = {...getState().board.resources[id]}
  dispatch(moveRobber(resource))
}

export const adjustScore = scoreChange => {
  return (dispatch, getState) => {
    let playerScore = getState().playerState.score
    let playerId = getState().playerState.playerNumber
    let updatedScore = playerScore + scoreChange

    dispatch(updateScore(playerId, updatedScore))
    dispatch(updateScorePlayer(updatedScore))
  }
}
