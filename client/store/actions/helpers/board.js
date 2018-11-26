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

export const getEdgeNeighbors = (edge, board) => {
  const obj = {[edge.id]: true}

  const neighbors = [...edge.vertices[0].edges, ...edge.vertices[1].edges]

  return neighbors.reduce((acc, val) => {
    if (!obj[val.id]) {
      acc.push({...board.edges[val.id]})
      obj[val.id] = true
    }

    return acc
  }, [])
}

// Gets currently selected vertice neighbors and returns them in array
export const getVerticeNeighbors = (vertice, board) => {
  const edges = vertice.edges

  const neighbors = edges.map(
    curEdge =>
      curEdge.vertices[0].id !== vertice.id
        ? board.vertices[curEdge.vertices[0].id]
        : board.vertices[curEdge.vertices[1].id]
  )
  //make sure neighbors includes vertex itself (to check if it already has a color)
  neighbors.push(vertice)
  return neighbors
}

// at least one edge needs to share the current player color
export const validateChangeEdge = (playerState, edge, neighbors, board) => {
  return neighbors.some(neighbor => {
    const isValid = neighbor === playerState.color && !edge.color && neighbor
    const isEmpty =
      !edge.color &&
      (board.vertices[edge.vertices[0].id].color === playerState.color ||
        board.vertices[edge.vertices[1].id].color === playerState.color)

    return isValid || isEmpty
  })
}

// all adjacent vertices must have no settlements & must be two roads of same color from vertex
export const validateChangeVertice = (neighbors, color) => {
  // also cannot have more than 5 total settlements (would need to upgrade to city) - need to implement this
  const subjectVertex = neighbors[neighbors.length - 1]

  let verifyConnectingRoads = false
  subjectVertex.edges.forEach(edge => {
    if (checkConnectingRoads(edge, subjectVertex, color))
      verifyConnectingRoads = true
  })

  const verifyNeighbors = neighbors.every(neighbor => neighbor.color === null)

  return verifyConnectingRoads && verifyNeighbors
}

const checkConnectingRoads = (edge, vertex, color) => {
  if (edge.color !== color) return false
  const otherVertex = edge.vertices.filter(vert => vert !== vertex)[0]
  const nextEdges = otherVertex.edges.filter(edg => edg !== edge)

  for (const e in nextEdges) {
    if (nextEdges[e].color === color) return true
  }
  return false
}
