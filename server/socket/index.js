module.exports = io => {
  let userLobby = {}
  let activeGames = {default: {}}

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.broadcast.emit('player-joined', socket.id)

    socket.on('join-lobby', user => {
      userLobby[socket.id] = user
      console.log('userLobby', userLobby)
      io.sockets.emit('lobby-joined', userLobby, activeGames)
    })

    socket.on('join-game', gameId => {
      console.log('join-game gameId', gameId)
      activeGames[gameId][socket.id] = userLobby[socket.id]
      console.log('join-game activeGames', activeGames)
      io.sockets.emit('game-joined', activeGames)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      delete userLobby[socket.id]
      io.sockets.emit('lobby-left', userLobby)
    })
  })
}
