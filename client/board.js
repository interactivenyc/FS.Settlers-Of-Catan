import { debug } from 'util'

class Board {
  constructor() {
    this.resources = {}
    this.vertices = {}
    this.edges = {}
    this.makeResources()
    this.orderedVertices = [
      '1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7',
      '2,1', '2,2', '2,3', '2,4', '2,5', '2,6', '2,7', '2,8', '2,9',
      '3,1', '3,2', '3,3', '3,4', '3,5', '3,6', '3,7', '3,8', '3,9', '3,10', '3,11',
      '4,1', '4,2', '4,3', '4,4', '4,5', '4,6', '4,7', '4,8', '4,9', '4,10', '4,11',
      '5,1', '5,2', '5,3', '5,4', '5,5', '5,6', '5,7', '5,8', '5,9',
      '6,1', '6,2', '6,3', '6,4', '6,5', '6,6', '6,7'
    ]
    this.vertexColumnsMap = { 1: 7, 2: 9, 3: 11, 4: 11, 5: 9, 6: 7 }
    this.edgesFromVertices()
  }

  makeResources() {
    this.resources[11] = new Resource(1, 1, 'forest', this)
    this.resources[12] = new Resource(1, 2, 'field', this)
    this.resources[13] = new Resource(1, 3, 'mountain', this)

    this.resources[21] = new Resource(2, 1, 'hill', this)
    this.resources[22] = new Resource(2, 2, 'pasture', this)
    this.resources[23] = new Resource(2, 3, 'hill', this)
    this.resources[24] = new Resource(2, 4, 'mountain', this)

    this.resources[31] = new Resource(3, 1, 'mountain', this)
    this.resources[32] = new Resource(3, 2, 'pasture', this)
    this.resources[33] = new Resource(3, 3, 'center', this)
    this.resources[34] = new Resource(3, 4, 'field', this)
    this.resources[35] = new Resource(3, 5, 'pasture', this)

    this.resources[41] = new Resource(4, 1, 'hill', this)
    this.resources[42] = new Resource(4, 2, 'forest', this)
    this.resources[43] = new Resource(4, 3, 'field', this)
    this.resources[44] = new Resource(4, 4, 'forest', this)

    this.resources[51] = new Resource(5, 1, 'field', this)
    this.resources[52] = new Resource(5, 2, 'forest', this)
    this.resources[53] = new Resource(5, 3, 'pasture', this)
  }

  getStringFromCoordinate(row, column) {
    return row.toString() + ',' + column.toString()
  }

  edgesFromVertices() {
    let edgeRow = 1
    let firstOffset = 0
    let secondOffset = 1
    for (const vertexCoordinates in this.orderedVertices) {
      const vertex = this.vertices[this.orderedVertices[vertexCoordinates]]
      const potentialEdges = this.findPotentialEdges(edgeRow, vertex, firstOffset, secondOffset)
      for (const edgeCoords in potentialEdges) {
        let isEdge = this.findEdge(potentialEdges[edgeCoords], vertex)
        if (isEdge) {
          vertex.edges.push(isEdge)
        }
      }
      if (!(this.vertexColumnsMap[vertex.row] === vertex.column)) {
        if (edgeRow <= 5) {
          if (vertex.column % 2 === 0) {
            secondOffset++
          } else {
            firstOffset++
          }
        } else {
          if (vertex.column % 2 === 0) {
            firstOffset++
          } else {
            secondOffset++
          }
        }
      } else {
        firstOffset = 0
        secondOffset = 1
        edgeRow += 2
      }
    }
  }

  findPotentialEdges(edgeRow, vertex, firstOffset, secondOffset) {
    let potentialEdges
    if (edgeRow <= 5) {
      potentialEdges =
        vertex.column % 2 !== 0
          ? [
            `${edgeRow},${vertex.column - 1}`,
            `${edgeRow},${vertex.column}`,
            `${edgeRow + 1},${vertex.column - firstOffset}`
          ]
          : [
            `${edgeRow},${vertex.column - 1}`,
            `${edgeRow},${vertex.column}`,
            `${edgeRow - 1},${vertex.column - secondOffset}`
          ]
    } else {
      potentialEdges =
        vertex.column % 2 !== 0
          ? [
            `${edgeRow},${vertex.column - 1}`,
            `${edgeRow},${vertex.column}`,
            `${edgeRow - 1},${vertex.column - firstOffset}`
          ]
          : [
            `${edgeRow},${vertex.column - 1}`,
            `${edgeRow},${vertex.column}`,
            `${edgeRow + 1},${vertex.column - secondOffset}`
          ]
    }
    return potentialEdges
  }

  findEdge(edgeCoords, vertex) {
    const edge = this.edges[edgeCoords];
    if (edge) edge.vertices.push(vertex)
    return edge
  }
}

class Resource {
  constructor(row, column, type, board) {
    this.id = board.getStringFromCoordinate(row, column)
    this.row = row
    this.column = column
    this.type = type
    this.diceTarget = null
    this.vertices = []
    this.setVertices(board)
    this.edges = []
    this.setEdges(board)
  }

  setVertices(board) {
    if (this.row < 4) {
      this.getOrCreateVertex(this.row, this.column * 2 - 1, board)
      this.getOrCreateVertex(this.row, this.column * 2, board)
      this.getOrCreateVertex(this.row, this.column * 2 + 1, board)
    } else {
      this.getOrCreateVertex(this.row, this.column * 2, board)
      this.getOrCreateVertex(this.row, this.column * 2 + 1, board)
      this.getOrCreateVertex(this.row, this.column * 2 + 2, board)
    }
    if (this.row < 3) {
      this.getOrCreateVertex(this.row + 1, this.column * 2, board)
      this.getOrCreateVertex(this.row + 1, this.column * 2 + 1, board)
      this.getOrCreateVertex(this.row + 1, this.column * 2 + 2, board)
    } else {
      this.getOrCreateVertex(this.row + 1, this.column * 2 - 1, board)
      this.getOrCreateVertex(this.row + 1, this.column * 2, board)
      this.getOrCreateVertex(this.row + 1, this.column * 2 + 1, board)
    }
  }

  getOrCreateVertex(row, column, board) {
    const existingVertex =
      board.vertices[board.getStringFromCoordinate(row, column)]
    if (existingVertex) {
      this.vertices.push(existingVertex)
    } else {
      this.vertices.push(new Vertex(row, column, board))
    }
  }

  setEdges(board) {
    if (this.row < 4) {
      this.getOrCreateEdge(this.row * 2 - 1, this.column * 2 - 1, board)
      this.getOrCreateEdge(this.row * 2 - 1, this.column * 2, board)
    } else {
      this.getOrCreateEdge(this.row * 2 - 1, this.column * 2, board)
      this.getOrCreateEdge(this.row * 2 - 1, this.column * 2 + 1, board)
    }
    this.getOrCreateEdge(this.row * 2, this.column, board)
    this.getOrCreateEdge(this.row * 2, this.column + 1, board)
    if (this.row < 3) {
      this.getOrCreateEdge(this.row * 2 + 1, this.column * 2, board)
      this.getOrCreateEdge(this.row * 2 + 1, this.column * 2 + 1, board)
    } else {
      this.getOrCreateEdge(this.row * 2 + 1, this.column * 2 - 1, board)
      this.getOrCreateEdge(this.row * 2 + 1, this.column * 2, board)
    }
  }

  getOrCreateEdge(row, column, board) {
    const existingEdge = board.edges[board.getStringFromCoordinate(row, column)]
    if (existingEdge) {
      this.edges.push(existingEdge)
    } else {
      this.edges.push(new Edge(row, column, board))
    }
  }
}

class Vertex {
  constructor(row, column, board) {
    this.id = board.getStringFromCoordinate(row, column)
    this.row = row
    this.column = column
    this.player = null
    this.locationType = null
    this.edges = []
    board.vertices[this.id] = this
  }
}

class Edge {
  constructor(row, column, board) {
    this.id = board.getStringFromCoordinate(row, column)
    this.row = row
    this.column = column
    this.player = null
    this.vertices = []
    board.edges[this.id] = this
  }
}

const board = new Board()

// function edgesFromVertices(vertices) {
//   const orderedVertices = {}
//   vertexCoordinates.forEach(coordinate => {
//     orderedVertices[coordinate] = vertices[coordinate]
//   })
//   const columnsMap = { 1: 7, 2: 9, 3: 11, 4: 11, 5: 9, 6: 7 }
//   let edgeRow = 1
//   let firstOffset = 0
//   let secondOffset = 1
//   for (const vertex in orderedVertices) {
//     let potentialEdges
//     if (edgeRow <= 5) {
//       potentialEdges =
//         vertices[vertex].column % 2 !== 0
//           ? [
//             `${edgeRow},${vertices[vertex].column - 1}`,
//             `${edgeRow},${vertices[vertex].column}`,
//             `${edgeRow + 1},${vertices[vertex].column - firstOffset}`
//           ]
//           : [
//             `${edgeRow},${vertices[vertex].column - 1}`,
//             `${edgeRow},${vertices[vertex].column}`,
//             `${edgeRow - 1},${vertices[vertex].column - secondOffset}`
//           ]
//     } else {
//       potentialEdges =
//         vertices[vertex].column % 2 !== 0
//           ? [
//             `${edgeRow},${vertices[vertex].column - 1}`,
//             `${edgeRow},${vertices[vertex].column}`,
//             `${edgeRow - 1},${vertices[vertex].column - firstOffset}`
//           ]
//           : [
//             `${edgeRow},${vertices[vertex].column - 1}`,
//             `${edgeRow},${vertices[vertex].column}`,
//             `${edgeRow + 1},${vertices[vertex].column - secondOffset}`
//           ]
//     }
//     for (const edge in potentialEdges) {
//       let isEdge = findEdge(potentialEdges[edge], vertices[vertex])
//       if (isEdge) {
//         vertices[vertex].edges.push(isEdge)
//       }
//     }
//     if (!(columnsMap[vertices[vertex].row] === vertices[vertex].column)) {
//       if (edgeRow <= 5) {
//         if (vertices[vertex].column % 2 === 0) {
//           secondOffset++
//         } else {
//           firstOffset++
//         }
//       } else {
//         if (vertices[vertex].column % 2 === 0) {
//           firstOffset++
//         } else {
//           secondOffset++
//         }
//       }
//     } else {
//       firstOffset = 0
//       secondOffset = 1
//       edgeRow += 2
//     }
//   }
// }



// function findEdge(edgeId, vertex) {
//   if (!board.edges[edgeId]) return false
//   else {
//     board.edges[edgeId].vertices.push(vertex)
//     return board.edges[edgeId]
//   }
// }

// const vertexCoordinates = [
//   '1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7',
//   '2,1', '2,2', '2,3', '2,4', '2,5', '2,6', '2,7', '2,8', '2,9',
//   '3,1', '3,2', '3,3', '3,4', '3,5', '3,6', '3,7', '3,8', '3,9', '3,10', '3,11',
//   '4,1', '4,2', '4,3', '4,4', '4,5', '4,6', '4,7', '4,8', '4,9', '4,10', '4,11',
//   '5,1', '5,2', '5,3', '5,4', '5,5', '5,6', '5,7', '5,8', '5,9',
//   '6,1', '6,2', '6,3', '6,4', '6,5', '6,6', '6,7'
// ]
