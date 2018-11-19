import {getCard, deleteCard} from '../actionTypes'
import {ADD_CARD, REMOVE_CARD} from '../actions'

const playerHand = []

export default function(state = playerHand, action) {
  switch (action.type) {
    case ADD_CARD:
      return [...state, action.card]
    case REMOVE_CARD:
  }
}
