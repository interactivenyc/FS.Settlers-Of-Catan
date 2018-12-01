const GameDB = require('../db').model('game')
const initializedBoardData = require('./initializedBoard')

module.exports = io => {
  let games = {}
  let users = {}
  const numPlayers = 2

  class User {
    constructor(data, socketId) {
      // console.log('[ User ] constructor', data)

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
      // console.log('games', games);
    }
  }

  users = {}
  games = {}
  createLobby()
  createDefaultGame()

  function log(msg) {
    console.log('[ server socket ]', msg)
  }

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

  function resetAllGames() {
    games = {}
    createDefaultGame()
  }

  function leaveAllRooms(socket) {
    console.log('leaveAllRooms')

    for (let roomId in socket.rooms) {
      if (socket.rooms.hasOwnProperty(roomId)) {
        console.log('leaving room...', roomId)
        socket.emit('log-server-message', `leaving room ${roomId}`)
        socket.leave(socket.rooms[roomId])
        if (games[roomId]) delete games[roomId].users[socket.id]
      }
    }
  }

  function joinRoom(socket, room) {
    leaveAllRooms(socket)
    console.log('joinRoom room:', room)
    socket.join(room)

    if (!games[room]) {
      console.log('joinRoom create new GameInstance', room)
      games[room] = new GameInstance(room)
    } else {
      games[room].users[socket.id] = users[socket.id]
    }

    socket.emit('connectToRoom', room)
    updateRoom(socket)
    traceState()
  }

  function updateRoom(socket) {
    let room = Object.keys(socket.rooms)[0]
    console.log('[ server socket ] updateRoom room/rooms:', room)
    if (room && games[room] && games[room].chatList) {
      console.log(
        '[ server socket ] updateRoom update chatList:',
        games[room].chatList
      )
    }
    io.sockets
      .in('Default Game')
      .emit('update-lobby', users, games, games['Default Game'].chatList)
    io.sockets
      .in('Lobby')
      .emit('update-lobby', users, games, games.Lobby.chatList)
  }

  function traceState() {
    console.log('-----------------------')
    console.log('server-trace Lobby.users', games.Lobby.users)
    console.log('server-trace Lobby.chatList', games.Lobby.chatList)
    console.log('server-trace DefaultGame.users', games['Default Game'].users)
    console.log(
      'server-trace DefaultGame.chatList',
      games['Default Game'].chatList
    )
    console.log('-----------------------')
  }

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    console.log('-----------------')

    socket.on('disconnect', () => {
      console.log(`---------------------`)
      console.log(`disconnect ${socket.id} has left the building`)

      console.log('disconnect from users and Lobby', Object.keys(socket.rooms))
      delete users[socket.id]
      delete games.Lobby.users[socket.id]

      if (socket.rooms.length > 0) {
        console.log('disconnect from room and game', Object.keys(socket.rooms))
        delete games[Object.keys(socket.rooms)[0]][socket.id]
        updateRoom(socket)
      }
      console.log(`---------------------`)
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
      console.log('-----------')

      console.log('switch-room', room)

      joinRoom(socket, room)
    })

    /* eslint-disable camelcase */
    socket.on('join-game', async gameId => {
      console.log('join-game gameId', gameId)
      games[gameId].users[socket.id] = users[socket.id]
      joinRoom(socket, gameId)

      /**
       * START NEW GAME
       */

      const userKeys = Object.keys(games[gameId])
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

          joinRoom(socket, gameId)

          io.to(socketId).emit('start-game', board.board_data, {
            number: playerNumber,
            color: colors[playerNumber],
            userProfile: user
          })
        })
        io.sockets.in(gameId).emit('set-game-users', gameUsers)
      }
    })

    socket.on('reset-all-games', () => {
      log('reset-all-games')
      resetAllGames()
      // updateRoom(socket)
    })

    /* eslint-disable guard-for-in */
    socket.on('delete-user-from-game', (email, gameId) => {
      console.log('delete-user-from-game', email, gameId, socket.id)
      console.log('game users', games[gameId].users)

      let gameUsers = games[gameId].users
      for (let key in gameUsers) {
        console.log('gameUsers key', key)

        if (gameUsers[key].email === email) {
          log('deleting user from game', email)
          delete gameUsers[key]
        }
      }
    })

    socket.on('leave-game', gameId => {
      console.log('leave-game', gameId, socket.id)
      if (gameId) {
        delete games[gameId].users[socket.id]
        updateRoom(socket)
      }
    })

    socket.on('send-message', message => {
      console.log('send-message socket.rooms', socket.rooms)
      let room = Object.keys(socket.rooms)[0] || 'Lobby'
      console.log('send-message room / message', room, message)

      games[room].chatList.push({
        username: users[socket.id].username,
        message: message
      })

      updateRoom(socket)
    })

    socket.on('server-trace', () => {
      traceState()
    })

    /**
     * THESE ARE VARS USED BY RYAN - TO INTEGRATE
     */
    let colors = {
      1: 'red',
      2: 'green',
      3: 'blue',
      4: 'orange'
    }

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

  /**
   * THESE ARE FUNCTIONS USED BY FRANK TO SHUFFLE DECK
   */

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
}
