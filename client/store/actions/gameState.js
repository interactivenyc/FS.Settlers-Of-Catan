import {
  nextPlayer,
  SET_GAME_USERS,
  distributeResource,
  distributeResourcePlayer,
  rollDice,
  toggleModal,
  moveRobber,
  updateScore,
  updateScorePlayer,
  updatePlayers,
  changePhase,
  setResources
} from './actionTypes'
import socket from '../../socket'
import {rollDie} from '../../../client/components/GameMap/HelperFunctions'
import {get} from 'https'

export const setGameUsers = users => ({type: SET_GAME_USERS, users})

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

export const robberThunk = () => (dispatch, getState) => {
  const {playerState, gameState} = getState()

  const resources = gameState.players.filter(
    player => player.id === playerState.playerNumber
  )[0].resources

  if (resources > 7) {
    dispatch(toggleModal('robber'))
  }
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

    const {gameState} = getState()
    const newDiceTotal = gameState.die1 + gameState.die2

    dispatch(distributeResourcesThunk(newDiceTotal))

    if (newDiceTotal === 7) {
      const players = gameState.players.map(
        player =>
          player.resources > 7 ? {...player, responded: false} : player
      )

      if (players.every(player => player.responded)) {
        dispatch(changePhase('moveRobber'))
        socket.emit('dispatch', changePhase('moveRobber'))
      } else {
        dispatch(updatePlayers(players))
        socket.emit('dispatch', updatePlayers(players))
        dispatch(robberThunk())
        socket.emit('dispatchThunk', {action: 'robberThunk'})
      }
    }
  }
}

export const moveRobberThunk = id => (dispatch, getState) => {
  const {board, playerState: {playerNumber}} = getState()
  const resource = {...board.resources[id]}

  const isRobable = resource.vertices
    .map(vertex => board.vertices[vertex.id])
    .filter(vertex => vertex.player !== playerNumber && vertex.player).length

  const phase = isRobable ? 'rob' : ''

  if (phase === 'rob') window.alert('select a settlement to rob')

  dispatch(moveRobber(resource))
  dispatch(changePhase(phase))
  socket.emit('dispatch', moveRobber(resource))
  socket.emit('dispatch', changePhase(phase))
}

export const adjustScore = scoreChange => {
  return (dispatch, getState) => {
    let playerScore = getState().playerState.score
    let updatedScore = playerScore + scoreChange
    let playerNumber = getState().playerState.playerNumber
    let playersArr = getState().gameState.players.map(el => {
      if (playerNumber === el.id) {
        return {...el, score: updatedScore}
      } else {
        return {...el}
      }
    })

    dispatch(updatePlayers(playersArr, updatedScore))
    dispatch(updateScorePlayer(updatedScore))
  }
}

export const startTurnThunk = () => (dispatch, getState) => {
  const {playerState, gameState} = getState()

  if (playerState.playerNumber === gameState.playerTurn) {
    dispatch(newDiceRoll())
  }
}

export const nextPlayerThunk = playerNumber => dispatch => {
  dispatch(nextPlayer(playerNumber))
  socket.emit('dispatch', nextPlayer(playerNumber))
  socket.emit('dispatchThunk', {action: 'startTurnThunk'})
}

export const plentyThunk = resources => (dispatch, getState) => {
  dispatch(setResources(resources))
  socket.emit('dispatch', setResources(resources))
  let playerNumber = getState().playerState.playerNumber
  let playersArr = getState().gameState.players.map(el => {
    if (playerNumber === el.id) {
      return {...el, resources: el.resources + 2}
    } else {
      return {...el}
    }
  })
  dispatch(updatePlayers(playersArr))
  socket.emit('dispatch', updatePlayers(playersArr))
}

export const monopoly = () => {
  return (dispatch, getState) => {
    socket.emit('dispatch', updatePlayers(playersArr))
  }
}
