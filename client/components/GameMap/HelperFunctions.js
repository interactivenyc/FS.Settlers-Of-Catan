import * as actions from '../../store/actions'

export const rollDie = () => {
  return Math.floor(Math.random() * 6) + 1
}

export const checkforLongestRoad = (playerNumber, gameState) => {
  let playerRoad = gameState.players[playerNumber - 1].longestRoad
  gameState.players.map(el => {
    if (el.longestRoad > playerRoad) {
      return false
    }
  })
  if (playerRoad > 0) {
    return true
  }
}

export const checkforLargestArmy = (playerNumber, gameState) => {
  const playerArmy = gameState.players[playerNumber - 1].largestArmy
  gameState.players.map(el => {
    if (el.largestArmy > playerArmy) {
      return false
    }
  })
  if (playerArmy > 0) {
    return true
  }
}
