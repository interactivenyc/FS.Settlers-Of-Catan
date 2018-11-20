import {GET_BOARD, CREATE_ROAD, CREATE_SETTLEMENT} from '../actions'
import Board from '../../board'

const defaultBoard = {}

export default function(state = defaultBoard, action) {
  switch (action.type) {
    case GET_BOARD:
      return action.board
    case CREATE_ROAD:
      console.log('SETTLEMENT ACTION', JSON.stringify(state))
      return {
        ...state,
        edges: {
          ...state.edges,
          [action.id]: {...state.edges[action.id], color: action.color}
        }
      }
    case CREATE_SETTLEMENT:
      console.log('SETTLEMENT ACTION', state)
      return {
        ...state,
        vertices: {
          ...state.vertices,
          [action.id]: {...state.vertices[action.id], color: action.color}
        }
      }
    default:
      return state
  }
}
