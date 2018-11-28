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
  CLEAR_OFFER,
  toggleModal,
  changeGamePhase,
  updateSelf
} from './actionTypes'

import {
  adjustResourcesFromTo,
  subtractResourceCard,
  createResourceCardsArray
} from './helpers'

import {adjustScore, monopoly} from './gameState'

import socket from '../../socket'

export const playCard = playedCard => {
  return (dispatch, getState) => {
    let {playerState, gameState} = getState()
    let {playerHand, playerNumber} = playerState
    let {players} = gameState
    let elToRemove = playerHand.indexOf(playedCard)
    let updatedHand = playerHand.filter((card, i) => i !== elToRemove)
    if (playedCard === 'vp') {
      dispatch(adjustScore(1))
    }
    if (playedCard === 'plenty') {
      dispatch(toggleModal('plenty'))
    }
    if (playedCard === 'knight') {
      dispatch(changeGamePhase('moveRobber'))
      dispatch(toggleModal(null))
      const updatedWithArmy = players.map(
        player =>
          player.id === playerNumber
            ? {...player, largestArmy: player.largestArmy + 1}
            : player
      )
      dispatch(updatePlayers(updatedWithArmy))
      socket.emit('dispatch', updatePlayers(updatedWithArmy))
    }
    if (playedCard === 'monopoly') {
      dispatch(toggleModal('monopoly'))
    }
    if (playedCard === 'road') {
      dispatch(toggleModal(null))
      dispatch(changeGamePhase('build road dev'))
    }
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
  const updatedPlayer = getState().gameState.players.reduce(
    (acc, val) =>
      val.id === id
        ? {...val, resources: val.resources - discard, responded: true}
        : acc,
    {}
  )
  dispatch(updateSelf(updatedPlayer))
  dispatch(setResources(resources))
  socket.emit('dispatch', updateSelf(updatedPlayer))

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

    if (resourceCards.length) {
      dispatch(updatePlayers(players))
      dispatch(setResources(newResources))
      socket.emit('dispatch', updatePlayers(players))
      socket.emit('dispatch', distributeResourcePlayer(card, to))
    }

    dispatch(changePhase(null))
    socket.emit('dispatch', changePhase(null))
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
