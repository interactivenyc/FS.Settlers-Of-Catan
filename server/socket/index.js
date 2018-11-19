module.exports = io => {
  let userLobby = {}
  let activeGames = {'Default Game': {}}
  let number = 1
  let colors = {
    1: 'red',
    2: 'green',
    3: 'blue',
    4: 'orange'
  }

  const maxUsers = 2

  function log(msg) {
    console.log('[ server socket ]', msg)
  }

  function resetAllGames() {
    activeGames = {'Default Game': {}}
  }

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.broadcast.emit('player-joined', socket.id)

    socket.on('join-lobby', user => {
      userLobby[socket.id] = user
      // console.log('userLobby', userLobby, '\nactiveGames', activeGames)
      io.sockets.emit('update-lobby', userLobby, activeGames, user.email)
    })

    socket.on('join-game', gameId => {
      console.log('join-game gameId', gameId)
      activeGames[gameId][socket.id] = userLobby[socket.id]
      // console.log('join-game activeGames', activeGames)
      io.sockets.emit('game-joined', activeGames)
      const userKeys = Object.keys(activeGames[gameId])
      if (userKeys.length === maxUsers) {
        userKeys.forEach(socketId => {
          io.to(socketId).emit('start-game')
          delete activeGames[gameId][socketId]
          delete userLobby[socketId]
          io.sockets.emit('update-lobby', userLobby, activeGames)
        })
      }
    })

    socket.on('reset-all-games', () => {
      log('reset-all-games')
      resetAllGames()
      io.sockets.emit('games-reset', activeGames)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      delete userLobby[socket.id]
      io.sockets.emit('lobby-left', userLobby)
    })

    socket.on('dispatch', value => {
      socket.broadcast.emit('dispatch', value)
    })

    socket.on('startGame', () => {
      io.sockets.emit('dispatch', {
        type: 'START_GAME',
        modle: false,
        playerTurn: 1
      })
    })

    socket.on('assignPlayer', () => {
      if (number <= 4) {
        io.sockets.emit('assignPlayer', {
          number: number,
          color: colors[number++]
        })
      }
    })

    socket.on('delete-user-from-game', (email, gameId) => {
      console.log('delete-user-from-game', email, gameId)

      let game = activeGames[gameId]
      for (let key in game) {
        if (game[key].email === email) {
          log('deleting user from game', game[key])
          delete game[key]
        }
      }
    })
  })
}
