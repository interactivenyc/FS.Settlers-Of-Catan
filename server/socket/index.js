const GameDB = require('../db').model('game')
const initializedBoardData = require('./initializedBoard')
const User = require('./User')

module.exports = io => {
  let games = {}
  let users = {}
  const numPlayers = 2
  let gameIndex = 0

  class GameInstance {
    constructor(name) {
      console.log('[ GameInstance ] constructor:', name)

      this.name = name
      this.users = {}
      this.chatList = []
      // this.deck = generateDeck(name)

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

  function resetAllGames() {
    games = {}
    createDefaultGame()
  }

  function leaveAllRooms(socket, except) {
    console.log('leaveAllRooms except', except)

    for (let roomId in socket.rooms) {
      if (socket.rooms.hasOwnProperty(roomId) && roomId !== except) {
        console.log('leaving room...', roomId)
        socket.emit('log-server-message', `leaving room ${roomId}`)
        socket.leave(socket.rooms[roomId])
        if (games[roomId]) delete games[roomId].users[socket.id]
      }
    }
  }

  function destroyUserBySocket(socketId) {
    console.log('destroyUserBySocket', socketId)

    delete users[socketId]

    let gamesList = Object.keys(games)

    for (let i = 0; i < gamesList.length; i++) {
      delete games[gamesList[i]].users[socketId]
    }

    // traceState()
  }

  function joinRoom(socket, room) {
    console.log('joinRoom room:', room, socket.id)
    leaveAllRooms(socket, room)
    if (socket.rooms.hasOwnProperty(room)) {
      console.log('joinRoom room - ALREADY JOINED:', room)
    } else {
      console.log('joinRoom - JOINING room:', room)
      socket.join(room)

      if (!games[room]) {
        console.log('joinRoom create new GameInstance', room)
        games[room] = new GameInstance(room)
      } else {
        games[room].users[socket.id] = users[socket.id]
      }

      socket.emit('connectToRoom', room)
      updateRoom(socket)
    }
    // traceState()
  }

  function updateRoom(socket) {
    // USE THIS TO BROADCAST TO SPECIFIC ROOMS LATER
    // let room = Object.keys(socket.rooms)[0]

    console.log('updateRoom rooms:', io.sockets.adapter.rooms)

    io.sockets
      .in('Default Game')
      .emit('update-lobby', users, games, io.sockets.adapter.rooms)
    io.sockets
      .in('Lobby')
      .emit('update-lobby', users, games, io.sockets.adapter.rooms)
  }

  function removeEmptyGames() {
    console.log('--------------------')
    console.log('removeEmptyGames')
    console.log('--------------------')

    let keys = Object.keys(games)
    let gameUsers

    for (let key in keys) {
      if (
        keys.hasOwnProperty(key) &&
        key !== 'Lobby' &&
        key !== 'Default Game'
      ) {
        console.log('checking key:', keys[key])

        gameUsers = Object.keys(games[keys[key]].users)
        if (gameUsers.length === 0) {
          console.log('removeEmptyGame', keys[key])
          delete games[keys[key]]
        }
      }
    }
  }

  function traceState() {
    console.log('-----------------------')
    console.log(games)
    console.log('-----------------------')
    traceAllRooms()
    console.log('-----------------------')
  }

  function traceAllRooms() {
    console.log('traceAllRooms - start')

    for (let roomId in io.sockets.adapter.rooms) {
      if (io.sockets.adapter.rooms.hasOwnProperty(roomId)) {
        console.log('-->', roomId, '<--')
        console.log(io.sockets.adapter.rooms[roomId].sockets)
      }
    }
  }

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    console.log('-----------------')

    socket.on('disconnect', () => {
      console.log(`---------------------`)
      console.log(`disconnect ${socket.id} has left the building`)

      destroyUserBySocket(socket.id)

      //NOT SURE IF THIS IS NECESSARY
      updateRoom(socket)

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
      console.log('join-lobby')
      let gameUser = new User(user, socket.id, users)
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
      // console.debug('join-game', users, games)
      games[gameId].users[socket.id] = users[socket.id]
      joinRoom(socket, gameId)

      if (gameId === 'Lobby') return

      const userKeys = Object.keys(games[gameId].users)
      if (userKeys.length === numPlayers && gameId === 'Default Game') {
        /**
         * START NEW GAME
         */

        const board = await GameDB.create({
          board_data: JSON.stringify(initializedBoardData)
        })

        let gameUsers = []
        let playerNumber = 0

        let gameName = 'game_' + gameIndex++
        let game = new GameInstance(gameName)
        games[gameName] = game

        userKeys.forEach(socketId => {
          delete games[gameId].users[socketId]
          let user = users[socketId]
          playerNumber++
          user.playerNumber = playerNumber
          user.gameId = gameName
          user.color = colors[playerNumber]
          gameUsers.push(user)
          games[gameName].users[socketId] = user
          // delete users[socketId]

          console.log('START-GAME for user', socketId, user, gameName)
          // removeEmptyGames()
          joinRoom(io.sockets.connected[socketId], gameName)

          io.sockets.connected[socketId].emit(
            'start-game',
            board.board_data,
            user
          )
        })

        // this has to happen AFTER all gameUsers have been added
        userKeys.forEach(socketId => {
          io.sockets.connected[socketId].emit('set-game-users', gameUsers)
        })
        // not sure why this isn't working
        // io.in(gameId).emit('set-game-users', gameUsers)

        updateRoom()
      }
    })

    /**
     * THIS GETS CALLED ON ACCIDENTAL DISCONNECT
     */

    /* eslint-disable guard-for-in */
    socket.on('delete-user-from-game', (user, gameId) => {
      console.log('-----------------')
      console.log('--> RECOVER')
      console.log('-----------------')

      console.log('RECOVER FROM DISCONNECT \n', user.email, gameId, socket.id)
      // traceState()

      let gameUser = new User(user, socket.id, users)
      users[socket.id] = gameUser
      joinRoom(socket, 'Lobby')

      console.log('-----------------')
      console.log('--> /RECOVER')
      console.log('-----------------')
    })

    socket.on('leave-game', gameId => {
      console.log('leave-game', gameId, socket.id)
      if (gameId) {
        delete games[gameId].users[socket.id]
        joinRoom(socket, 'Lobby')
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
      let room = Object.keys(socket.rooms)[0]
      console.log('dispatch - to', room)
      console.log(value)
      socket.to(room).emit('dispatch', value)
    })
    socket.on('dispatchThunk', action => {
      let room = Object.keys(socket.rooms)[0]
      console.log('dispatchThunk - to', room)
      console.log(action)
      socket.to(room).emit('dispatchThunk', action)
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
