class Board {
  constructor() {
    this.resources = {}
    this.vertices = {}
    this.edges = {}
    this.makeResources()
  }

  makeResources(){
    
    this.resources[11] = new Resource(11, "forest", this)
    this.resources[12] = new Resource(12, "field", this)
    this.resources[13] = new Resource(13, "mountain", this)

    this.resources[21] = new Resource(21, "hill", this)
    this.resources[22] = new Resource(22, "pasture", this)
    this.resources[23] = new Resource(23, "hill", this)
    this.resources[24] = new Resource(24, "mountain", this)

    this.resources[31] = new Resource(31, "mountain", this)
    this.resources[32] = new Resource(32, "pasture", this)
    this.resources[33] = new Resource(33, "center", this)
    this.resources[34] = new Resource(34, "field", this)
    this.resources[35] = new Resource(35, "pasture", this)

    this.resources[41] = new Resource(41, "hill", this)
    this.resources[42] = new Resource(42, "forest", this)
    this.resources[43] = new Resource(43, "field", this)
    this.resources[44] = new Resource(44, "forest", this)

    this.resources[51] = new Resource(51, "field", this)
    this.resources[52] = new Resource(52, "forest", this)
    this.resources[53] = new Resource(53, "pasture", this)
  }
}



class Resource {
  constructor(id, type, board) {
    

    this.id = id
    this.type = type
    this.diceTarget = null
    this.vertices = []
    this.setVertices(board)
    this.edges = []
    this.setEdges()
  }

  setVertices(board) {
    const firstIndex = Math.floor(this.id/10)
    const secondIndex = this.id % 10
    console.log('1 - 2 : ', this.id)
    this.vertices.push(new Vertex(firstIndex, secondIndex*2-1, board))
    this.vertices.push(new Vertex(firstIndex, secondIndex*2, board))
    this.vertices.push(new Vertex(firstIndex, secondIndex*2+1, board))
    this.vertices.push(new Vertex((firstIndex+1), secondIndex*2-1, board))
    this.vertices.push(new Vertex((firstIndex+1), secondIndex*2, board))
    this.vertices.push(new Vertex((firstIndex+1), secondIndex*2+1, board))
  }

  setEdges() {

  }
  
}



class Vertex {
  constructor(row, col, board) {
    const stringId = row.toString() + col.toString()
    console.log('vertex id:', stringId);
    
    this.id = stringId
    this.player = null
    this.locationType = null
    board.vertices[stringId] = this
  }
}

let board = new Board()
console.log('board', board);


