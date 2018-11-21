import * as actions from '../../store/actions'

export const rollDie = () => {
  return Math.floor(Math.random() * 6) + 1
}
