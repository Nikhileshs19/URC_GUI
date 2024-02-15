// app.listen(8080, () => {
//   console.log('server listening on port 8080')
// })

// app.get('/', (req, res) => {
//   res.send('Hello from our server!')
// })

const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.static(path.join(__dirname, '../frontend', 'dist')))

app.use('/static', express.static(path.join(__dirname, 'static')))

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'))
})

// Create HTTP server
const server = http.createServer(app)
const io = socketIo(server)

let connectedClients = 0

io.on('connection', (socket) => {
  connectedClients++
  console.log(`Client connected. Total connected clients: ${connectedClients}`)

  socket.on('disconnect', () => {
    connectedClients--
    console.log(
      `Client disconnected. Total connected clients: ${connectedClients}`
    )
  })

  // Handle 'update_data' event
  socket.on('update_data', (data) => {
    io.emit('sensor_data', data)
  })
})

const port = process.env.PORT || 5000
server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
