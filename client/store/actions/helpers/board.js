// Reduces this passed in currently clicked on edge and the current board state
// and returns an array including the neighbors color values
export const getEdgeNeighborsColor = (edge, board) => {
  const obj = {[edge.id]: true}
  const neighbors = [...edge.vertices[0].edges, ...edge.vertices[1].edges]

  return neighbors.reduce((acc, val) => {
    if (!obj[val.id]) {
      acc.push(board.edges[val.id].color)
      obj[val.id] = true
    }

    return acc
  }, [])
}

// Gets currently selected vertice neighbors and returns them in array
export const getVerticeNeighbors = (vertice, board) => {
  const edges = vertice.edges

  console.log('EDGES', edges)

  return edges.map(
    curEdge =>
      curEdge.vertices[0].id !== vertice.id
        ? board.vertices[curEdge.vertices[0].id]
        : board.vertices[curEdge.vertices[1].id]
  )
}

// at least one edge needs to share the current player color
export const validateChangeEdge = (user, edge, neighbors, board) => {
  return neighbors.some(neighbor => {
    const isValid = neighbor === user.color && !edge.color && neighbor
    const isEmpty =
      !edge.color &&
      (board.vertices[edge.vertices[0].id].color === user.color ||
        board.vertices[edge.vertices[1].id].color === user.color)

    return isValid || isEmpty
  })
}

// all adjacent vertices must have not settlements
export const validateChangeVertice = (user, vertice, neighbors) => {
  return neighbors.every(neighbor => neighbor.color === null)
}