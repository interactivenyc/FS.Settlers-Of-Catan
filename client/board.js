class Board {
  constructor() {
    this.resources = {}
    this.vertices = {}
    this.edges = {}
    this.makeResources()
  }

  makeResources(){
    
    this.resources[11] = new Resource(1, 1, "forest", this)
    this.resources[12] = new Resource(1, 2, "field", this)
    this.resources[13] = new Resource(1, 3, "mountain", this)

    this.resources[21] = new Resource(2, 1, "hill", this)
    this.resources[22] = new Resource(2, 2, "pasture", this)
    this.resources[23] = new Resource(2, 3, "hill", this)
    this.resources[24] = new Resource(2, 4, "mountain", this)

    this.resources[31] = new Resource(3, 1, "mountain", this)
    this.resources[32] = new Resource(3, 2, "pasture", this)
    this.resources[33] = new Resource(3, 3, "center", this)
    this.resources[34] = new Resource(3, 4, "field", this)
    this.resources[35] = new Resource(3, 5, "pasture", this)

    this.resources[41] = new Resource(4, 1, "hill", this)
    this.resources[42] = new Resource(4, 2, "forest", this)
    this.resources[43] = new Resource(4, 3, "field", this)
    this.resources[44] = new Resource(4, 4, "forest", this)

    this.resources[51] = new Resource(5, 1, "field", this)
    this.resources[52] = new Resource(5, 2, "forest", this)
    this.resources[53] = new Resource(5, 3, "pasture", this)
  }

  getStringFromCoordinate(row, column) {
    return row.toString() + ',' + column.toString()
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


