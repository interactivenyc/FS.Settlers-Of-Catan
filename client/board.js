class Board {
  constructor() {
    this.board = {}
    this.board[11] = new Land(11, "forest")
    this.board[12] = new Land(12, "field")
    this.board[13] = new Land(13, "mountain")

    this.board[21] = new Land(21, "hill")
    this.board[22] = new Land(22, "pasture")
    this.board[23] = new Land(23, "hill")
    this.board[24] = new Land(24, "mountain")

    this.board[31] = new Land(31, "mountain")
    this.board[32] = new Land(32, "pasture")
    this.board[33] = new Land(33, "center")
    this.board[34] = new Land(34, "field")
    this.board[35] = new Land(35, "pasture")

    this.board[41] = new Land(41, "hill")
    this.board[42] = new Land(42, "forest")
    this.board[43] = new Land(43, "field")
    this.board[44] = new Land(44, "forest")


    this.board[51] = new Land(51, "field")
    this.board[52] = new Land(52, "forest")
    this.board[53] = new Land(53, "pasture")
  }

}

class Land {
  constructor(id, type) {
    this.id = id
    this.type = type
  }
}

let board = new Board()
console.log('board', board);


