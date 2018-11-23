import {deleteCard, addCard, updatePlayers, setResources} from './actionTypes'
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
        ? {...player, resources: player.resources - discard}
        : player
  )
  dispatch(updatePlayers(players))
  dispatch(setResources(resources))
  socket.emit('dispatch', updatePlayers(players))
}
