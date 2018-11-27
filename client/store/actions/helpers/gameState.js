import {getEdgeNeighbors} from './board'

const set = new Set()

const maxPath = (edge, board, color) => {
  console.log(edge)

  if (edge.color !== color || set.has(edge.id)) return

  set.add(edge.id)

  const neighbors = getEdgeNeighbors(edge, board)

  neighbors.forEach(neighbor => {
    if (!set.has(neighbor.id)) maxPath(neighbor, board, color)
  })
}

// calculate road length
export const getRoadLength = (edge, board) => {
  // let pointer = 0
  // const set = new Set()
  // const queue = [edge]

  // set.add(edge.id)

  // while (pointer < queue.length) {
  //   const curEdge = queue[pointer++]
  //   const neighbors = getEdgeNeighbors(curEdge, board)

  //   neighbors.forEach(neighbor => {
  //     if (!set.has(neighbor.id) && neighbor.player === edge.player) {
  //       console.log(neighbor.id, set, set.has(neighbor.id))
  //       queue.push(neighbor)
  //       set.add(neighbor.id)
  //     }
  //   })
  // }

  // console.log(queue)

  // return set.size

  maxPath(edge, board, edge.color)
}
