import {combineReducers} from 'redux'
import user from './user'
import board from './board'

const reducer = combineReducers({user, board})

export default reducer
