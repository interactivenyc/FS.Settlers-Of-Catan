import {combineReducers} from 'redux'
import user from './user'
import board from './board'
import playState from './playState'
import players from './players'

const reducer = combineReducers({user, board, playState, players})

export default reducer
