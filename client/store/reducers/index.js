import {combineReducers} from 'redux'
import user from './user'
import board from './board'
import gameState from './gameState'
import playerState from './playerState'

const reducer = combineReducers({user, board, gameState, playerState})

export default reducer
