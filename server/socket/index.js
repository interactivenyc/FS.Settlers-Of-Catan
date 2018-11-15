module.exports = io => {
  let userLobby = {}

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.broadcast.emit('player-joined', socket.id)

    socket.on('join-lobby', user => {
      userLobby[socket.id] = user
      console.log('userLobby', userLobby)
      io.sockets.emit('lobby-joined', userLobby)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      delete userLobby[socket.id]
      io.sockets.emit('lobby-left', userLobby)
    })
  })
}
