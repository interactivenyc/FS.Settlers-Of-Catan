import {combineReducers} from 'redux'
import user from './user'
import board from './board'
import playState from './playState'
import players from './players'
import playerState from './playerState'

const reducer = combineReducers({user, board, playState, players, playerState})

export default reducer
