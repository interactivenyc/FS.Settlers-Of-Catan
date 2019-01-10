class User {
  constructor(data, socketId, users) {
    this.id = data.id
    this.email = data.email
    this.username = data.username || data.email.split('@')[0]
    this.socketId = socketId
    this.gameId = 'none'
    this.color = 'none'
    this.playerNumber = 0
    this.longestRoad = 0

    users[this.socketId] = this
  }
}

module.exports = User
