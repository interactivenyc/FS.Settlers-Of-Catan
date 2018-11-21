import {GET_BOARD, CREATE_ROAD, CREATE_SETTLEMENT} from '../actions'
import Board from '../../board'

const defaultBoard = {}

export default function(state = defaultBoard, action) {
  switch (action.type) {
    case GET_BOARD:
      return action.board
    case CREATE_ROAD:
      return {
        ...state,
        edges: {
          ...state.edges,
          [action.id]: {
            ...state.edges[action.id],
            color: action.color,
            player: action.number
          }
        }
      }
    case CREATE_SETTLEMENT:
      return {
        ...state,
        vertices: {
          ...state.vertices,
          [action.id]: {
            ...state.vertices[action.id],
            color: action.color,
            player: action.number
          }
        }
      }
    default:
      return state
  }
}
