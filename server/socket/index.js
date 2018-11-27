const GameDB = require('../db').model('game')
const initializedBoardData = require('./initializedBoard')

module.exports = io => {
  let games = {}
  let users = {}
  const numPlayers = 2

  class User {
    constructor(users, data, socketId) {
      this.id = data.id
      this.email = data.email
      this.username = data.username || data.email.split('@')[0]
      this.socketId = socketId
      this.activeRoom = 'Lobby'
      users[this.socketId] = this
    }
  }

  class GameInstance {
    constructor(games, name) {
      console.log('GameInstance - name', name)

      this.name = name
      this.users = {}
      this.chatList = []
      this.deck = generateDeck(games, name)

      games[name] = this
    }
  }

  createLobby()
  createDefaultGame()

  function createLobby() {
    console.log('createLobby')
    let lobby = new GameInstance(games, 'Lobby')
    games.Lobby = lobby
  }

  function createDefaultGame() {
    console.log('createDefaultGame')
    let lobby = new GameInstance(games, 'Default Game')
    games['Default Game'] = lobby
  }

  //Fisher-Yates Shuffle
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  function generateDeck(games, gameName) {
    console.log('generate deck', gameName, games)
    const cards = ['monopoly', 'monopoly', 'road', 'road', 'plenty', 'plenty']
    for (let i = 0; i < 14; i++) {
      cards.push('knight')
    }
    for (let i = 0; i < 5; i++) {
      cards.push('vp')
    }
    shuffle(cards)

    // console.log('generate cards', cards)
    return cards
  }

  function getRandomCard(gameName) {
    return games[gameName].deck.pop()
  }

  /**
   * THESE ARE VARS USED BY RYAN - TO INTEGRATE
   */
  let colors = {
    1: 'red',
    2: 'green',
    3: 'blue',
    4: 'orange'
  }

  function log(msg) {
    console.log('[ server socket ]', msg)
  }

  function resetAllGames() {
    games = {'Default Game': {}}
  }

  function updateLobby() {
    io.sockets.in('Lobby').emit('update-lobby', users, games, games.Lobby.Lobby)
  }

  function leaveAllRooms(socket) {
    for (let roomId in socket.rooms) {
      if (socket.rooms.hasOwnProperty(roomId)) {
        socket.emit('log-server-message', `leaving room ${roomId}`)
        socket.leave(socket.rooms[roomId])
      }
    }
  }

  function joinRoom(socket, room) {
    leaveAllRooms(socket)
    socket.join(room)
    socket.emit('connectToRoom', room)
    updateLobby()
  }

  io.on('connection', socket => {
    /*******************************************
     * GAME LISTENERS
     *******************************************/
    socket.on('get-dev-card', gameId => {
      let card = getRandomCard(gameId)
      socket.emit('send-card-to-user', card)
    })

    /*******************************************
     * LOBBY LISTENERS
     *******************************************/

    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('join-lobby', user => {
      let gameUser = new User(users, user, socket.id)
      users[socket.id] = gameUser
      joinRoom(socket, 'Lobby')
    })

    socket.on('switch-room', room => {
      joinRoom(socket, room)
    })

    /* eslint-disable camelcase */
    socket.on('join-game', async gameId => {
      console.log('join-game gameId', gameId)
      games[gameId][socket.id] = users[socket.id]
      updateLobby()
      const userKeys = Object.keys(games[gameId])

      /**
       * START NEW GAME
       */

      if (userKeys.length === numPlayers) {
        const board = await GameDB.create({
          board_data: JSON.stringify(initializedBoardData)
        })

        let gameUsers = []
        let playerNumber = 0
        userKeys.forEach(socketId => {
          delete games[gameId][socketId]
          let user = users[socketId]
          playerNumber++
          user.playerNumber = playerNumber
          gameUsers.push(user)
          delete users[socketId]

          socket.leave('Lobby')
          socket.join('gameroom')

          io.to(socketId).emit('start-game', board.board_data, {
            number: playerNumber,
            color: colors[playerNumber],
            userProfile: user
          })
        })
        io.sockets.in('gameroom').emit('set-game-users', gameUsers)
        updateLobby()
      }
    })

    socket.on('reset-all-games', () => {
      log('reset-all-games')
      resetAllGames()
      updateLobby()
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      delete users[socket.id]
      delete games['Default Game'][socket.id]
      updateLobby()
    })

    socket.on('delete-user-from-game', (email, gameId) => {
      console.log('delete-user-from-game', email, gameId)

      let game = games[gameId]
      for (let key in game) {
        if (game[key].email === email) {
          log('deleting user from game', game[key])
          delete game[key]
        }
      }
    })

    socket.on('leave-game', gameId => {
      console.log('leave-game', gameId, socket.id)
      if (gameId) {
        delete games[gameId][socket.id]
        updateLobby()
      }
    })

    socket.on('send-message', (message, room) => {
      console.log('send-message', room, message)
      if (!room) room = 'Lobby'

      games[room].chatList.push({username: users[socket.id].username, message})
      io.sockets.in('Lobby').emit('update-chat', games[room].chatList)
    })

    /**
     * THESE ARE NEW FUNCTIONS FROM RYAN TO INTEGRATE
     */

    socket.on('dispatch', value => {
      console.log('dispatch - this is an opportunity to update state on server')
      console.log(value)
      socket.broadcast.emit('dispatch', value)
    })
    socket.on('dispatchThunk', action => {
      console.log(
        'dispatchThunk - this is an opportunity to update state on server'
      )
      console.log(action)
      socket.broadcast.emit('dispatchThunk', action)
    })

    socket.on('startGame', () => {
      io.sockets.emit('dispatch', {
        type: 'START_GAME',
        modle: false,
        playerTurn: 1
      })
    })
  })
}
