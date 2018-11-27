import {getEdgeNeighbors} from './board'

// calculate road length
export const getRoadLength = (edge, board) => {
  let pointer = 0
  const set = new Set()
  const queue = [edge]

  while (pointer < queue.length) {
    const curEdge = queue[pointer++]
    const neighbors = getEdgeNeighbors(curEdge, board)

    set.add(curEdge.id)

    neighbors.forEach(neighbor => {
      if (!set.has(neighbor.id) && neighbor.player === edge.player) {
        queue.push(neighbor)
      }
    })
  }
  return set.size
}

export const adjustResourcesFromTo = (from, to, players) => {
  return players.map(player => {
    const {id, resources} = player
    return id === from
      ? {...player, resources: resources - 1}
      : id === to ? {...player, resources: resources + 1} : player
  })
}

export const subtractResourceCard = (card, resources) => {
  return resources.map(resource => {
    return resource.type === card
      ? {...resource, quantity: resource.quantity - 1}
      : resource
  })
}

export const createResourceCardsArray = resources => {
  return resources.reduce((acc, val) => {
    acc = [...acc, ...Array(val.quantity).fill(val.type)]
    return acc
  }, [])
}
