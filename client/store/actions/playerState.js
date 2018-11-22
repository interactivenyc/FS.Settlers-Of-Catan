import {
  deleteCard,
  addCard,
  MAKE_OFFER,
  RECEIVE_OFFER,
  ACCEPT_OFFER,
  REJECT_OFFER
} from './actionTypes'
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
