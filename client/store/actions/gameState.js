import {
  nextPlayer,
  SET_GAME_USERS,
  distributeResource,
  distributeResourcePlayer,
  rollDice,
  toggleModal,
  moveRobber,
  updateScorePlayer,
  updatePlayers,
  changePhase,
  setResources
} from './actionTypes'
import socket from '../../socket'
import {
  rollDie,
  checkforLargestArmy,
  checkforLongestRoad
} from '../../../client/components/GameMap/HelperFunctions'

export const setGameUsers = users => ({type: SET_GAME_USERS, users})

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

export const checkForVictory = playerNumber => {
  return (dispatch, getState) => {
    let {gameState} = getState()
    let finalScore = gameState.players[playerNumber - 1].score

    if (checkforLongestRoad(playerNumber, gameState) === true) {
      finalScore = finalScore + 2
    }
    if (checkforLargestArmy(playerNumber, gameState) === true) {
      finalScore = finalScore + 2
    }
    if (finalScore > 9) {
      window.alert(` Player ${playerNumber} is the Winner!!!`)
    }
  }
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
  const resource = board.resources[id]
  const isRobable = resource.vertices
    .map(vertex => board.vertices[vertex.id])
    .filter(vertex => vertex.player !== playerNumber && vertex.player).length

  const phase = isRobable ? 'rob' : ''

  dispatch(moveRobber(resource.id))
  dispatch(changePhase(phase))
  socket.emit('dispatch', moveRobber(resource.id))
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
    dispatch(checkForVictory(playerNumber))
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
      return el
    }
  })
  dispatch(updatePlayers(playersArr))
  socket.emit('dispatch', updatePlayers(playersArr))
}

export const sendResources = (type, quantity, player) => (
  dispatch,
  getState
) => {
  const playerId = getState().playerState.playerNumber
  if (playerId === player) {
    const newResources = getState().playerState.resources.map(el => {
      if (el.type === type) {
        return {...el, quantity: el.quantity + quantity}
      } else {
        return el
      }
    })
    let playersArr = getState().gameState.players.map(el => {
      if (playerId === el.id) {
        return {...el, resources: el.resources + quantity}
      } else {
        return el
      }
    })

    dispatch(setResources(newResources))
    dispatch(updatePlayers(playersArr))
    socket.emit('dispatch', updatePlayers(playersArr))
  }
}

export const depleteResources = (type, player) => (dispatch, getState) => {
  let numDepletedResources
  const newResources = getState().playerState.resources.map(el => {
    if (el.type === type) {
      numDepletedResources = el.quantity
      return {...el, quantity: 0}
    } else {
      return el
    }
  })
  let playerNumber = getState().playerState.playerNumber
  let playersArr = getState().gameState.players.map(el => {
    if (playerNumber === el.id) {
      return {...el, resources: el.resources - numDepletedResources}
    } else {
      return el
    }
  })

  dispatch(setResources(newResources))
  dispatch(updatePlayers(playersArr))
  socket.emit('dispatchThunk', {
    action: 'sendResources',
    args: [type, numDepletedResources, player]
  })
}

export const monopoly = type => {
  return (dispatch, getState) => {
    const player = getState().playerState.playerNumber
    socket.emit('dispatchThunk', {
      action: 'depleteResources',
      args: [type, player]
    })
  }
}
