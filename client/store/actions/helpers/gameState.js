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
