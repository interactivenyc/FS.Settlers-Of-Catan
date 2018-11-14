class Board {
  constructor() {
    this.resources = {}
    this.vertices = {}
    this.edges = {}
    this.makeResources()
  }

  makeResources(){
    
    this.resources[11] = new Resource(1, 1, 11, "forest", this)
    this.resources[12] = new Resource(1, 2, 12, "pasture", this)
    this.resources[13] = new Resource(1, 3, 9, "field", this)

    this.resources[21] = new Resource(2, 1, 4, "hill", this)
    this.resources[22] = new Resource(2, 2, 6, "mountain", this)
    this.resources[23] = new Resource(2, 3, 5, "hill", this)
    this.resources[24] = new Resource(2, 4, 10, "pasture", this)

    this.resources[31] = new Resource(3, 1, 0, "desert", this)
    this.resources[32] = new Resource(3, 2, 3, "forest", this)
    this.resources[33] = new Resource(3, 3, 11, "field", this)
    this.resources[34] = new Resource(3, 4, 4, "forest", this)
    this.resources[35] = new Resource(3, 5, 8, "field", this)

    this.resources[41] = new Resource(4, 1, 8, "hill", this)
    this.resources[42] = new Resource(4, 2, 10, "pasture", this)
    this.resources[43] = new Resource(4, 3, 9, "pasture", this)
    this.resources[44] = new Resource(4, 4, 3, "mountain", this)

    this.resources[51] = new Resource(5, 1, 5, "mountain", this)
    this.resources[52] = new Resource(5, 2, 2, "field", this)
    this.resources[53] = new Resource(5, 3, 6, "forest", this)
  }

  getStringFromCoordinate(row, column) {
    return row.toString() + ',' + column.toString()
  }
}



class Resource {
  constructor(row, column, diceTarget, type, board) {
    this.id = board.getStringFromCoordinate(row, column)
    this.row = row
    this.column = column
    this.type = type
    this.diceTarget = diceTarget
    this.vertices = []
    this.setVertices(board)
    this.edges = []
    this.setEdges(board)
  }

  setVertices(board) {
    this.getOrCreateVertex(this.row, this.column*2-1, board)
    this.getOrCreateVertex(this.row, this.column*2, board)
    this.getOrCreateVertex(this.row, this.column*2+1, board)
    this.getOrCreateVertex((this.row+1), this.column*2-1, board)
    this.getOrCreateVertex((this.row+1), this.column*2, board)
    this.getOrCreateVertex((this.row+1), this.column*2+1, board)
  }

  getOrCreateVertex(row, column, board) {
    const existingVertex = board.vertices[board.getStringFromCoordinate(row, column)]
    if (existingVertex){
      this.vertices.push(existingVertex)
    } else {
      this.vertices.push(new Vertex(row, column, board))
    }
  }

  setEdges(board) {
    this.getOrCreateEdge((this.row*2 - 1), (this.column*2 - 1), board)
    this.getOrCreateEdge((this.row*2 - 1), (this.column*2 - 1), board)
    this.getOrCreateEdge((this.row*2), (this.column*2), board)
    this.getOrCreateEdge((this.row*2), (this.column*2), board)
    this.getOrCreateEdge((this.row*2 + 1), (this.column*2 + 1), board)
    this.getOrCreateEdge((this.row*2 + 1), (this.column*2 + 1), board)
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
    board.vertices[this.id] = this
  }
}

class Edge {
  constructor(row, column, board) {
    this.id = board.getStringFromCoordinate(row, column)
    this.row = row
    this.column = column
    this.player = null
    board.edges[this.id] = this
  }
}

let board = new Board()
console.log('board', board);


