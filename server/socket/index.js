const Game = require('../db').model('game')
const Board = require('./board')

const newBoard = new Board()

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

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.broadcast.emit('player-joined', socket.id)

    socket.on('join-lobby', user => {
      userLobby[socket.id] = user
      console.log('userLobby', userLobby, '\nactiveGames', activeGames)
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

    socket.on('dispatch', value => {
      socket.broadcast.emit('dispatch', value)
    })

    socket.on('startGame', async () => {
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
  })
}
