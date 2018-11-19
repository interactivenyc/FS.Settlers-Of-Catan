module.exports = io => {
  let userLobby = {}
  let activeGames = {'Default Game': {}}
  let gameDecks = {}

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
  }

  function getRandomCard(gameId) {
    return gameDecks[gameId].pop()
  }

  generateDeck()
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

    socket.on('get-dev-card', gameId => {
      let card = getRandomCard(gameId)
      io.sockets.emit('send-card-to-user', card)
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
  })
}
