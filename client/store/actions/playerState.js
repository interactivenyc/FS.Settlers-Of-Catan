import {
  deleteCard,
  addCard,
  updatePlayers,
  setResources,
  changePhase,
  distributeResourcePlayer,
  MAKE_OFFER,
  RECEIVE_OFFER,
  ACCEPT_OFFER,
  REJECT_OFFER,
  CLEAR_OFFER
} from './actionTypes'

import {
  adjustResourcesFromTo,
  subtractResourceCard,
  createResourceCardsArray
} from './helpers'

import socket from '../../socket'

export const playCard = playedCard => {
  return (dispatch, getState) => {
    let {playerHand} = getState().playerState
    let elToRemove = playerHand.indexOf(playedCard)
    let updatedHand = playerHand.filter((card, i) => i !== elToRemove)
    dispatch(deleteCard(updatedHand))
  }
}

export const buyCard = cardToBuy => {
  return (dispatch, getState) => {
    let {playerHand} = getState().playerState
    dispatch(addCard([...playerHand, cardToBuy]))
  }
}

export const robberDiscardThunk = ({resources, id, discard}) => (
  dispatch,
  getState
) => {
  const players = getState().gameState.players.map(
    player =>
      player.id === id
        ? {...player, resources: player.resources - discard, responded: true}
        : player
  )
  dispatch(updatePlayers(players))
  dispatch(setResources(resources))
  socket.emit('dispatch', updatePlayers(players))

  const allResponded = getState().gameState.players.every(
    player => player.responded
  )

  if (allResponded) {
    dispatch(changePhase('moveRobber'))
    socket.emit('dispatch', changePhase('moveRobber'))
  }
}

export const robPlayer = (from, to) => (dispatch, getState) => {
  const {playerState, gameState} = getState()
  const {playerNumber, resources} = playerState

  if (playerNumber === from) {
    const resourceCards = createResourceCardsArray(resources)
    const card = resourceCards[Math.floor(Math.random() * resourceCards.length)]
    const players = adjustResourcesFromTo(from, to, gameState.players)
    const newResources = subtractResourceCard(card, resources)

    dispatch(updatePlayers(players))
    dispatch(setResources(newResources))
    dispatch(changePhase(''))
    socket.emit('dispatch', updatePlayers(players))
    socket.emit('dispatch', distributeResourcePlayer(card, to))
    socket.emit('dispatch', changePhase(''))
  }
}

export const makeOffer = currentTrade => {
  socket.emit('dispatch', {
    type: RECEIVE_OFFER,
    currentTrade
  })
  return {type: MAKE_OFFER, currentTrade}
}

export const receiveOffer = currentTrade => {
  return {type: RECEIVE_OFFER, currentTrade}
}

export const acceptOffer = playerNumber => {
  console.log('acceptOffer', playerNumber)
  socket.emit('dispatch', {
    type: ACCEPT_OFFER,
    playerNumber
  })
  return {type: ACCEPT_OFFER, playerNumber}
}

export const rejectOffer = playerNumber => {
  console.log('rejectOffer', playerNumber)
  socket.emit('dispatch', {
    type: REJECT_OFFER,
    playerNumber
  })
  return {type: REJECT_OFFER, playerNumber}
}

export const clearOffer = () => {
  return {type: CLEAR_OFFER}
}
