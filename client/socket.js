import io from 'socket.io-client'

if (process.env.NODE_ENV === 'test') {
  global.window = {location: {origin: ''}}
}

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
