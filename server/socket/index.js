const Game = require('../db').model('game')
const Board = require('./board')
const initializedBoardData = require('./initializedBoard')

module.exports = io => {
  let userLobby = {}
  let activeGames = {'Default Game': {}}
  let gamesInProgress = {}
  let gameDecks = {}
  let chatHistory = []
  const maxUsers = 2

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

  function generateDeck() {
    console.log('generate deck')
    const cards = ['monopoly', 'monopoly', 'road', 'road', 'plenty', 'plenty']
    for (let i = 0; i < 14; i++) {
      cards.push('knight')
    }
    for (let i = 0; i < 5; i++) {
      cards.push('vp')
    }
    shuffle(cards)
    gameDecks.defaultGame = cards
    // console.log(gameDecks.defaultGame)
  }

  function getRandomCard(gameId) {
    return gameDecks[gameId].pop()
  }

  generateDeck()

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
    activeGames = {'Default Game': {}}
  }

  io.on('connection', socket => {
    /*******************************************
     * GAME LISTENERS
     *******************************************/
    socket.on('get-dev-card', gameId => {
      let card = getRandomCard(gameId)
      io.sockets.emit('send-card-to-user', card)
    })

    /*******************************************
     * LOBBY LISTENERS
     *******************************************/

    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.broadcast.emit('player-joined', socket.id)

    socket.on('join-lobby', user => {
      userLobby[socket.id] = user
      // console.log('userLobby', userLobby, '\nactiveGames', activeGames)
      io.sockets.emit('update-lobby', userLobby, activeGames, chatHistory)
    })

    socket.on('join-game', async gameId => {
      console.log('join-game gameId', gameId)
      activeGames[gameId][socket.id] = userLobby[socket.id]
      // console.log('join-game activeGames', activeGames)
      io.sockets.emit('game-joined', activeGames)
      const userKeys = Object.keys(activeGames[gameId])
      /**
       * START NEW GAME
       */
      if (userKeys.length === maxUsers) {
        const board = await Game.create({
          board_data: JSON.stringify(initializedBoardData)
        })

        let gameUsers = {}
        let playerNum = 0
        userKeys.forEach(socketId => {
          delete activeGames[gameId][socketId]
          let user = userLobby[socketId]
          user.playerNum = playerNum++
          gameUsers[playerNum] = user
          delete userLobby[socketId]

          io.to(socketId).emit('start-game', board.board_data, {
            number: playerNum,
            color: colors[playerNum]
          })
        })

        io.sockets.emit('update-lobby', userLobby, activeGames)
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
      delete activeGames['Default Game'][socket.id]
      io.sockets.emit('lobby-left', userLobby)
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

    socket.on('leave-game', gameId => {
      console.log('leave-game', gameId, socket.id)
      if (gameId) {
        delete activeGames[gameId][socket.id]
        io.sockets.emit('update-lobby', userLobby, activeGames)
      }
    })

    socket.on('send-message', message => {
      console.log('send-message', message)

      chatHistory.push(message)
      io.sockets.emit('update-chat', chatHistory)
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
