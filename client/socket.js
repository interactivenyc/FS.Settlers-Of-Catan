import io from 'socket.io-client'

if (process.env.NODE_ENV === 'test') {
  global.window = {location: {origin: 'http://localhost:8080'}}
}

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
