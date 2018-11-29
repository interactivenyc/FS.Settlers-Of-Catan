const GameDB = require('../db').model('game')
const initializedBoardData = require('./initializedBoard')

module.exports = io => {
  let games = {}
  let users = {}
  const numPlayers = 2

  class User {
    constructor(data, socketId) {
      console.log('[ User ] constructor', data)

      this.id = data.id
      this.email = data.email
      this.username = data.username || data.email.split('@')[0]
      this.socketId = socketId
      this.activeRoom = 'Lobby'
      users[this.socketId] = this
    }
  }

  class GameInstance {
    constructor(name) {
      console.log('new GameInstance - name', name)

      this.name = name
      this.users = {}
      this.chatList = []
      this.deck = generateDeck(name)

      games[name] = this
    }
  }

  createLobby()
  createDefaultGame()

  function createLobby() {
    console.log('createLobby')
    let lobby = new GameInstance('Lobby')
    games.Lobby = lobby
  }

  function createDefaultGame() {
    console.log('createDefaultGame')
    let defaultGame = new GameInstance('Default Game')
    games['Default Game'] = defaultGame
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

  function generateDeck(gameName) {
    console.log('generate deck', gameName)
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

  function updateRoom(socket) {
    let room = Object.keys(socket.rooms)[0]
    console.log(
      // '[ server socket ] updateRoom room/rooms:',
      room,
      Object.keys(socket.rooms)
    )
    if (room && games[room] && games[room].chatList) {
      console.log(
        // '[ server socket ] updateRoom update chatList:',
        games[room].chatList
      )
      io.sockets
        .in('Default Game')
        .emit('update-lobby', users, games, games['Default Game'].chatList)
      io.sockets
        .in('Lobby')
        .emit('update-lobby', users, games, games.Lobby.chatList)
    }
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
    console.log('joinRoom room:', room)

    leaveAllRooms(socket)
    socket.join(room)
    socket.emit('connectToRoom', room)
    if (!games[room]) {
      console.log('joinRoom create new GameInstance', room)
      games[room] = new GameInstance(room)
    }
    setTimeout(() => {
      log('check room joined', socket)
    }, 1000)
    updateRoom(socket)
  }

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    console.log('io.rooms', io.sockets.rooms)

    console.log('-----------------')

    socket.on('disconnect', () => {
      console.log(`disconnect ${socket.id} has left the building`)

      console.log(`---------------------`)

      if (socket.rooms.length > 0) {
        console.log('disconnect from room', Object.keys(socket.rooms))
        console.log(`---------------------`)

        delete users[socket.id]
        delete games[Object.keys(socket.rooms)[0]][socket.id]
        updateRoom(socket)
      }
    })

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

    socket.on('join-lobby', user => {
      let gameUser = new User(user, socket.id)
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
      // updateRoom(socket)
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
        // updateRoom(socket)
      }
    })

    socket.on('reset-all-games', () => {
      log('reset-all-games')
      resetAllGames()
      // updateRoom(socket)
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
        // updateRoom(socket)
      }
    })

    socket.on('send-message', message => {
      console.log('send-message socket.rooms', socket.rooms)
      let room = Object.keys(socket.rooms)[0]
      console.log('send-message room / message', room, message)

      games[room].chatList.push({
        username: users[socket.id].username,
        message: message
      })

      updateRoom(socket)
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
